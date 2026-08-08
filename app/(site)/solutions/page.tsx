import { MarketingPage } from "@/components/sections/MarketingPage";
import { pageData } from "@/lib/marketing-pages";

export default function SolutionsPage() {
  return <MarketingPage data={pageData("solutions")} />;
}
