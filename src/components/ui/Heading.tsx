import { GradualSpacing } from "./GradualSpacing";

const Heading = ({ text }: { text: string }) => {
  return (
    <h2 className="~/xl:~text-3xl/6xl my-10 font-black font-raleway text-center text-primary1">
      <GradualSpacing
        text={text}
        duration={0.5}
        delayMultiple={0.04}
        framerProps={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        className="drop-shadow-sm"
      />
    </h2>
  );
};

export default Heading;
