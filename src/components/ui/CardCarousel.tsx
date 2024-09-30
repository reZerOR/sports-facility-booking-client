import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import Heading from "./Heading";
import { container } from "@/lib/style";

const CardCarousel = ({children, heading}: {children: React.ReactNode, heading: string}) => {


  const [api, setApi] = useState<CarouselApi>();
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setNext(api.canScrollNext());
      setPrev(api.canScrollPrev());
    });

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    if (api?.canScrollNext()) {
      api.scrollNext();
    } else {
      api?.scrollTo(0);
    }
  }, [api]);
  return (
    <div className={container}>
      <Heading text={heading} />
      <div>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {children}
          </CarouselContent>
        </Carousel>
        <div className="flex justify-end items-center space-x-2 mt-2 mr-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-accent1 border-2"
            onClick={handlePrevious}
            disabled={!prev}
          >
            <MoveLeft className="h-4 w-4 text-accent1" size={32} />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-accent1 border-2"
            onClick={handleNext}
            disabled={!next}
          >
            <MoveRight className="h-4 w-4 text-accent1" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
