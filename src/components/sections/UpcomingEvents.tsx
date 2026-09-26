import { getTranslations } from "next-intl/server";
import { getEvents } from "@/data/events";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventCard } from "@/components/events/EventCard";

/**
 * Removes itself when there is nothing scheduled. Announcing an empty
 * calendar is worse than not raising the subject.
 */
export async function UpcomingEvents({ locale }: { locale: string }) {
  const events = await getEvents();
  if (!events.length) return null;

  const t = await getTranslations("EventsHome");

  return (
    <Section>
      <Container className="max-w-4xl">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div className="border-t border-line">
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
