//import { useEffect, useState } from "react";
import { useState } from "react";
import logotipo from "../assets/infoGamesLogo.svg";
import Button from "../components/Button";

export default function Home() {
  const [filtroNome, setFiltroNome] = useState("");
  const [listGames, setListGames] = useState([
    {
      id: 540,
      title: "Overwatch 2",
      thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
      short_description:
        "A hero-focused first-person team shooter from Blizzard Entertainment.",
      game_url: "https://www.freetogame.com/open/overwatch-2",
      genre: "Shooter",
      platform: "PC (Windows)",
      publisher: "Activision Blizzard",
      developer: "Blizzard Entertainment",
      release_date: "2022-10-04",
      freetogame_profile_url: "https://www.freetogame.com/overwatch-2",
    },
    {
      id: 521,
      title: "Diablo Immortal",
      thumbnail: "https://www.freetogame.com/g/521/thumbnail.jpg",
      short_description:
        "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      game_url: "https://www.freetogame.com/open/diablo-immortal",
      genre: "MMOARPG",
      platform: "PC (Windows)",
      publisher: "Blizzard Entertainment",
      developer: "Blizzard Entertainment",
      release_date: "2022-06-02",
      freetogame_profile_url: "https://www.freetogame.com/diablo-immortal",
    },
    {
      id: 517,
      title: "Lost Ark",
      thumbnail: "https://www.freetogame.com/g/517/thumbnail.jpg",
      short_description:
        "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
      game_url: "https://www.freetogame.com/open/lost-ark",
      genre: "ARPG",
      platform: "PC (Windows)",
      publisher: "Amazon Games",
      developer: "Smilegate RPG",
      release_date: "2022-02-11",
      freetogame_profile_url: "https://www.freetogame.com/lost-ark",
    },
  ]);

  /*
  const [listGames, setListGames] = useState([]);

  useEffect(() => {
    async function fetchBets() {
      const response = await fetch(
        "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
        {
          method: "GET",
          headers: {
            "dev-email-address": "rafaelturyminatel@gmail.com",
          },
        }
      );
      if (response.status === 200) {
        setListGames(await response.json());
      }
    }
    fetchBets();
  }, []);
*/

  function filterGames(tittle) {
    console.log(tittle);
    const filteredGames = listGames.filter((game) => {
      return game.title.toLowerCase().includes(tittle.toLowerCase());
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
        <div className="mb-12 flex w-3/4 items-center justify-center">
          <div className="flex w-1/2 flex-col items-start gap-4">
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
                type="secondary"
                size="medium"
                onClick={() => filterGames(filtroNome)}
              >
                {" "}
                Buscar{" "}
              </Button>
            </div>
          </div>

          <div className="flex w-1/4 flex-col items-center justify-center gap-4">
            <label htmlFor="filtroNome" className="font-medium text-slate-50">
              Filtrar por gênero:
            </label>
            <select
              className="w-full max-w-[20rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
              type="text"
              name="filtroNome"
              id="filtroNome"
              value={filtroNome}
              onChange={(e) => setFiltroNome(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            <Button
              type="secondary"
              size="medium"
              onClick={() => filterGames(filtroNome)}
            >
              {" "}
              Buscar{" "}
            </Button>
          </div>
        </div>

        <div className="grid w-4/5 grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {listGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col items-center overflow-hidden rounded-lg bg-zinc-700 drop-shadow-lg"
            >
              <img src={game.thumbnail} alt={game.title} className="w-full" />
              <div className="mx-6 my-4 flex h-full flex-col justify-between">
                <h2 className="w-full text-center text-2xl font-bold text-zinc-100">
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
          ))}
        </div>
      </main>
    </div>
  );
}
