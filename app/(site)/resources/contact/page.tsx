import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import ContactClient from "./contact-client";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Miransas",
  description:
    "Contact the Miransas team regarding Miralas voice infrastructure, product availability, technical support, partnerships, and research collaboration inquiries.",
  path: "/resources/contact",
});

export default function ContactPage() {
  return <ContactClient />;
}
