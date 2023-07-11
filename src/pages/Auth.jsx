import Button from "../components/Button";
import gamer from "../assets/gamer.svg";
import { MdArrowBack } from "react-icons/md";

export default function Auth() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-800 bg-cover md:bg-[url(https://i.pinimg.com/originals/d5/e1/ed/d5e1edcb620f13185561b532028558d7.jpg)] ">
      <div className="flex min-w-[65%] flex-col items-center justify-center gap-12 rounded-lg bg-zinc-900 px-12 py-8 drop-shadow-xl md:py-24">
        <div className="flex w-full flex-col items-center justify-center gap-16 text-center text-slate-50 lg:flex-row ">
          <img
            src={gamer}
            alt="Garota jogando video-game"
            className="max-w-xs"
          />
          <div className="flex w-full max-w-md flex-col items-center gap-12">
            <h3 className="text-2xl font-bold underline decoration-red-800">
              Faça seu login ou crie uma conta para continuar!
            </h3>
            <p className="w-full text-xl">
              Explore novos jogos, avalie os jogos que você já jogou e salve
              seus favoritos e muito mais!
            </p>
            <div className="flex w-full justify-center gap-12">
              <Button to={"login"} type="primary" size="large">
                Entrar
              </Button>
              <Button to={"register"} type="secondary" size="large">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>

        <Button to={"/"} type="text" size="full">
          <MdArrowBack size={24} /> Voltar e navegar sem conta
        </Button>
      </div>
    </main>
  );
}
