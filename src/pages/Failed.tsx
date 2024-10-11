import { XCircle, AlertTriangle, ArrowLeft, RefreshCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Failed() {
  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-red-500 border-2">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-700">
              Booking Failed
            </CardTitle>
            <CardDescription className="text-lg">
              We're sorry, but there was an issue with your booking.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-100 p-6 rounded-lg flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Possible reasons for failure:
                </h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>The selected time slot is no longer available</li>
                  <li>There was an issue processing your payment</li>
                  <li>A temporary system error occurred</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link to="/facility">
              <Button className="bg-orange-500 group hover:bg-orange-600 text-white">
                <RefreshCcw className="w-4 h-4 mr-2 group-hover:-rotate-90 transition-all duration-300" />
                Try Booking Again
              </Button>
            </Link>

            <Link to="/">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
