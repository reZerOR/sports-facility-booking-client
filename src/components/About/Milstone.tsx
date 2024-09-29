import React from "react";
import Heading from "../ui/Heading";
import { FadeText } from "../ui/FadeText";

interface TimelineItemProps {
  label: string;
  date: string;
  title: string;
  content: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  label,
  date,
  title,
  content,
}) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    <div className="font-medium text-2xl text-primary1 mb-1 sm:mb-0">
      <FadeText
        direction="left"
        text={label}
        framerProps={{
          show: {
            transition: {
              delay: 0.3,
            },
          },
        }}
      />
    </div>
    <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-primary1 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-primary1 after:border-4 after:box-content after:border-orange-100 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
      <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-accent1 bg-accent1/10 rounded-full">
        <FadeText
          text={date}
          framerProps={{
            show: {
              transition: {
                delay: 0.2,
              },
            },
          }}
        />
      </time>
      <div className="text-xl font-bold text-slate-900">
        <FadeText
          direction="right"
          text={title}
          framerProps={{
            show: {
              transition: {
                delay: 0.4,
              },
            },
          }}
        />
      </div>
    </div>
    <div className="text-slate-500">
      <FadeText
        text={content}
        direction="down"
        framerProps={{
          show: {
            transition: {
              delay: 0.5,
            },
          },
        }}
      />
    </div>
  </div>
);

const Milstone = () => {
  const timelineData = [
    {
      label: "The Idea",
      date: "May, 2022",
      title: "The Concept for [Your Website Name] Was Born",
      content:
        "Recognizing the need for an easier way to book sports facilities, we started developing a platform to connect players with venues and reviews.",
    },
    {
      label: "Platform Launch",
      date: "May, 2023",
      title: "PlayPal Officially Launched",
      content:
        "With initial partnerships from local sports facilities, we launched our platform, allowing users to book their favorite venues with ease.",
    },
    {
      label: "First Major Milestone",
      date: "Jun, 2023",
      title: "Over 1,000 Bookings and 100 Reviews",
      content:
        "Just a few months after launching, we reached a significant milestone with over 1,000 bookings and more than 100 user-submitted reviews.",
    },
    {
      label: "Mobile Experience",
      date: "Jul, 2023",
      title: "Mobile-Friendly Version Launched",
      content:
        "To meet user demand, we introduced a mobile-optimized experience, making it even easier to book sports facilities on the go.",
    },
    {
      label: "Growing Community",
      date: "Aug, 2024",
      title: "Reached 10K Users and 500 Reviews",
      content:
        "Our platform grew rapidly, with over 10,000 users and a vibrant community contributing reviews, helping others find the best venues.",
    },
    {
      label: "Expanding Reach",
      date: "Sep, 2024",
      title: "Added New Cities and Sports Facilities",
      content:
        "As our user base grew, we expanded our reach to include sports facilities in more cities, making it easier for everyone to find and book top venues.",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col justify-center overflow-hidden my-20">
      <Heading text="Our Milestones" />
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col justify-center divide-y divide-slate-20">
          <div className="w-full max-w-3xl mx-auto bg-primary1/10 px-10 py-10 rounded-xl">
            <div className="-my-6">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  label={item.label}
                  date={item.date}
                  title={item.title}
                  content={item.content}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Milstone;
