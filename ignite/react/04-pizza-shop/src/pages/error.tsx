import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Whoops, algo de errado não está certo...
      </h1>
      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to={"/"} className="text-sky-500 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
};
