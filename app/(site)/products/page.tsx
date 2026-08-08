import { MarketingPage } from "@/components/sections/MarketingPage";
import { pageData } from "@/lib/marketing-pages";

export default function ProductsPage() {
  return <MarketingPage data={pageData("products")} />;
}
