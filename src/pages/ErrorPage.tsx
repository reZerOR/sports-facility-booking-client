import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-orange-800 mb-4">404</h1>
        <p className="text-2xl font-semibold text-orange-600 mb-6">Oops! This court is out of bounds.</p>
        <p className="text-gray-600 mb-8">
          It seems you've wandered into uncharted territory. Don't worry, even the best athletes go off course sometimes!
        </p>
        <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full transition-transform hover:scale-105">
          <Link to="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home Court
          </Link>
        </Button>
      </div>
    </div>
  )
}