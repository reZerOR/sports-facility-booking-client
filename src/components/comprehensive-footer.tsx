import { Link } from "react-router-dom";
import logo from "@/assets/playpalhorizontal.svg";

export function ComprehensiveFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-100 z-[-1] text-orange-800 py-8 overflow-hidden">
      <div className="container relative mx-auto px-4">
        <div className="absolute -bottom-1/2 z-0 -right-1/4 w-2/3 h-full bg-orange-200 rounded-full opacity-50 transform rotate-45"></div>
        <div className="flex flex-wrap z-10 items-center justify-between relative">
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <div className="transform -rotate-3 bg-white p-3 rounded-lg shadow-lg inline-block">
              <img
                src={logo}
                alt="Company Logo"
                width={120}
                height={60}
                className="w-auto h-12"
              />
            </div>
          </div>
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <nav className="flex flex-wrap font-semibold tracking-wide justify-center md:justify-end gap-x-6 gap-y-2">
              <Link to="/" className="hover:text-orange-600 transition-colors">
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-orange-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/services"
                className="hover:text-orange-600 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="hover:text-orange-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap z-10 items-center justify-between relative">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <address className="not-italic">
              <p className="font-semibold">PlayPal Company</p>
              <p>123 Business Street</p>
              <p>Bayzid, Chattogram</p>
              <p>Bangladesh</p>
            </address>
          </div>
          <div className="w-full md:w-auto text-sm">
            <p>&copy; {currentYear} PlayPal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
