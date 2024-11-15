import { Link, NavLink } from "react-router-dom";
import logo from "@/assets/playpalsolo.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/Features/auth/authSlice";

const menu = [
  {
    name: "Facility",
    to: "/facility",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Contact Us",
    to: "/contact",
  },
];

const Navbar = () => {
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  // console.log(user);
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

  if (user) {
    navlinks.push(
      <NavLink
        key="dashboard"
        to="/dashboard"
        className={({ isActive }) =>
          `${
            isActive
              ? "py-1 px-3 bg-primary1 text-white rounded-full"
              : "text-black hover:bg-orange-200 py-1 px-3 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
          } font-medium`
        }
      >
        Dashboard
      </NavLink>
    );
  }

  const loginLogout = user ? (
    <Button
      onClick={() => dispatch(logout())}
      variant="destructive"
      className="font-bold"
    >
      Logout
    </Button>
  ) : (
    <Link to={"/login"}>
      <Button
        variant="secondary"
        className="bg-accent1 hover:bg-accentDark text-white font-bold"
      >
        Login
      </Button>
    </Link>
  );
  return (
    <nav className="bg-orange-100 border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center rtl:space-x-reverse">
          <img src={logo} className="h-10" alt="plant logo" />
          <p className="text-primary1 font-bold text-2xl">PlayPal</p>
        </Link>

        {/* for mobile */}

        {/* for bigger screen */}
        <div className="flex items-center gap-6" id="navbar-default">
          <div className="md:flex items-center hidden gap-2 font-medium">
            {navlinks}
            {loginLogout}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="md:hidden bg-primary1"
              >
                <MenuIcon className="size-6 text-white" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-orange-100 font-popins">
              <div className="grid gap-1 w-[200px] p-4">{navlinks}{loginLogout}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
