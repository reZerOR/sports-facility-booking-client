import { FadeText } from "@/components/ui/FadeText";
import { motion } from "framer-motion";
import { Calendar, CalendarDays, MapPin } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  const fadeInAnimation = (delay: number) => ({
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { delay },
  });
  return (
    <div className="bg-[url('/heroimag.jpg')] bg-cover bg-center bg-no-repeat h-[calc(100vh-72px)]">
      <div className="container mx-auto px-4 flex flex-col justify-center items-center h-full">
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="~/xl:~text-4xl/8xl font-black font-raleway text-center text-primary1">
            <FadeText direction="up" text="Ready to Play?" />
            <FadeText
              direction="right"
              className="text-orange-500"
              text="Book Your Court in"
              framerProps={{
                show: {
                  transition: {
                    delay: 0.5,
                  },
                },
              }}
            />
            <FadeText
              direction="left"
              className="text-accentLight"
              text="Seconds!"
              framerProps={{
                show: {
                  transition: {
                    delay: 1,
                  },
                },
              }}
            />
          </h1>
          <p className="text-sm max-w-96 text-center text-white">
            <FadeText
              direction="up"
              text="From soccer fields to tennis courts, find the best places to play your favorite sports. Our user reviews ensure you know exactly what to expect before you book!"
              framerProps={{
                show: {
                  transition: {
                    delay: 1.5,
                  },
                },
              }}
            />
          </p>
          <div className="flex items-center gap-6 mt-4 text-primary1">
            <motion.div
              {...fadeInAnimation(2)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Easy Scheduling</span>
            </motion.div>
            <motion.div
              {...fadeInAnimation(2.5)}
              className="flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Multiple Locations</span>
            </motion.div>
          </div>
          <motion.div {...fadeInAnimation(3)}>
            <Button
              className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold ~/xl:~py-4/6 ~/xl:~px-6 mt-6 rounded-full transition-all duration-200 ease-in-out ~/xl:~text-sm/lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              onClick={() => {}}
            >
              <CalendarDays
                className="~/xl:~size-5/6 mr-2"
                aria-hidden="true"
              />
              <span>Book Now</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
