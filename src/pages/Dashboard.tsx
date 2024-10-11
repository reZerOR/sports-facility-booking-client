import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { format } from "date-fns";
import { Activity, BellRing, CopyCheck, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  bgColor,
  textColor,
  icon,
}: StatCardProps) => {
  return (
    <Card className={`${bgColor} ${textColor}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          <div className="flex items-center gap-2">
            {icon}
            <span>{value}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: "Total Bookings",
      value: 8,
      bgColor: "bg-orange-500",
      textColor: "text-white",
      icon: <CopyCheck />,
    },
    {
      title: "Upcoming",
      value: 8,
      bgColor: "bg-orange-400",
      textColor: "text-white",
      icon: <Activity />,
    },
    {
      title: "Next Booking",
      value: format(new Date(), "MMM d, yyyy"),
      bgColor: "bg-orange-300",
      textColor: "text-orange-900",
      icon: <BellRing />,
    },
    {
      title: "Total Spending",
      value: "100.00",
      bgColor: "bg-orange-300",
      textColor: "text-orange-900",
      icon: <DollarSign />,
    },
  ];

  const user = useAppSelector(useCurrentUser);

  return (
    <div className="p-4">
      <Card className="mb-6 bg-white bg-opacity-80 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-orange-800">
            Welcome back, {user?.name}!
          </CardTitle>
          <CardDescription>
            Ready for your next game? Here's a snapshot of your activity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                icon={stat.icon}
                value={stat.value}
                bgColor={stat.bgColor}
                textColor={stat.textColor}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
