
import HeroPricing from "../../components/shared/hero";


import Feature from "../../components/shared/feature";
import FAQ1 from "../../components/shared/faq";
import ScrollCta from "../../components/shared/scroll-img-cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <HeroPricing/>
     <ScrollCta/>
    <FAQ1/>
    </div>
  );
}
