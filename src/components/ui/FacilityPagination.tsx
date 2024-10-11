import React from 'react'
import { Button } from '@/components/ui/button'

interface FacilityPaginationProps {
  facilitiesLength: number;
  facilitiesPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const FacilityPagination: React.FC<FacilityPaginationProps> = ({ facilitiesLength, facilitiesPerPage, currentPage, paginate }) => {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="inline-flex space-x-1 rounded-md">
        {Array.from(
          { length: Math.ceil(facilitiesLength / facilitiesPerPage) },
          (_, i) => (
            <Button
              key={i}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className={`px-4 py-2 text-sm font-medium ${
                i === 0 ? "rounded-l-md" : ""
              } ${
                i === Math.ceil(facilitiesLength / facilitiesPerPage) - 1
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
  )
}

export default FacilityPagination