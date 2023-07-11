import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function FavoriteButton({ gameId, isFavorite }) {
  const { isAuthenticated, currentUser } = useAuth();

  const [favorite, setFavorite] = useState(isFavorite);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const triggerAnimation = () => {
    setAnimateHeart(true);
    setTimeout(() => {
      setAnimateHeart(false);
    }, 1500);
  };

  const updateFavorite = async (gameId) => {
    if (isAuthenticated) {
      try {
        const docRef = doc(db, "users", currentUser?.uid);
        const userSnapshot = await getDoc(docRef);
        const userData = userSnapshot.data();

        const isFavorite = userData?.favGames.includes(gameId);

        if (isFavorite) {
          await updateDoc(docRef, {
            favGames: arrayRemove(gameId),
          });
          setFavorite(false);
        } else {
          await updateDoc(docRef, {
            favGames: arrayUnion(gameId),
          });
          setFavorite(true);
          triggerAnimation();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isAuthenticated) {
    return (
      <button
        className={`flex w-fit items-center justify-center gap-2 rounded-lg px-3 py-2 transition-all duration-500 ease-in-out 
        ${
          favorite
            ? "bg-zinc-800 hover:bg-red-950"
            : "bg-zinc-600 hover:bg-zinc-300"
        }
        `}
        onClick={() => updateFavorite(gameId)}
      >
        <MdFavorite
          size="2em"
          className={`${favorite ? "text-red-600" : "text-slate-500"} ${
            animateHeart ? "animate-scale-animation" : ""
          }
          `}
        />
      </button>
    );
  } else {
    return (
      <Link
        to={"/auth/"}
        className={`flex w-fit items-center justify-center gap-2 rounded-lg bg-zinc-600 px-3 py-2  transition-all duration-500 ease-in-out hover:bg-zinc-300`}
      >
        <MdFavorite size="2em" className="text-slate-500" />
      </Link>
    );
  }
}

FavoriteButton.propTypes = {
  gameId: PropTypes.number,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
};
