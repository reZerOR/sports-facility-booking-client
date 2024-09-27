import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/playpalsolo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon} from "lucide-react";

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
            ? "py-1 px-3 bg-primary1 text-white rounded-full"
            : "text-black hover:bg-orange-200 py-1 px-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
        } font-medium`
      }
    >
      {item.name}
    </NavLink>
  ));
  return (
    <nav className="bg-orange-100 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center rtl:space-x-reverse"
        >
          <img src={logo} className="h-10" alt="plant logo" />
          <p className="text-primary1 font-bold text-2xl">PlayPal</p>
        </Link>

        {/* for mobile */}

        {/* for bigger screen */}
        <div className="flex items-center gap-6" id="navbar-default">
          <div className="md:flex items-center hidden gap-2 font-medium">
            {navlinks}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="md:hidden bg-primary1">
                <MenuIcon className="size-6 text-white" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-orange-100 font-popins">
              <div className="grid w-[200px] p-4">{navlinks}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
