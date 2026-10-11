import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beacon",
  description: "A fast, native application launcher for macOS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
