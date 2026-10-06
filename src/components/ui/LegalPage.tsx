import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/ui/Prose";

/** The privacy and terms pages: one reading column on a paper sheet. */
export async function LegalPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-canvas pb-16 pt-4 md:pb-band md:pt-6">
      <Container width="wide">
        <Breadcrumbs items={[{ label: title }]} />
      </Container>
      <Container width="text" className="mt-8 md:mt-14">
        <h1 className="t-h1 text-balance text-ink">{title}</h1>
        <div className="card mt-8 p-6 sm:p-10">
          <Prose>
            <p>{body}</p>
          </Prose>
        </div>
      </Container>
    </div>
  );
}
