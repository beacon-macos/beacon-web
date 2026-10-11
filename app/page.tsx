import { Footer } from "@/modules/landing/Footer";
import { Header } from "@/modules/landing/Header";
import { Hero } from "@/modules/landing/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
