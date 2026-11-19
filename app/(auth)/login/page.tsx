import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { LoginView } from "../LoginView";

export const metadata: Metadata = createPageMetadata({
  title: "Sign In",
  description:
    "Sign in to access your Miralas account and voice infrastructure workspace. Public Console access remains subject to confirmation and release announcements.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <LoginView />;
}
