import { MarketingPage } from "@/components/sections/MarketingPage";
import { pageData } from "@/lib/marketing-pages";

export default function EnterprisePage() {
  return <MarketingPage data={pageData("enterprise")} />;
}
