import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";

export default function FavoriteButton({ gameId, isFavorite }) {
  const { isAuthenticated } = useAuth();
  const { listGames, setListGames, saveFavorite } = useFetch();

  const [favorite, setFavorite] = useState(isFavorite);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const triggerAnimation = () => {
    setAnimateHeart(true);
    setTimeout(() => {
      setAnimateHeart(false);
    }, 1800);
  };

  const updateFavorite = () => {
    if (isAuthenticated) {
      saveFavorite(gameId);

      triggerAnimation();

      const newList = listGames.map((game) => {
        if (game.id === gameId) {
          return {
            ...game,
            isFavorite: !favorite,
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
      <button
        className={`flex w-fit items-center justify-center gap-2 rounded-full px-3 py-2 transition-all duration-500 ease-in-out 
        ${
          favorite
            ? "bg-zinc-800 hover:bg-red-950"
            : "bg-zinc-600 hover:bg-zinc-300"
        }
        `}
        onClick={() => updateFavorite(gameId)}
      >
        <MdFavorite
          size="2em"
          className={`${favorite ? "text-red-600" : "text-slate-500"} ${
            animateHeart ? "animate-scale-animation" : ""
          }
          `}
        />
      </button>
    );
  } else {
    return (
      <Link
        to={"/auth"}
        className={`flex w-fit items-center justify-center gap-2 rounded-full bg-zinc-600 px-3 py-2  transition-all duration-500 ease-in-out hover:bg-zinc-300`}
      >
        <MdFavorite size="2em" className="text-slate-500" />
      </Link>
    );
  }
}

FavoriteButton.propTypes = {
  gameId: PropTypes.number,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
};
