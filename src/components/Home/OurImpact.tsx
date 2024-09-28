import {
  Calendar,
  Users,
  Building2,
  Star,
  TrendingUp,
  Trophy,
  MapPin,
} from "lucide-react";
import Heading from "../ui/Heading";
import NumberTicker from "../ui/number-ticker";

export default function UniqueBentoGridStats() {
  return (
    <section className="bg-orange-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <Heading text="Our Impacts" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
          {/* Total Bookings */}
          <div className="h-48 group relative col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center text-white">
            <Calendar className="size-32 group-hover:size-36 z-0 transition-all duration-300 text-white/20 absolute" />
            <h3 className="text-4xl z-10 sm:text-5xl font-bold"><NumberTicker value={1000}/>+</h3>
            <p className="text-xl z-10 mt-2">Total Bookings</p>
          </div>

          {/* Active Users */}
          <div className=" group col-span-1 relative bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
            <Users className="size-32 group-hover:size-36 transition-all duration-300 text-primary1/20 absolute" />
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">
              <NumberTicker value={50000}/>+
            </h3>
            <p className="text-orange-600 mt-2">Active Users</p>
          </div>

          {/* Available Facilities */}
          <div className="bg-white group relative rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
            <Building2 className="size-32 group-hover:size-36 transition-all duration-300 text-primary1/20 absolute" />
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">
              1,000+
            </h3>
            <p className="text-orange-600 mt-2">Facilities</p>
          </div>

          {/* Average Rating */}
          <div className="bg-white group relative rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
            <Star className="size-32 group-hover:size-36 transition-all duration-300 text-primary1/20 absolute" />
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">
              4.8/5
            </h3>
            <p className="text-orange-600 mt-2">Avg. Rating</p>
          </div>

          {/* Monthly Growth */}
          <div className="col-span-1 lg:col-span-2 group relative bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
            <TrendingUp className="size-32 group-hover:size-36 transition-all duration-300 text-primary1/20 absolute" />
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">
              15%
            </h3>
            <p className="text-orange-600 mt-2">Monthly Growth</p>
          </div>

          {/* Sports Covered */}
          <div className="bg-white group relative rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
            <Trophy className="size-32 group-hover:size-36 transition-all duration-300 text-primary1/20 absolute" />
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-800">
              20+
            </h3>
            <p className="text-orange-600 mt-2">Sports Covered</p>
          </div>

          {/* Cities Served */}
          <div className="col-span-1 md:col-span-2 group relative lg:col-span-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center text-center text-white">
            <MapPin className="size-32 group-hover:size-36 transition-all duration-300 text-white/20 absolute" />
            <h3 className="text-4xl sm:text-5xl font-bold">50+</h3>
            <p className="text-xl mt-2">Cities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
