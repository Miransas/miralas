import { MarketingPage } from "@/components/sections/MarketingPage";
import { pageData } from "@/lib/marketing-pages";

export default function ResourcesPage() {
  return <MarketingPage data={pageData("resources")} />;
}
