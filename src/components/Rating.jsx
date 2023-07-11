import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function Rating({ gameId, initialRating }) {
  const { isAuthenticated } = useAuth();
  const { listGames, setListGames, saveRating } = useFetch();
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating, isAuthenticated]);

  const updateRating = (rating) => {
    if (isAuthenticated) {
      saveRating(rating, gameId);
      const newList = listGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            rating: rating,
          };
        } else {
          return game;
        }
      });
      setListGames(newList);
      console.log(newList);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-2 py-1">
        {[1, 2, 3, 4].map((value) => (
          <MdStar
            key={value}
            size="1.5em"
            className={`cursor-pointer transition-all hover:scale-125 ${
              value <= rating ? "text-yellow-400" : "text-gray-400"
            } `}
            onClick={() => updateRating(value)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <Link to={"/auth/"} className="flex items-center gap-2">
        {[1, 2, 3, 4].map((star) => {
          return (
            <MdStar
              key={star}
              size="1.5em"
              className="cursor-pointer text-gray-400"
            />
          );
        })}
      </Link>
    );
  }
}

Rating.propTypes = {
  gameId: PropTypes.number,
  initialRating: PropTypes.number,
};
