import { Timeline } from "../ui/Timeline";
const data = [
  {
    title: "Step 1: Browse Facilities",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Explore available sports facilities, view details like location,
          amenities, and photos.
        </p>
      </div>
    ),
  },
  {
    title: "Step 2: Select Your Facility",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Choose a facility based on your sport preference, schedule, and other
          requirements.
        </p>
      </div>
    ),
  },
  {
    title: "Step 3: Pick Date & Time",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Select the date and time for your booking, ensuring it fits your
          schedule.
        </p>
      </div>
    ),
  },
  {
    title: "Step 4: Confirm Availability",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Check if the chosen slot is available and move forward if it is.
        </p>
      </div>
    ),
  },
  {
    title: "Step 5: Make a Booking",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Confirm your booking details and proceed to payment.
        </p>
      </div>
    ),
  },
  {
    title: "Step 6: Payment",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Pay securely through various payment methods (credit/debit card,
          mobile payment, etc.).
        </p>
      </div>
    ),
  },
  {
    title: "Step 7: Receive Confirmation",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Receive a booking confirmation via email or SMS with all the details.
        </p>
      </div>
    ),
  },
  {
    title: "Step 8: Enjoy Your Session",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Show up at the facility at the booked time and enjoy your session!
        </p>
      </div>
    ),
  },
  {
    title: "Step 9: Leave a Review",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          After using the facility, share your experience by leaving a review or
          rating.
        </p>
      </div>
    ),
  },
];

const HowitWorks = () => {
  return (
    <div className="container mx-auto px-4">
      <Timeline data={data} />
    </div>
  );
};

export default HowitWorks;
