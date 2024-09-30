import { Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface FacilityCardProps {
  _id: string
  name: string
  image: string
  pricePerHour: number
  description: string
  location: string
  isDeleted: boolean
}

export default function FacilityCard({ name, image, pricePerHour, description, location }: FacilityCardProps) {
  return (
    <div className="bg-primary1/10 overflow-hidden h-full rounded-xl flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={name}
            className="transition-transform w-full h-full duration-300 object-cover hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-orange-800">{name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-orange-600 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-bold">${pricePerHour.toFixed(2)}</span>
            <span className="text-sm text-gray-600 ml-1">per hour</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        </div>
      </div>
      <div className="p-4">
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          View Details 
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}