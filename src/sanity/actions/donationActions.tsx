import {useCallback, useState} from 'react'
import {CloseCircleIcon, RefreshIcon, RestoreIcon} from '@sanity/icons'
import {Box, Button, Card, Stack, Text, TextInput, useToast} from '@sanity/ui'
import {useClient, useCurrentUser, type DocumentActionComponent} from 'sanity'
import {
  CANCEL_WINDOW_MS,
  DONATION_REQUEST_ID_PREFIX,
  type DonationAdminAction,
  type DonationStatus,
} from '../../lib/donations/types'

/**
 * The three donation buttons. They hold no secrets and decide nothing: each
 * writes a request document with the admin's own Studio session and asks the
 * website's server to carry it out. The server checks who wrote the request,
 * re-reads the donation and asks the bank before doing anything (see
 * src/lib/donations/admin.ts). Hiding the buttons from non-administrators is
 * only for clarity; the server refuses them either way.
 */

type DonationDoc = {
  status?: DonationStatus
  amount?: number
  refundedAmount?: number
  _createdAt?: string
}

function useIsAdministrator(): boolean {
  const user = useCurrentUser()
  return Boolean(user?.roles?.some((role) => role.name === 'administrator'))
}

function useDonationRequest() {
  const client = useClient({apiVersion: '2025-01-01'})
  const toast = useToast()
  return useCallback(
    async (action: DonationAdminAction, donationId: string, amount?: number) => {
      try {
        const requestId = `${DONATION_REQUEST_ID_PREFIX}${crypto.randomUUID()}`
        await client.create({
          _id: requestId,
          _type: 'donationRequest',
          action,
          donationId,
          ...(amount === undefined ? {} : {amount}),
        })
        const response = await fetch('/api/donations/admin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({requestId}),
        })
        const result = (await response.json().catch(() => null)) as {ok?: boolean; message?: string} | null
        toast.push({
          status: result?.ok ? 'success' : 'error',
          title: result?.message ?? 'Սերվերը չպատասխանեց։',
          duration: 10000,
        })
      } catch {
        toast.push({status: 'error', title: 'Հարցումը չուղարկվեց։ Փորձեք կրկին։', duration: 10000})
      }
    },
    [client, toast],
  )
}

export const SyncDonationAction: DocumentActionComponent = (props) => {
  const isAdmin = useIsAdministrator()
  const send = useDonationRequest()
  const [busy, setBusy] = useState(false)
  if (!isAdmin) return null
  return {
    label: busy ? 'Ստուգվում է…' : 'Թարմացնել բանկից',
    icon: RefreshIcon,
    disabled: busy || !props.published,
    onHandle: async () => {
      setBusy(true)
      await send('sync', props.id)
      setBusy(false)
      props.onComplete()
    },
  }
}

export const CancelDonationAction: DocumentActionComponent = (props) => {
  const isAdmin = useIsAdministrator()
  const send = useDonationRequest()
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  if (!isAdmin) return null

  const doc = props.published as DonationDoc | null
  const withinWindow = doc?._createdAt ? Date.now() - Date.parse(doc._createdAt) < CANCEL_WINDOW_MS : false
  const allowed = doc?.status === 'paid' && !doc.refundedAmount && withinWindow

  return {
    label: busy ? 'Չեղարկվում է…' : 'Չեղարկել',
    icon: CloseCircleIcon,
    tone: 'critical',
    disabled: busy || !allowed,
    title: allowed ? undefined : 'Միայն վճարված նվիրատվություն, վճարումից 72 ժամվա ընթացքում',
    onHandle: () => setConfirming(true),
    dialog: confirming
      ? {
          type: 'confirm',
          tone: 'critical',
          message: `Չեղարկե՞լ ${doc?.amount ?? ''} AMD վճարումը։ Գումարն ամբողջությամբ կվերադարձվի քարտին։`,
          onCancel: () => setConfirming(false),
          onConfirm: async () => {
            setConfirming(false)
            setBusy(true)
            await send('cancel', props.id)
            setBusy(false)
            props.onComplete()
          },
        }
      : null,
  }
}

function RefundForm({
  left,
  onSubmit,
  onCancel,
}: {
  left: number
  onSubmit: (amount: number) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState(String(left))
  const amount = Number(value.replace(/\s/g, ''))
  const valid = Number.isSafeInteger(amount) && amount > 0 && amount <= left
  return (
    <Box padding={4}>
      <Stack space={4}>
        <Text size={1}>Կարելի է վերադարձնել առավելագույնը {left} AMD։</Text>
        <TextInput
          inputMode="numeric"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          aria-label="Վերադարձվող գումար (AMD)"
        />
        {!valid ? (
          <Card tone="critical" padding={3} radius={2}>
            <Text size={1}>Նշեք ամբողջ թիվ 1-ից {left}։</Text>
          </Card>
        ) : null}
        <Stack space={2}>
          <Button tone="critical" text={`Վերադարձնել ${valid ? amount : ''} AMD`} disabled={!valid} onClick={() => onSubmit(amount)} />
          <Button mode="ghost" text="Չեղարկել" onClick={onCancel} />
        </Stack>
      </Stack>
    </Box>
  )
}

export const RefundDonationAction: DocumentActionComponent = (props) => {
  const isAdmin = useIsAdministrator()
  const send = useDonationRequest()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  if (!isAdmin) return null

  const doc = props.published as DonationDoc | null
  const left = Math.max(0, (doc?.amount ?? 0) - (doc?.refundedAmount ?? 0))
  const allowed = (doc?.status === 'paid' || doc?.status === 'partiallyRefunded') && left > 0

  return {
    label: busy ? 'Վերադարձվում է…' : 'Վերադարձնել գումարը',
    icon: RestoreIcon,
    tone: 'caution',
    disabled: busy || !allowed,
    title: allowed ? undefined : 'Միայն վճարված նվիրատվություն',
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: 'dialog',
          header: 'Վերադարձնել գումարը',
          onClose: () => setOpen(false),
          content: (
            <RefundForm
              left={left}
              onCancel={() => setOpen(false)}
              onSubmit={async (amount) => {
                setOpen(false)
                setBusy(true)
                await send('refund', props.id, amount)
                setBusy(false)
                props.onComplete()
              }}
            />
          ),
        }
      : null,
  }
}

export const donationActions = [SyncDonationAction, CancelDonationAction, RefundDonationAction]
