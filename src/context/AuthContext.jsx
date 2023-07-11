import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuário autenticado.");
        setIsAuthenticated(true);
      } else {
        console.log("Usuário não autenticado.");
        setIsAuthenticated(false);
      }
    });
    setAuthError("");
  }, []);

  const createAccount = async (email, password) => {
    try {
      if (!email || !password) {
        setAuthError("E-mail e senha são obrigatórios.");
        return;
      }

      if (password.length < 6) {
        setAuthError("A senha deve ter no mínimo 6 caracteres.");
        return;
      }

      if (await createUserWithEmailAndPassword(auth, email, password)) {
        console.log("Usuário criado com sucesso!");
        const docRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(docRef, {
          favGames: [{ id: 0 }],
          evaluatedGames: [{ id: 0, rating: 0 }],
        });
        navigate("/");
      } else {
        console.log("Erro ao criar usuário.");
      }
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password, path) => {
    try {
      if (!email || !password) {
        setAuthError("E-mail e senha são obrigatórios!");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      if (path) {
        navigate(path);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        setAuthError("Senha incorreta, tente novamente.");
        return;
      }

      if (error.code === "auth/user-not-found") {
        setAuthError("Usuário não encontrado, tente novamente ou cadastre-se.");
        return;
      }

      setAuthError(error.message);
      return;
    }
    setAuthError("");
  };

  const logOut = async () => {
    try {
      if (!auth?.currentUser) {
        console.log("Usuário não autenticado.");
        return;
      } else {
        await signOut(auth);
      }
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        createAccount,
        loginWithEmailAndPassword,
        currentUser: auth?.currentUser,
        isAuthenticated,
        logOut,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
