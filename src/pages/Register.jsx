import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Button from "../components/Button";
import { MdError } from "react-icons/md";

export default function Register() {
  const { createAccount, loginWithEmailAndPassword, authError, setAuthError } =
    useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setAuthError("");
    try {
      await createAccount(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-800 bg-cover md:bg-[url(https://images.pexels.com/photos/1637438/pexels-photo-1637438.jpeg)] ">
      <div className="flex min-w-[40%] flex-col items-center justify-center gap-8 rounded-lg bg-zinc-900 px-8 py-24 drop-shadow-xl md:px-32">
        <div className="flex w-full max-w-sm flex-col gap-12 text-center">
          <h3 className="text-2xl font-bold text-slate-50 ">
            Crie uma conta agora mesmo!
          </h3>
        </div>

        <div className="flex w-full flex-col gap-6 overflow-hidden rounded-lg ">
          <form
            method="POST"
            onSubmit={handleCreateAccount}
            className="flex w-full flex-col items-center justify-center gap-8 px-6"
          >
            <div className="flex w-full flex-col gap-2">
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

            <div className="flex w-full flex-col gap-2">
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

            <div className="flex gap-16">
              <div className="flex w-full justify-center">
                <Button type="primary" buttonType="submit" size="medium">
                  Criar conta
                </Button>
              </div>
            </div>
          </form>
        </div>

        <Button to={"/auth/"} type="text" size="full">
          Voltar
        </Button>
      </div>
    </main>
  );
}
