import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Rating({ gameId, initialRating }) {
  const { isAuthenticated, currentUser } = useAuth();
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    if (isAuthenticated) setRating(initialRating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, initialRating]);

  const handleRating = async (rating) => {
    if (isAuthenticated) {
      try {
        const docRef = doc(db, "users", currentUser?.uid);
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

        setRating(rating);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-2 py-1">
        {[1, 2, 3, 4].map((value) => (
          <MdStar
            key={value}
            size="1.5em"
            className={`cursor-pointer transition-all hover:scale-125 ${
              value <= rating ? "text-yellow-400" : "text-gray-400"
            } `}
            onClick={() => handleRating(value)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <Link to={"/auth/"} className="flex items-center gap-2">
        {[1, 2, 3, 4].map((star) => {
          return (
            <MdStar
              key={star}
              size="1.5em"
              className="cursor-pointer text-gray-400"
            />
          );
        })}
      </Link>
    );
  }
}

Rating.propTypes = {
  gameId: PropTypes.number,
  initialRating: PropTypes.number,
};
