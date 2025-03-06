import { HeroSection } from "@/components/hero-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InfoSection } from "@/components/info-section";
import { useRef } from "react";
import { Footer } from "@/components/footer";

function App() {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  document.body.classList.add("dark");
  return (
    <ScrollArea className="noise h-screen flex flex-col">
      <div ref={scrollAreaRef} className="h-screen">
        <HeroSection />
      </div>
      <InfoSection scrollAreaRef={scrollAreaRef} />
      <Footer />
    </ScrollArea>
  );
}

export default App;
