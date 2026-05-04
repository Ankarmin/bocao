import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">No encontramos esa pagina.</p>
        <Link href="/" className={buttonVariants({ variant: "hero", size: "lg" })}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
