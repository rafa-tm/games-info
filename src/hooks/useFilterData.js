import { useState } from "react";
import sortBy from "sort-by";
import useFetch from "./useFetch";

const useFilterData = () => {
    const [nameFilter, setNameFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [favoritedFilter, setFavoritedFilter] = useState(false);
    const [ratingFilter, setRatingFilter] = useState("Nenhum filtro");
    const { listGames } = useFetch();

    let filteredData = listGames;

    if (nameFilter) {
        filteredData = filteredData?.filter((game) => {
            return game.title.toLowerCase().includes(nameFilter.toLowerCase());
        });
    }

    if (genderFilter !== "" && genderFilter !== "Nenhum filtro") {
        filteredData = filteredData?.filter((game) => {
            return game.genre === genderFilter;
        });
    }

    if (favoritedFilter) {
        filteredData = filteredData?.filter((game) => {
            return game.isFavorite === true;
        });
    }

    if (ratingFilter === "decrescente") {
        filteredData?.sort(sortBy("-rating"));
    } else if (ratingFilter === "crescente") {
        filteredData?.sort(sortBy("rating"));

        let ratingFilterAux = filteredData?.filter((game) => {
            return game.rating === 0 || game.rating === null;
        });


        filteredData = filteredData?.filter((game) => {
            return game.rating !== 0 && game.rating !== null;
        });


        filteredData = filteredData?.concat(ratingFilterAux);
    }

    return { filteredData, nameFilter, setNameFilter, genderFilter, setGenderFilter, favoritedFilter, setFavoritedFilter, ratingFilter, setRatingFilter };
};

export default useFilterData;