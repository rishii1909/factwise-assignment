import { CelebrityAccordion } from "@/components/ui/celebrities/accordion/celebrity-accordion";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="min-w-96">
        <CelebrityAccordion />
      </div>
    </div>
  );
}
