import Navigation from "./modules/home/Navigation";
import Footer from "./modules/home/Footer";
import HelpCenter from "./modules/home/HelpCenter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <HelpCenter />
      </main>
      <Footer />
    </div>
  );
}
