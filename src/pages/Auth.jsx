import Button from "../components/Button";
import gamer from "../assets/gamer.svg";

export default function Auth() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-800 bg-cover md:bg-[url(https://i.pinimg.com/originals/d5/e1/ed/d5e1edcb620f13185561b532028558d7.jpg)] ">
      <div className="flex min-w-[40%] flex-col items-center justify-center gap-12 rounded-lg bg-zinc-900 px-8 py-24 drop-shadow-xl md:px-32">
        <div className="flex w-full max-w-md flex-col gap-16 text-center text-slate-50 ">
          <div className="flex w-full flex-col items-center gap-8">
            <h3 className="text-2xl font-bold underline decoration-red-800">
              Faça seu login ou crie uma conta para continuar!
            </h3>
            <p className="w-full text-xl">
              Explore novos jogos, avalie os jogos que você já jogou e salve
              seus favoritos e muito mais!
            </p>
            <img
              src={gamer}
              alt="Garota jogando video-game"
              className="max-w-xs"
            />
          </div>

          <div className="flex w-full justify-between">
            <Button to={"login"} type="primary" size="large">
              Entrar
            </Button>
            <Button to={"register"} type="secondary" size="large">
              Cadastrar
            </Button>
          </div>
        </div>

        <Button to={"/"} type="text" size="full">
          Voltar e navegar sem conta
        </Button>
      </div>
    </main>
  );
}
