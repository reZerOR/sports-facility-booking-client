import { useGetFacilitiesQuery } from "@/redux/Features/facility/facilityApi";
import CardCarousel from "../ui/CardCarousel";
import { CarouselItem } from "../ui/carousel";
import FacilityCard from "../ui/FacilityCard";

const FeaturedFacility = () => {
  const { data: facilities } = useGetFacilitiesQuery();
    // const facilities = [
    //     {
    //       _id: "1",
    //       name: "Grand Tennis Court",
    //       imageUrl: "/placeholder.svg?height=300&width=400",
    //       pricePerHour: 25,
    //       description: "Professional-grade tennis court with night lighting and spectator seating."
    //     },
    //     {
    //       _id: "2",
    //       name: "Olympic Swimming Pool",
    //       imageUrl: "/placeholder.svg?height=300&width=400",
    //       pricePerHour: 15,
    //       description: "50-meter Olympic-sized pool with diving boards and separate lap swimming areas."
    //     },
    //     {
    //       _id: "3",
    //       name: "Multi-Sport Indoor Arena",
    //       imageUrl: "/placeholder.svg?height=300&width=400",
    //       pricePerHour: 50,
    //       description: "Versatile indoor arena suitable for basketball, volleyball, and other indoor sports."
    //     },
    //     {
    //       _id: "4",
    //       name: "Soccer Field",
    //       imageUrl: "https://i.ibb.co.com/bvv2kMC/nilimage.jpg",
    //       pricePerHour: 40,
    //       description: "Full-size soccer field with artificial turf and floodlights for evening matches."
    //     }
    //   ]
  return (
    <CardCarousel heading="Featured Facilities">
      {facilities?.data.slice(0, 6).map((facility) => (
        <CarouselItem key={facility._id} className="md:basis-1/2 rounded-xl xl:basis-1/4">
          <FacilityCard {...facility} />
        </CarouselItem>
      ))}
    </CardCarousel>
  );
};

export default FeaturedFacility;
