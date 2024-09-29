import team1 from "@/assets/team1.jpg";
import team2 from "@/assets/team2.webp";
import team3 from "@/assets/team3.jpg";
import team4 from "@/assets/team4.jpg";
import { container } from "@/lib/style";
import Heading from "../ui/Heading";

const MeetTheTeam = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      image: team1,
      bio: "Jane has over 15 years of experience in the sports industry and is passionate about making sports accessible to everyone.",
      favoriteActivity: "Tennis",
    },
    {
      name: "John Smith",
      role: "CTO",
      image: team2,
      bio: "John is a tech enthusiast with a background in software engineering and a love for creating user-friendly platforms.",
      favoriteActivity: "Basketball",
    },
    {
      name: "Rovert Pattision",
      role: "Head of Operations",
      image: team3,
      bio: "Rovert ensures smooth operations and excellent customer service across all our partnered facilities.",
      favoriteActivity: "Swimming",
    },
    {
      name: "Michael Lee",
      role: "Marketing Director",
      image: team4,
      bio: "Michael brings creative strategies to connect sports enthusiasts with the best facilities in their area.",
      favoriteActivity: "Soccer",
    },
  ];
  return (
    <div className={container}>
      <Heading text="Meet the Team" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg group w-full h-96"
          >
            <img
              src={member.image}
              alt={member.name}
              className="transition-transform duration-300 group-hover:scale-110 object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 p-4 group-hover:hidden">
            <h3 className="text-lg text-primary1 font-semibold mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-orange-100 mb-2">{member.role}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {member.name}
              </h3>
            <div>
            <p className="text-sm text-orange-100 mb-2 bg-primary1 inline-block px-2 py-1 rounded-md">{member.role}</p>
            </div>
              <p className="text-xs text-white mb-2 line-clamp-3">
                {member.bio}
              </p>
              <p className="text-xs font-semibold text-orange-200">
                Favorite: {member.favoriteActivity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
