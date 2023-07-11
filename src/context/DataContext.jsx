/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { db } from "../services/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const DataContext = createContext({});

export function DataProvider({ children }) {
  const [listGames, setListGames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, idCurrentUser } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    setError("");

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
          reject("O servidor falhou em responder, tente recarregar a página!");
        } else {
          reject(
            "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde."
          );
        }
      });
    });

    Promise.race([fetchAPI, timeoutPromise])
      .then(async (data) => {
        console.log(data);
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
          console.log(listGames);
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

  const saveRating = async (rating, gameId) => {
    if (isAuthenticated) {
      try {
        const docRef = doc(db, "users", idCurrentUser);
        const userSnapshot = await getDoc(docRef);
        const userData = userSnapshot.data();

        const filteredEvaluatedGames = userData?.evaluatedGames.filter(
          (game) => game.id !== gameId
        );

        const updatedEvaluatedGames = [
          ...filteredEvaluatedGames,
          { id: gameId, rating: rating },
        ];

        await updateDoc(docRef, {
          evaluatedGames: updatedEvaluatedGames,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveFavorite = async (gameId) => {
    if (isAuthenticated) {
      try {
        const docRef = doc(db, "users", idCurrentUser);
        const userSnapshot = await getDoc(docRef);
        const userData = userSnapshot.data();

        const isFavorite = userData?.favGames.includes(gameId);

        if (isFavorite) {
          await updateDoc(docRef, {
            favGames: arrayRemove(gameId),
          });
        } else {
          await updateDoc(docRef, {
            favGames: arrayUnion(gameId),
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  return (
    <DataContext.Provider
      value={{
        setListGames,
        listGames,
        error,
        loading,
        fetchData,
        saveRating,
        saveFavorite,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
