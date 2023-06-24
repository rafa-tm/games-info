import { useEffect, useState } from "react";
import logotipo from "../assets/infoGamesLogo.svg";
import Button from "../components/Button";

import { MdError, MdFilterList } from "react-icons/md";
import Spinner from "../components/Spinner";
import GameCard from "../components/GameCard";

export default function Home() {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [listGames, setListGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setError("O servidor demorou para responder, tente mais tarde");
    }, 5000);

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
            clearTimeout(timeout);
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
                "O servidor falhou em responder, tente recarregar a página!"
              );
            } else {
              setError(
                "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
              );
            }
          })
          .then((data) => {
            setListGames(data);
            setFilteredGames(data);
            getListGenres(data);
          });
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  function getListGenres(data) {
    const genres = ["Nenhum filtro"];

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

  function filterGamesByTittle(tittle) {
    console.log(tittle);
    if (tittle === "") {
      setFilteredGames(listGames);
      return;
    }
    const filteredGames = listGames.filter((game) => {
      return game.title.toLowerCase().includes(tittle.toLowerCase());
    });
    setFilteredGames(filteredGames);
  }

  function filterGamesByGenre(genre) {
    if (genre === "Nenhum filtro") {
      setFilteredGames(listGames);
      return;
    }
    const filteredGames = listGames.filter((game) => {
      return game.genre === genre;
    });
    setFilteredGames(filteredGames);
  }

  return (
    <div className="min-h-screen bg-zinc-800 py-24 md:py-32">
      <header className="fixed top-0 z-50 flex w-full justify-center gap-12 bg-zinc-900 px-12 py-6 drop-shadow-xl">
        <img
          src={logotipo}
          alt="Logotipo InfoGames"
          className="w-1/3 min-w-[10rem] max-w-[16rem]"
        />

        <div className="sm:hidden">
          <Button
            type="primary"
            size="small"
            onClick={() => setShowFilters(!showFilters)}
          >
            <MdFilterList size={24} className="text-slate-50" />
          </Button>
        </div>
      </header>

      <main className="flex w-full flex-col items-center justify-center px-8 py-4 md:px-12">
        {/* Filtros */}

        {showFilters && (
          <div className="mb-12 flex w-[95%] flex-col items-center justify-center gap-8 md:flex-row">
            <div className="flex w-full flex-col items-center justify-end gap-4 md:w-1/2 xl:flex-row">
              <label
                htmlFor="filtroNome"
                className="text-center font-medium text-slate-50"
              >
                Buscar pelo titulo:
              </label>

              <div className="flex w-5/6 justify-center gap-4 lg:w-1/2">
                <input
                  className="w-full max-w-[24rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                  type="text"
                  name="filtroNome"
                  id="filtroNome"
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
                <Button
                  type="primary"
                  size="medium"
                  onClick={() => filterGamesByTittle(filtroNome.trim())}
                >
                  {" "}
                  Buscar{" "}
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-4 md:w-1/2 xl:flex-row">
              <label
                htmlFor="filtroGenero"
                className="text-center font-medium text-slate-50"
              >
                Filtrar por gênero:
              </label>

              <div className="flex w-5/6 justify-center gap-4 lg:w-1/2">
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
        )}

        {loading ? (
          <div className="m-24 flex w-full items-center justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="m-24 flex w-3/5 flex-col items-center gap-4 text-center text-2xl font-bold text-slate-50">
            <MdError size={48} className="text-red-600" />
            <h1>{error}</h1>
          </div>
        ) : (
          <div className="grid w-[95%] grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filtroNome !== "" || filtroGenero !== "Nenhum filtro"
              ? filteredGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              : listGames.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
        )}
      </main>
    </div>
  );
}
