import { useEffect, useState } from "react";

import logotipo from "../assets/infoGamesLogo.svg";
import noData from "../assets/noData.svg";

import Button from "../components/Button";
import Spinner from "../components/Spinner";
import GameCard from "../components/GameCard";

import { MdClear, MdExitToApp, MdFavoriteBorder } from "react-icons/md";

import {
  FaSortAmountUp,
  FaSort,
  FaSortAmountUpAlt,
  FaXbox,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import useFetchData from "../hooks/useFetchData";
import useFilterData from "../hooks/useFilterData";
import ShowError from "../components/ShowError";

export default function Home() {
  const { logOut, isAuthenticated } = useAuth();
  const { fetchData, listGames, loading, error } = useFetchData();
  const {
    filteredData,
    ratingFilter,
    setRatingFilter,
    nameFilter,
    setNameFilter,
    genderFilter,
    setGenderFilter,
    favoritedFilter,
    setFavoritedFilter,
  } = useFilterData(listGames);

  const [listGenres, setListGenres] = useState([]);

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

  function handleRatingFilter() {
    if (ratingFilter === "Nenhum filtro") {
      setRatingFilter("crescente");
    } else if (ratingFilter === "crescente") {
      setRatingFilter("decrescente");
    } else {
      setRatingFilter("Nenhum filtro");
    }
  }

  useEffect(() => {
    fetchData();
    getListGenres(listGames);
  }, [isAuthenticated]);

  const clearFilters = () => {
    setNameFilter("");
    setGenderFilter("");
    setRatingFilter("Nenhum filtro");
    setFavoritedFilter(false);
  };

  return (
    <div className="min-h-screen bg-zinc-800 pb-24">
      <header className=" flex w-full justify-between gap-12 bg-zinc-900 px-12 py-6 drop-shadow-xl">
        <img
          src={logotipo}
          alt="Logotipo InfoGames"
          className="w-1/3 min-w-[8rem] max-w-[16rem]"
        />

        {isAuthenticated ? (
          <Button type="secondary" size="medium" onClick={() => logOut()}>
            <MdExitToApp size={24} />
            Sair
          </Button>
        ) : (
          <Button to={"/auth/"} type="primary" size="medium">
            Entrar ou cadastrar
          </Button>
        )}
      </header>

      <main className=" flex min-h-full w-full flex-col items-center justify-around">
        {/* Filtros */}

        <div className="w-full py-24 ">
          <div className="flex w-full flex-col items-center justify-center gap-8 text-zinc-100 md:flex-wrap lg:flex-row">
            <h3 className="text-lg font-medium">Filtros: </h3>
            <input
              className="w-full max-w-[20rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal md:max-w-[24rem]"
              type="text"
              name="filtroNome"
              id="filtroNome"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Buscar pelo titulo"
            />
            <select
              className="w-full max-w-[20rem] rounded-lg bg-zinc-700 px-4 py-2 font-normal "
              type="text"
              name="filtroGenero"
              id="filtroGenero"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
            >
              <option value={""} disabled>
                Filtrar por gênero
              </option>
              {listGenres.map((genre) => {
                return (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                );
              })}
            </select>

            {isAuthenticated ? (
              <>
                <Button
                  type="primary"
                  size="medium"
                  onClick={() => handleRatingFilter()}
                >
                  {ratingFilter === "Nenhum filtro" ? (
                    <>
                      <FaSort size={24} /> Ordenar por nota
                    </>
                  ) : ratingFilter === "crescente" ? (
                    <>
                      <FaSortAmountUpAlt size={24} /> Menor nota
                    </>
                  ) : (
                    <>
                      <FaSortAmountUp size={24} /> Maior nota
                    </>
                  )}
                </Button>

                <Button
                  type="primary"
                  size="medium"
                  onClick={() => setFavoritedFilter(!favoritedFilter)}
                >
                  <MdFavoriteBorder size={24} />
                  Meus favoritos
                </Button>
              </>
            ) : null}

            {(nameFilter !== "" ||
              genderFilter !== "" ||
              ratingFilter !== "Nenhum filtro" ||
              favoritedFilter) && (
              <Button
                type="secondary"
                size="medium"
                onClick={() => clearFilters()}
              >
                <MdClear size={24} />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center px-12">
          {loading ? (
            <div className="m-24 flex w-full items-center justify-center">
              <Spinner />
            </div>
          ) : null}

          {!loading && error && <ShowError text={error} />}

          {!loading && !error && filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 self-center text-center text-2xl font-bold text-slate-50">
              <img
                src={noData}
                alt=""
                width={320}
                height={320}
                className="max-w-xs"
              />
              <h1>Nenhum jogo encontrado</h1>
            </div>
          )}

          {!loading && !error && filteredData.length > 0 && (
            <div className="grid w-[80%] grid-cols-1 gap-x-14 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {filteredData?.map((game) => {
                return <GameCard key={game.id} game={game} />;
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
