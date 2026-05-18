export default function FormLogin1() {
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
          <div className="max-w-md rounded-[2rem] bg-white/85 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-brand-green)]">
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

            <h2 className="section-title-black mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950">
              Bentornato.
            </h2>

            <p className="mt-4 text-base leading-7 text-neutral-600">
              Accedi al tuo account per continuare con i tuoi ordini.
            </p>
          </div>

          <form action="#" method="POST" className="space-y-5">
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
                placeholder="nome@email.it"
                className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-5 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)]f"
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