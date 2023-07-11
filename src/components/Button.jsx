import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Button({
  type,
  size,
  to,
  onClick,
  buttonType,
  children,
}) {
  function buttonSize(size) {
    switch (size) {
      case "small":
        return "px-2 py-1 text-sm w-fit";
      case "medium":
        return "px-4 py-2 text-md w-fit";
      case "large":
        return "px-6 py-4 text-lg w-fit";
      case "full":
        return "w-full py-3 text-md";
      case "half":
        return "w-1/2 py-3 text-md";
      default:
        return "px-4 py-2 text-md";
    }
  }

  function buttonColor(type) {
    switch (type) {
      case "primary":
        return "bg-red-500 hover:bg-red-700";
      case "secondary":
        return "bg-orange-500 hover:bg-orange-700";
      case "tertiary":
        return "bg-yellow-500 hover:bg-yellow-700";
      case "text":
        return "bg-transparent hover:bg-transparent";
      case "disabled":
        return "bg-gray-500 cursor-not-allowed opacity-60";
      default:
        return "";
    }
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`flex items-center justify-center gap-4 rounded text-center font-bold text-white transition duration-300 ease-in-out ${buttonColor(
          type
        )} ${buttonSize(size)}`}
        aria-label={`Botão ${children}`}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={`flex items-center justify-center gap-4 rounded font-bold text-white transition duration-300 ease-in-out ${buttonColor(
          type
        )} ${buttonSize(size)}`}
        onClick={onClick}
        aria-label={`Botão ${children}`}
        type={buttonType}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  buttonType: PropTypes.string,
  children: PropTypes.any,
};
