import { useEffect, useState } from "react";
import useAuth from "./useAuth";

import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const useFetchData = () => {
    const { isAuthenticated, idCurrentUser } = useAuth();
    const [listGames, setListGames] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("O servidor demorou para responder, tente mais tarde.");
            }, 5000);
        });

        const fetchAPI = new Promise((resolve, reject) => {
            fetch("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
                method: "GET",
                headers: {
                    "dev-email-address": "email@mail.com",
                },
            }).then((response) => {
                if (response.status === 200) {
                    resolve(response.json());
                } else if (
                    response.status === 500 ||
                    response.status === 502 ||
                    response.status === 503 ||
                    response.status === 504 ||
                    response.status === 507 ||
                    response.status === 508 ||
                    response.status === 509
                ) {
                    reject(
                        "O servidor falhou em responder, tente recarregar a página!"
                    );
                } else {
                    reject(
                        "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
                    );
                }
            });
        });

        Promise.race([fetchAPI, timeoutPromise])
            .then(async (data) => {
                if (isAuthenticated) {
                    const docRef = doc(db, "users", idCurrentUser);
                    const userSnapshot = await getDoc(docRef);
                    const userData = userSnapshot.data();

                    const { favGames, evaluatedGames } = userData;

                    const gamesFavs = data.map((game) => {
                        if (favGames.includes(game.id)) {
                            return {
                                ...game,
                                isFavorite: true,
                            };
                        } else {
                            return {
                                ...game,
                                isFavorite: false,
                            };
                        }
                    });

                    const listGamesEvaluated = gamesFavs.map((game) => {
                        const gameById = evaluatedGames.filter(
                            (evaluatedGame) => evaluatedGame.id === game.id
                        );

                        if (gameById.length > 0) {
                            return {
                                ...game,
                                rating: gameById[0].rating,
                            };
                        } else {
                            return {
                                ...game,
                                rating: 0,
                            };
                        }
                    });

                    setListGames(listGamesEvaluated);
                } else if (error && error !== "") {
                    setListGames(data);
                } else {
                    setListGames([]);
                }
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const updateFavorite = (id) => {
        const newListGames = listGames.map((game) => {
            if (game.id === id) {
                return {
                    ...game,
                    isFavorite: !game.isFavorite,
                };
            } else {
                return game;
            }
        });

        setListGames(newListGames);
    }

    const updateRating = (id, rating) => {
        // const newListGames = listGames.map((game) => {
        //     if (game.id === id) {
        //         return {
        //             ...game,
        //             rating: rating,
        //         };
        //     } else {
        //         return game;
        //     }
        // });

        // setListGames(newListGames);
    };

    return { fetchData, listGames, error, loading, updateRating, updateFavorite };
};



export default useFetchData;