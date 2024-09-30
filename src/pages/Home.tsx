import HeroSection from "@/components/Home/HeroSection";
import HowitWorks from "@/components/Home/HowitWorks";
import OurImpact from "@/components/Home/OurImpact";
import Testimonials from "@/components/Home/Testimonials";
import FeaturedFacility from "@/components/Home/FeaturedFacility";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowitWorks />
      <Testimonials />
      <FeaturedFacility />
      <OurImpact />
    </div>
  );
};

export default Home;
