import { Demo } from "@/modules/landing/Demo";
import { Features } from "@/modules/landing/Features";
import { Footer } from "@/modules/landing/Footer";
import { Header } from "@/modules/landing/Header";
import { Hero } from "@/modules/landing/Hero";
import { Install } from "@/modules/landing/Install";
import { Keyboard } from "@/modules/landing/Keyboard";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Demo />
        <Features />
        <Keyboard />
        <Install />
      </main>
      <Footer />
    </>
  );
}
