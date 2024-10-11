'use client'

import { useState, useEffect, useCallback } from 'react'
import { MoreVertical, Trash2, Edit, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for facilities
const initialFacilities = [
  { id: 1, name: "Tennis Court A", description: "Professional grade tennis court", pricePerHour: 50, location: "123 Sports Ave", image: "/placeholder.svg?height=100&width=200" },
  { id: 2, name: "Swimming Pool", description: "Olympic-sized swimming pool", pricePerHour: 75, location: "456 Aqua Blvd", image: "/placeholder.svg?height=100&width=200" },
  { id: 3, name: "Basketball Court", description: "Indoor basketball court", pricePerHour: 60, location: "789 Hoop Street", image: "/placeholder.svg?height=100&width=200" },
  // Add more facilities here to test pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    name: `Facility ${i + 4}`,
    description: `Description for Facility ${i + 4}`,
    pricePerHour: Math.floor(Math.random() * 100) + 30,
    location: `${Math.floor(Math.random() * 1000)} Random St`,
    image: "/placeholder.svg?height=100&width=200"
  }))
]

export default function FacilityListingPage() {
  const [facilities, setFacilities] = useState(initialFacilities)
  const [filteredFacilities, setFilteredFacilities] = useState(initialFacilities)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [currentFacility, setCurrentFacility] = useState(null)
  const [newFacility, setNewFacility] = useState({
    name: '',
    description: '',
    pricePerHour: '',
    location: '',
    image: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const facilitiesPerPage = 9

  const handleDelete = (id) => {
    setFacilities(facilities.filter(facility => facility.id !== id))
  }

  const handleUpdate = (facility) => {
    setCurrentFacility(facility)
    setIsUpdateDialogOpen(true)
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    setFacilities(facilities.map(f => f.id === currentFacility.id ? currentFacility : f))
    setIsUpdateDialogOpen(false)
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    const id = Math.max(...facilities.map(f => f.id)) + 1
    setFacilities([...facilities, { ...newFacility, id }])
    setIsAddDialogOpen(false)
    setNewFacility({ name: '', description: '', pricePerHour: '', location: '', image: '' })
  }

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const handleSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = facilities.filter(facility =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredFacilities(filtered)
      setCurrentPage(1)
    }, 300),
    [facilities]
  )

  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, handleSearch])

  // Get current facilities
  const indexOfLastFacility = currentPage * facilitiesPerPage
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage
  const currentFacilities = filteredFacilities.slice(indexOfFirstFacility, indexOfLastFacility)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-800">Facility Management</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Facility
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Facility</DialogTitle>
                <DialogDescription>
                  Enter the details of the new facility here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newFacility.name}
                      onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newFacility.description}
                      onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price/Hour
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newFacility.pricePerHour}
                      onChange={(e) => setNewFacility({...newFacility, pricePerHour: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={newFacility.location}
                      onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newFacility.image}
                      onChange={(e) => setNewFacility({...newFacility, image: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search facilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentFacilities.map((facility) => (
            <Card key={facility.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardTitle className="text-xl font-bold text-orange-700">{facility.name}</CardTitle>
                <CardDescription>{facility.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{facility.description}</p>
                <p className="text-lg font-semibold text-orange-600 mt-2">${facility.pricePerHour}/hour</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-gray-500">ID: {facility.id}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleUpdate(facility)}>
                      <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            facility and remove its data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(facility.id)} className="bg-red-500 hover:bg-red-600">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => paginate(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(Math.ceil(filteredFacilities.length / facilitiesPerPage))].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  onClick={() => paginate(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => paginate(currentPage + 1)}
                className={currentPage === Math.ceil(filteredFacilities.length / facilitiesPerPage) ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Facility</DialogTitle>
            <DialogDescription>
              Make changes to the facility here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="update-name"
                  value={currentFacility?.name || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="update-description"
                  value={currentFacility?.description || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-price" className="text-right">
                  Price/Hour
                </Label>
                <Input
                  id="update-price"
                  type="number"
                  value={currentFacility?.pricePerHour || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, pricePerHour: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-location" className="text-right">
                  Location
                </Label>
                <Input
                  id="update-location"
                  value={currentFacility?.location || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="update-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="update-image"
                  value={currentFacility?.image || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, image: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}