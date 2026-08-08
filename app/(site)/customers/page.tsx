import { MarketingPage } from "@/components/sections/MarketingPage";
import { pageData } from "@/lib/marketing-pages";

export default function CustomersPage() {
  return <MarketingPage data={pageData("customers")} />;
}
