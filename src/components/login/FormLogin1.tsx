"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLogin1() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante il login");
      }

      console.log("LOGIN EFFETTUATO", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const loggedUser = data.user;

      if (loggedUser.roles.includes("ADMIN")) {
        router.push("/admin");
      } else if (
        loggedUser.accountType === "B2B" &&
        loggedUser.b2bStatus === "APPROVED"
      ) {
        router.push("/forniture");
      } else if (
        loggedUser.accountType === "B2B" &&
        loggedUser.b2bStatus === "PENDING"
      ) {
        router.push("/forniture/richiesta-in-valutazione");
      } else {
        router.push("/account");
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrors(err.message);
      } else {
        setErrors("Errore imprevisto durante il login");
      }
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-brand-beige)]">
      {/* COLONNA IMMAGINE */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="/images/login-microgreens.jpg"
          alt="Microgreens freschi coltivati da Lanzi Orto Urbano"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[var(--color-brand-green)]/35" />

        <div className="absolute inset-x-0 bottom-0 p-12">
          <div className="max-w-md rounded-4xl bg-white/85 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-(--color-brand-green)">
              Lanzi Orto Urbano
            </p>

            <h1 className="section-title-black tracking-[-0.03em] mt-4 text-4xl leading-tight font-semibold text-[var(--color-brand-green)]">
              Microgreens freschi, sempre a portata di ordine.
            </h1>

            <p className="mt-5 text-sm leading-6 text-neutral-700">
              Accedi alla tua area riservata per gestire ordini, forniture,
              preferenze e consegne.
            </p>
          </div>
        </div>
      </div>

      {/* COLONNA FORM */}
      <div className="flex items-center justify-center px-5 py-10 md:px-8 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <img
              src="/images/logo-lanzi.svg"
              alt="Lanzi Orto Urbano"
              className="h-14 w-auto"
            />

            <p className="mt-10 text-sm uppercase tracking-[0.22em] text-[var(--color-brand-green)]">
              Area riservata
            </p>

            {errors && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors}
              </p>
            )}

            <h2 className="section-title-black mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950">
              Accedi al tuo account
            </h2>

            <p className="mt-4 text-base leading-7 text-neutral-600">
              Continua la tua esperienza personalizzata con i tuoi ordini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-900"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                placeholder="nome@email.it"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-900"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-sm font-medium text-[var(--color-brand-green)] hover:underline"
                >
                  Password dimenticata?
                </a>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="rounded-md mt-2 block w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)]"
              />
            </div>

            <button
              type="submit"
              className="btn-primary mt-2 flex w-full items-center justify-center rounded-2xl bg-[var(--color-brand-dark)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--color-brand-green)]/90"
            >
              Accedi
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-600">
            Non hai ancora un account?{" "}
            <a
              href="#"
              className="font-semibold text-[var(--color-brand-green)] hover:underline"
            >
              Registrati
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
