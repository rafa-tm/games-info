import PropTypes from "prop-types";
import erro from "../assets/erro.svg";

export default function ShowError({ text }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 self-center text-center text-2xl font-bold text-slate-50">
      <img src={erro} alt="" width={320} height={320} className="max-w-xs" />
      <h1 className="max-w-[32rem]">{text}</h1>
    </div>
  );
}

ShowError.propTypes = {
  text: PropTypes.string.isRequired,
};
