import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";
import { FadeText } from "../ui/FadeText";
import CardCarousel from "../ui/CardCarousel";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      facility: "Downtown Soccer Field",
      rating: 5,
      comment:
        "Excellent facilities! The field was in perfect condition and booking was a breeze.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Sarah Lee",
      facility: "Sunset Tennis Courts",
      rating: 4,
      comment:
        "Great courts and friendly staff. Could use better lighting for evening games.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Mike Brown",
      facility: "Central Basketball Arena",
      rating: 5,
      comment:
        "Top-notch basketball courts. The online booking system made reserving a court super easy!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Emily Davis",
      facility: "Lakeside Swimming Pool",
      rating: 4,
      comment:
        "Clean pool and good facilities. The changing rooms could be better maintained.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "John Smith",
      facility: "Mountain Climbing Gym",
      rating: 5,
      comment:
        "Amazing climbing walls and helpful staff. Highly recommend for climbing enthusiasts!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Anna White",
      facility: "Riverside Yoga Studio",
      rating: 4,
      comment:
        "Great yoga classes and peaceful environment. The studio could use more natural light.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];
  return (
    <>
      <CardCarousel heading="User Voices">
        {reviews.map((review, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 xl:basis-1/3 animate-fadeIn"
          >
            <Card
              key={review.id}
              className="overflow-hidden bg-primary1/10 h-full"
            >
              <CardContent className="p-2 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-orange-800">
                        <FadeText
                          direction="up"
                          text={review.name}
                          framerProps={{
                            show: {
                              transition: {
                                delay: 0.2,
                              },
                            },
                          }}
                        />
                      </h3>
                      <div className="text-orange-600 text-sm">
                        <FadeText
                          direction="up"
                          text={review.facility}
                          framerProps={{
                            show: {
                              transition: {
                                delay: 0.4,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-primary1 fill-current"
                            : "text-primaryDark"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-gray-600">
                    <FadeText
                      direction="up"
                      text={review.comment}
                      framerProps={{
                        show: {
                          transition: {
                            delay: 0.6,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CardCarousel>
    </>
  );
};

export default Testimonials;
