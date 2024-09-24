import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/playpalsolo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCart } from "lucide-react";

const menu = [
  {
    name: "Products",
    to: "/",
  },
  {
    name: "Manage",
    to: "/manage",
  },
];

const Navbar = () => {
  const navlinks = menu.map((item, idx) => (
    <NavLink
      key={idx}
      to={item.to}
      className={({ isActive }) =>
        `${
          isActive
            ? "py-1 px-3 bg-white text-secondary1 rounded-full"
            : "text-white hover:bg-white/20 py-1 px-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
        } font-medium`
      }
    >
      {item.name}
    </NavLink>
  ));
  return (
    <nav className="bg-secondary1 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="plant logo" />
          <p className="text-white font-bold text-2xl">PlayPal</p>
        </Link>

        {/* for mobile */}

        {/* for bigger screen */}
        <div className="flex items-center gap-6" id="navbar-default">
          <div className="md:flex items-center hidden gap-6 font-medium">
            {navlinks}
          </div>
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="text-white" size={28} />
            <p className="absolute -right-2 top-[15px] px-[8px] py-[3px] text-sm bg-red-600 text-white rounded-full">
              {0}
            </p>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6 text-[#557C56]" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-primary1 font-popins">
              <div className="grid w-[200px] p-4">{navlinks}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
