import { useState, useEffect } from "react";
import FacilityCard from "@/components/ui/FacilityCard";
import {
  TFacility,
  useGetFacilitiesQuery,
} from "@/redux/Features/facility/facilityApi";
import FacilityFilter from "@/components/ui/FacilityFilter";
import FacilityPagination from "@/components/ui/FacilityPagination";
import AddFacility from "@/components/Facility/AddFacility";

export default function AllFacility() {
  const { data: facilitiesData } = useGetFacilitiesQuery();
  const [facilities, setFacilities] = useState<TFacility[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceSort, setPriceSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const facilitiesPerPage = 9;

  useEffect(() => {
    if (facilitiesData) {
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
    }
  }, [facilitiesData, searchTerm, priceSort]);

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-800">
            Facility Management
          </h1>
          <AddFacility />
        </div>
        <FacilityFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
        />

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

        <FacilityPagination
          facilitiesLength={facilities.length}
          facilitiesPerPage={facilitiesPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
