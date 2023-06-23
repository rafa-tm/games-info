import { useEffect, useState } from "react";
import logotipo from "../assets/infoGamesLogo.svg";
import Button from "../components/Button";

import { MdError } from "react-icons/md";
import Spinner from "../components/Spinner";

export default function Home() {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [listGames, setListGames] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        await fetch(
          "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
          {
            method: "GET",
            headers: {
              "dev-email-address": "rafaelturyminatel@gmail.com",
            },
          }
        )
          .then((response) => {
            if (response.status === 200) {
              setError("");
              return response.json();
            } else if (
              response.status === 500 ||
              response.status === 502 ||
              response.status === 503 ||
              response.status === 504 ||
              response.status === 507 ||
              response.status === 508 ||
              response.status === 509
            ) {
              setError(
                "O servidor fahou em responder, tente recarregar a página!"
              );
            } else {
              setError(
                "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
              );
            }
          })
          .then((data) => {
            setListGames(data);
            getListGenres(data);
          });
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  function getListGenres(data) {
    const genres = ["Nenhum"];

    if (!data) {
      return;
    }

    data.map((game) => {
      if (!genres.includes(game.genre)) {
        genres.push(game.genre);
      }
    });

    setListGenres(genres);
  }

  function filterGames(tittle) {
    console.log(tittle);
    const filteredGames = listGames.filter((game) => {
      return game.title.toLowerCase().includes(tittle.toLowerCase());
    });
    setListGames(filteredGames);
  }

  function filterGamesByGenre(genre) {
    const filteredGames = listGames.filter((game) => {
      return game.genre === genre;
    });
    setListGames(filteredGames);
  }

  return (
    <div className="min-h-screen bg-zinc-800 py-32">
      <header className="fixed top-0 z-50 w-full bg-zinc-900 px-12 py-6 drop-shadow-xl">
        <img
          src={logotipo}
          alt="Logotipo InfoGames"
          className="w-1/3 max-w-[16rem]"
        />
        <div></div>
      </header>

      <main className="flex w-full flex-col items-center px-12 py-6">
        <div className="mb-12 flex w-[95%] items-center justify-between">
          <div className="flex w-1/2 flex-col items-center gap-4">
            <label htmlFor="filtroNome" className="font-medium text-slate-50">
              Buscar pelo titulo:
            </label>
            <div className="flex w-full justify-start gap-4">
              <input
                className="w-full max-w-[28rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                type="text"
                name="filtroNome"
                id="filtroNome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
              <Button
                type="primary"
                size="medium"
                onClick={() => filterGames(filtroNome)}
              >
                {" "}
                Buscar{" "}
              </Button>
            </div>
          </div>

          <div className="flex w-1/4 flex-col items-center justify-center gap-4">
            <label htmlFor="filtroGenero" className="font-medium text-slate-50">
              Filtrar por gênero:
            </label>
            <div className="flex gap-4">
              <select
                className="w-full max-w-[20rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                type="text"
                name="filtroGenero"
                id="filtroGenero"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
              >
                {listGenres.map((genre) => {
                  return (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  );
                })}
              </select>
              <Button
                type="primary"
                size="medium"
                onClick={() => filterGamesByGenre(filtroGenero)}
              >
                {" "}
                Buscar{" "}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="m-24 flex w-3/5 flex-col items-center gap-4 text-center text-2xl font-bold text-slate-50">
            <MdError size={48} className="text-red-600" />
            <h1>{error}</h1>
          </div>
        )}

        {loading && (
          <div className="flex w-full items-center justify-center">
            <Spinner />
          </div>
        )}

        <div className="grid w-4/5 grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {listGames
            ? listGames
                .map((game) => (
                  <div
                    key={game.id}
                    className="flex flex-col items-center overflow-hidden rounded-lg bg-zinc-700 drop-shadow-lg"
                  >
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full"
                    />
                    <div className="mx-6 my-4 flex h-full flex-col justify-between">
                      <h2 className="w-full text-center text-2xl font-bold text-slate-50">
                        {game.title}
                      </h2>

                      <div className="my-3 flex flex-col gap-2 text-slate-50">
                        <div className="flex w-full justify-between">
                          <span>Gênero: </span>
                          <strong>{game.genre}</strong>
                        </div>

                        <div className="flex w-full justify-between">
                          <span>Plataforma: </span>
                          <strong>{game.platform}</strong>
                        </div>

                        <div className="flex w-full justify-between">
                          <span>Desenvolvedor: </span>
                          <strong>{game.developer}</strong>
                        </div>

                        <div className="flex w-full justify-between">
                          <span>Publicador: </span>
                          <strong>{game.publisher}</strong>
                        </div>

                        <div className="flex w-full justify-between">
                          <span>Data de lançamento: </span>
                          <strong>{game.release_date}</strong>
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
                        Ver página
                      </Button>
                    </div>
                  </div>
                ))
                .splice(0, 6)
            : null}
        </div>
      </main>
    </div>
  );
}
