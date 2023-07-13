import Button from "../components/Button";
import erro404 from "../assets/erro404.svg";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-zinc-800">
      <div className="flex flex-col items-center justify-center gap-4 self-center text-center text-2xl font-bold text-slate-50">
        <img
          src={erro404}
          alt=""
          width={320}
          height={320}
          className="max-w-sm"
        />
        <h1 className="max-w-[32rem]">Página não encontrada!</h1>
      </div>
      <Button type="secondary" to={"/"}>
        Voltar para a página inicial
      </Button>
    </main>
  );
}
