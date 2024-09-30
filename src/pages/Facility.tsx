import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FacilityCard from "@/components/ui/FacilityCard";
import { useGetFacilitiesQuery } from "@/redux/Features/facility/facilityApi";
import Heading from "@/components/ui/Heading";

interface Facility {
  _id: string;
  name: string;
  image: string;
  pricePerHour: number;
  description: string;
  location: string;
  isDeleted: boolean;
}

export default function Facility() {
  const { data: facilitiesData } = useGetFacilitiesQuery();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const facilitiesPerPage = 9;

  useEffect(() => {
    const allFacilities = facilitiesData?.data || [];
    const filteredFacilities = allFacilities.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceSort === "lowToHigh") {
      filteredFacilities.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (priceSort === "highToLow") {
      filteredFacilities.sort((a, b) => b.pricePerHour - a.pricePerHour);
    }

    setFacilities(filteredFacilities);
    setCurrentPage(1);
  }, [searchTerm, priceSort, facilitiesData]);

  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilities = facilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading text="Our Facilities" />
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={priceSort} onValueChange={setPriceSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFacilities.map((facility) => (
            <FacilityCard key={facility._id} {...facility} />
          ))}
        </div>

        {facilities.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No facilities found matching your criteria.
          </p>
        )}

        <div className="mt-12 flex justify-center">
          <nav className="inline-flex space-x-1 rounded-md">
            {Array.from(
              { length: Math.ceil(facilities.length / facilitiesPerPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={`px-4 py-2 text-sm font-medium ${
                    i === 0 ? "rounded-l-md" : ""
                  } ${
                    i === Math.ceil(facilities.length / facilitiesPerPage) - 1
                      ? "rounded-r-md"
                      : ""
                  }`}
                >
                  {i + 1}
                </Button>
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
