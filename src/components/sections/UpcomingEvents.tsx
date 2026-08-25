import { getTranslations } from "next-intl/server";
import { getEvents } from "@/data/events";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventCard } from "@/components/events/EventCard";

export async function UpcomingEvents({ locale }: { locale: string }) {
  const t = await getTranslations("EventsHome");
  const events = getEvents();

  return (
    <Section>
      <Container className="max-w-4xl">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <div>
          {events.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
