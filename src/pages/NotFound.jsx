import Button from "../components/Button";
import ShowError from "../components/ShowError";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-12 bg-zinc-800">
      <ShowError text="Página não encontrada!" />
      <Button type="text" to={"/"}>
        Voltar para a página inicial
      </Button>
    </main>
  );
}
