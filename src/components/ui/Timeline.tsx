import {
    useScroll,
    useTransform,
    motion,
  } from "framer-motion";
  import React, { useEffect, useRef, useState } from "react";
import { FadeText } from "./FadeText";
   
  interface TimelineEntry {
    title: string;
    content: React.ReactNode;
  }
   
  export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
   
    useEffect(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    }, [ref]);
   
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start 10%", "end 50%"],
    });
   
    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
   
    return (
      <div
        className="container mx-auto flex justify-between relative my-20 flex-col xl:flex-row bg-white dark:bg-neutral-950 font-sans"
        ref={containerRef}
      >
        <div className="mx-auto">
          <h2 className="~/xl:~text-4xl/6xl sticky top-20 mb-10 font-black font-raleway text-center text-primary1">
            <FadeText 
            direction="up"
            text="How it works"
            framerProps={{
              show: {
                transition: {
                  delay: 0.2,
                },
              },
            }}
            />
          </h2>
        </div>
   
        <div ref={ref} className="relative bg-orange-100
         max-w-xl pb-20 mx-auto rounded-xl">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex pt-10"
            >
              <div className="sticky flex flex-col z-40 items-center top-20">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary1 dark:bg-neutral-800 border border-primaryDark dark:border-neutral-700 p-2" />
                </div>
              </div>
   
              <div className="relative pl-20 pr-4 md:pl-20 w-full">
                <h3 className=" block ~/xl:~text-lg/2xl mb-4 text-left font-bold text-primary1 dark:text-neutral-50">
                  <FadeText 
                  direction="left"
                    text={item.title} 
                    framerProps={{
                      show: {
                        transition: {
                          delay: 0.4,
                        },
                      },
                    }}
                  />
                </h3>
                <div>
                  <FadeText
                  direction="right"
                    text={(item.content) as string}
                    framerProps={{
                      show: {
                        transition: {
                          delay: 0.7,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-primary1 via-primary1 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };