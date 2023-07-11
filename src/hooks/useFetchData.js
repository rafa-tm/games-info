import { useEffect, useState } from "react";
import useAuth from "./useAuth";

import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const useFetchData = () => {
    const { isAuthenticated, currentUser } = useAuth();
    const [listGames, setListGames] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
                        setHasError(true);
                        reject(
                            "O servidor falhou em responder, tente recarregar a página!"
                        );
                    } else {
                        setHasError(true);
                        reject(
                            "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
                        );
                    }
                });
            });

            Promise.race([fetchAPI, timeoutPromise])
                .then(async (data) => {
                    // console.log("data: ");
                    // console.log(data);

                    if (isAuthenticated) {
                        const docRef = doc(db, "users", currentUser?.uid);
                        const userSnapshot = await getDoc(docRef);
                        const userData = userSnapshot.data();

                        // console.log("userData: ");
                        // console.log(userData);

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

                        // console.log("gamesEvaluated: ");
                        //console.log(listGamesEvaluated);
                        // return listGamesEvaluated;
                        setListGames(listGamesEvaluated);
                    } else if (hasError) {
                        setListGames([]);
                    } else {
                        setListGames(data);
                    }
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setLoading(false);
                });

        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return { listGames, hasError, error, loading };
};

export default useFetchData;