
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FacilityCardProps {
  _id: string
  name: string
  imageUrl: string
  pricePerHour: number
  description: string
}

export default function FacilityCard({ name, imageUrl, pricePerHour, description }: FacilityCardProps) {
  return (
    <div className="bg-primary1/10 overflow-hidden rounded-xl">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={name}
          className="transition-transform w-full h-full duration-300 object-cover hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-orange-800 mb-2">{name}</h3>
        <div className="flex items-center text-orange-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span className="font-bold">${pricePerHour.toFixed(2)}</span>
          <span className="text-sm text-gray-600 ml-1">per hour</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Book Now
        </Button>
      </div>
    </div>
  )
}