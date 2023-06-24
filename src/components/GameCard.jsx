import PropTypes from "prop-types";
import Button from "./Button";
import { MdLaunch } from "react-icons/md";

export default function GameCard({ game }) {
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-lg bg-zinc-700 drop-shadow-lg">
      <img src={game.thumbnail} alt={game.title} className="w-full" />
      <div className="mx-6 my-4 flex h-full flex-col justify-between">
        <h2 className="w-full text-center text-2xl font-bold text-slate-50">
          {game.title}
        </h2>

        <div className="my-3 flex flex-col gap-2 text-slate-50">
          <div className="flex w-full justify-between">
            <span>Gênero: </span>
            <strong className="text-right">{game.genre}</strong>
          </div>

          <div className="flex w-full justify-between">
            <span>Plataforma: </span>
            <strong className="text-right">{game.platform}</strong>
          </div>

          <div className="flex w-full justify-between">
            <span>Desenvolvedor: </span>
            <strong className="text-right">{game.developer}</strong>
          </div>

          <div className="flex w-full justify-between">
            <span>Publicador: </span>
            <strong className="text-right">{game.publisher}</strong>
          </div>

          <div className="flex w-full justify-between">
            <span>Data de lançamento: </span>
            <strong className="text-right">{game.release_date}</strong>
          </div>
          <div className="mt-4 w-full">
            <p className="text-justify text-zinc-100">
              {game.short_description}
            </p>
          </div>
        </div>

        <Button
          type="secondary"
          size={"full"}
          onClick={() => window.open(game.game_url)}
        >
          <MdLaunch />
          Visitar página do game
        </Button>
      </div>
    </div>
  );
}

GameCard.propTypes = {
  game: PropTypes.object,
};
