import { Roboto } from "next/font/google";

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  display: "swap",
  preload: true,
});
