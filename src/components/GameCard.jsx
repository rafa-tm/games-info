import PropTypes from "prop-types";

import Button from "./Button";
import Rating from "./Rating";

import { MdLaunch } from "react-icons/md";

import FavoriteButton from "./FavoriteButton";

export default function GameCard({ game }) {
  //const { isAuthenticated, currentUser } = useAuth();

  return (
    <div className="center flex flex-col items-center overflow-hidden rounded-lg bg-zinc-700 shadow-2xl shadow-zinc-950 transition-all hover:scale-105">
      <img src={game.thumbnail} alt={game.title} className="w-full" />

      <div className="mx-8 my-4 flex h-full flex-col justify-between gap-8">
        <div className=" flex flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <Rating gameId={game.id} initialRating={game.rating} />
            <FavoriteButton gameId={game.id} isFavorite={game.isFavorite} />
          </div>

          <div className="flex flex-col gap-2 text-lg text-slate-100">
            <h2 className="w-full text-2xl font-bold">{game.title}</h2>
            <div className="flex items-center justify-between text-sm">
              <p className="">Gênero:</p>
              <p className="rounded-full bg-zinc-950 px-3 py-1">{game.genre}</p>
            </div>
            <div className="mt-2 w-full">
              <p className="text-justify text-zinc-100">
                {game.short_description}
              </p>
            </div>
          </div>
        </div>

        <Button
          type="secondary"
          size={"full"}
          onClick={() => window.open(game.game_url)}
        >
          <MdLaunch />
          Ver mais
        </Button>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object,
};
