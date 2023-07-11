import { useState } from "react";
import sortBy from "sort-by";

const useFilterData = (data) => {
    const [nameFilter, setNameFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [favoritedFilter, setFavoritedFilter] = useState(false);
    const [ratingFilter, setRatingFilter] = useState("Nenhum filtro");

    let filteredData = data;

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
    }

    console.log("filteredData: ");
    console.log(filteredData);
    return { filteredData, nameFilter, setNameFilter, genderFilter, setGenderFilter, favoritedFilter, setFavoritedFilter, ratingFilter, setRatingFilter };
};

export default useFilterData;