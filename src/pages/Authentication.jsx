import { useEffect, useState } from "react";
import Button from "../components/Button";

import { MdArrowBack, MdError } from "react-icons/md";
import useAuth from "../hooks/useAuth";

import gamer from "../assets/gamer.svg";

export default function Authentication() {
  const { createAccount, loginWithEmailAndPassword, authError } = useAuth();

  const [page, setPage] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setPageError("");
    }, 4000);
  }, [pageError]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password, "/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPageError("As senhas não coincidem!");
      return;
    } else {
      setPageError("");
      try {
        await createAccount(email, password);
      } catch (error) {
        console.log(error);
      } finally {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-800 bg-cover md:bg-[url(https://i.pinimg.com/originals/d5/e1/ed/d5e1edcb620f13185561b532028558d7.jpg)] ">
      <div className="flex w-full min-w-[65%] flex-col items-center justify-center gap-12 rounded-lg bg-zinc-900 px-12 py-8 drop-shadow-xl md:w-min md:py-24">
        <div className="grid w-full grid-cols-1 items-center justify-center gap-16 text-center text-slate-50 md:grid-cols-2 ">
          <div className="flex flex-col items-center justify-between gap-16">
            <Button type="text" size="full" to={"/"}>
              <MdArrowBack size={24} /> Voltar e navegar sem conta
            </Button>
            <img
              src={gamer}
              alt="Garota jogando video-game"
              className="hidden max-w-xs md:block"
            />
          </div>
          {page === "login" ? (
            <div className="flex w-full flex-col gap-10 rounded-lg md:max-w-md">
              <div>
                <h3 className="text-2xl font-bold text-slate-50 ">
                  Faça login na sua conta!
                </h3>
              </div>
              <form
                method="POST"
                onSubmit={handleLogin}
                className="flex w-full flex-col gap-8 "
              >
                <div className="flex w-full flex-col items-start gap-2">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-slate-50"
                  >
                    E-mail:
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="seuemail@email.com"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  <label
                    htmlFor="password"
                    className="text-lg font-medium text-slate-50"
                  >
                    Senha:
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Sua senha"
                    minLength={6}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>

                {authError !== "" && (
                  <div className="flex w-full max-w-full items-center justify-center gap-4 text-center text-base font-bold text-red-500">
                    <MdError size={24} />
                    <h1>{authError}</h1>
                  </div>
                )}

                <div className="flex w-full items-center justify-center">
                  <Button type="primary" buttonType="submit" size="medium">
                    Entrar
                  </Button>
                </div>
              </form>
              <Button
                onClick={() => setPage("register")}
                type="text"
                size="medium"
              >
                Não possuo conta
              </Button>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-10 rounded-lg md:max-w-md">
              <div>
                <h3 className="text-2xl font-bold text-slate-50 ">
                  Crie sua conta agora mesmo!
                </h3>
              </div>
              <form
                method="POST"
                onSubmit={handleCreateAccount}
                className="flex w-full flex-col gap-8 "
              >
                <div className="flex w-full flex-col items-start gap-2">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-slate-50"
                  >
                    E-mail:
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="seuemail@email.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  <label
                    htmlFor="password"
                    className="text-lg font-medium text-slate-50"
                  >
                    Senha:
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Sua senha"
                    minLength={6}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>

                <div className="flex w-full flex-col items-start gap-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-lg font-medium text-slate-50"
                  >
                    Confirme a senha:
                  </label>
                  <input
                    className="w-full rounded-lg bg-zinc-700 px-4 py-2 font-normal text-zinc-100"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Insira sua senha novamente"
                    minLength={6}
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </div>

                {pageError && pageError !== "" && (
                  <div className="flex w-full max-w-full items-center justify-center gap-4 text-center text-base font-bold text-red-500">
                    <MdError size={24} />
                    <h1>{pageError}</h1>
                  </div>
                )}

                {authError && authError !== "" && (
                  <div className="flex w-full max-w-full items-center justify-center gap-4 text-center text-base font-bold text-red-500">
                    <MdError size={24} />
                    <h1>{authError}</h1>
                  </div>
                )}

                <div className="flex w-full justify-center">
                  <Button type="primary" buttonType="submit" size="medium">
                    Criar conta
                  </Button>
                </div>
              </form>
              <Button
                onClick={() => setPage("login")}
                type="text"
                size="medium"
              >
                Voltar para login
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
