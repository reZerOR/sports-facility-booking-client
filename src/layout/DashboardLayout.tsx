import { useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import {
  ChevronsRight,
  Home,
  LucideIcon,
  CalendarCheck,
  LayoutList,
  UserCog,
} from "lucide-react";
import logo from "@/assets/playpalsolo.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

export const DashboardLayout = () => {
  return (
    <div className="flex bg-primary1/5">
      <Sidebar />
      <ExampleContent />
    </div>
  );
};
const userNavs = [
  { Icon: Home, title: "Dashboard", path: "/dashboard" },
  { Icon: CalendarCheck, title: "My Bookings", path: "/dashboard/bookings" },
];

const adminNavs = [
  { Icon: Home, title: "Dashboard", path: "/dashboard" },
  { Icon: CalendarCheck, title: "Bookings", path: "/dashboard/bookings" },
  { Icon: LayoutList, title: "Facilities", path: "/dashboard/facilities" },
  { Icon: UserCog, title: "Add Admin", path: "/dashboard/add-admin" },
];

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const selected = location.pathname;
  const userOptions = user?.role === "user" ? userNavs : adminNavs;
  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {userOptions.map((option) => (
          <Option
            key={option.title}
            Icon={option.Icon}
            title={option.title}
            path={option.path}
            selected={selected}
            open={open}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

interface OptionProps {
  Icon: LucideIcon;
  title: string;
  path: string;
  selected: string;
  open: boolean;
  notifs?: number;
}

const Option = ({ Icon, title, path, selected, open, notifs }: OptionProps) => {
  return (
    <Link to={path}>
      <motion.button
        layout
        // onClick={}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === path
            ? "bg-primary1/10 text-primary1"
            : "text-slate-500 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

interface TitleSectionProps {
  open: boolean;
}

const TitleSection = ({ open }: TitleSectionProps) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs text-primary1 font-semibold">
                PlayPal
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div layout className="">
      <Link to="/">
        <img src={logo} alt="logo" className="h-7 w-auto" />
      </Link>
    </motion.div>
  );
};

interface ToggleCloseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleClose = ({ open, setOpen }: ToggleCloseProps) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => (
  <div className="w-full">
    <Outlet />
  </div>
);
