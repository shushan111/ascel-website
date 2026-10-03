import { getTranslations } from "next-intl/server";
import { getEvents } from "@/data/events";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventCard } from "@/components/events/EventCard";

export async function UpcomingEvents({ locale }: { locale: string }) {
  const t = await getTranslations("EventsHome");
  const events = await getEvents();

  return (
    <Section>
      <Container className="max-w-4xl">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        {events.length > 0 ? (
          <div className="border-t border-line">
            {events.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="t-body text-muted">{t("empty")}</p>
        )}
      </Container>
    </Section>
  );
}
