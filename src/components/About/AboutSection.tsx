import aboutUsImage from "@/assets/player1.jpg";
import aboutUsImage2 from "@/assets/player2.webp";
import Heading from "../ui/Heading";

function AboutSection() {
  return (
    <section className="py-10 bg-orange-100 relative">
      <Heading text="About Us" />
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 hidden md:grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <img
                className=" rounded-xl object-cover"
                src={aboutUsImage}
                alt="about Us image"
              />
            </div>
            <img
              className="sm:ml-0 ml-auto rounded-xl object-cover"
              src={aboutUsImage2}
              alt="about Us image"
            />
          </div>
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Empowering Players to Play and Succeed
                </h2>
                <p className="text-gray-500 max-w-xl text-base font-normal leading-relaxed lg:text-start text-center">
                  At <span className="text-primary1 font-bold">PlayPal</span>,
                  we’re passionate about making sports accessible, enjoyable,
                  and easy to book for everyone. Whether you're an avid athlete
                  or just looking to have fun with friends, we’ve built a
                  platform that connects you with top-rated sports facilities
                  across the region. From soccer fields and tennis courts to
                  basketball gyms and swimming pools, our goal is to bring the
                  best sports venues to your fingertips.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
