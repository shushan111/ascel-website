# Armenian Simulation Center for Experimental Learning (ASCEL)

Professional website for ASCEL — a medical education, simulation, and experimental learning center in Gyumri, Armenia.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next-intl (English + Armenian)
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Armenian routes live under `/hy`.

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |
| `NEXT_PUBLIC_DONATION_URL` | External donation provider. If empty, Donate buttons go to `/donate` |
| `NEXT_PUBLIC_DONATION_PROVIDER` | Optional provider name |
| `CONTACT_FORM_ENDPOINT` | Optional POST endpoint for the contact form |

Program external links are centralized in `src/lib/config.ts`:

```ts
export const externalLinks = {
  gyumriOrthopedicSchool: "https://gyumriorthoschool.org/",
  damageControlCourses: "",
  eternalNation: "https://eternalnation.com/",
};
```

Do not invent a Damage Control URL. When one exists, add it here.

## Updating content

Structured content lives in `src/data/`:

- `programs.ts`
- `courses.ts`
- `events.ts`
- `news.ts`
- `partners.ts`
- `metrics.ts`
- `donation.ts`

UI copy lives in `messages/en.json` and `messages/hy.json`.

Placeholder statistics use `XX+` and `numericValue: null` until verified figures are provided. Sample courses, events, and news are marked as such.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
