"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpUser() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    privacyAccepted: false, // Inizializzato correttamente come booleano
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Il nome è obbligatorio";

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Il numero di telefono è obbligatorio";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Inserisci un numero di telefono valido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Inserisci un indirizzo email valido";
    }

    if (!formData.password) {
      newErrors.password = "La password è obbligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = "La password deve contenere almeno 8 caratteri";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Includi almeno una maiuscola, una minuscola e un numero";
    }

    if (
      formData.phoneNumber &&
      !/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)
    ) {
      newErrors.phoneNumber = "Numero di telefono non valido";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted =
        "È necessario accettare l'informativa sulla privacy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGlobalError("");
    if (!validateForm()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register/b2c`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante la registrazione");
      }

      console.log("REGISTRAZIONE EFFETTUATA", data);
      router.push("/login?registered=true");
    } catch (err) {
      setGlobalError(
        err instanceof Error
          ? err.message
          : "Errore imprevisto durante la registrazione",
      );
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-(--color-brand-white)">
      {/* COLONNA IMMAGINE */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="/images/login-microgreens.jpg"
          alt="Microgreens freschi coltivati da Lanzi Orto Urbano"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-(--color-brand-green)/10 backdrop-blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <div className="max-w-md rounded-4xl bg-white/85 p-8 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-(--color-brand-green)">
              Lanzi Orto Urbano
            </p>
            <h1 className="section-title-black tracking-[-0.03em] mt-4 text-4xl leading-tight font-semibold text-[var(--color-brand-green)]">
              🎁 Bonus di benvenuto
            </h1>
            <p className="mt-5 text-sm leading-6 text-neutral-700">
              Ricevi subito 20 punti dopo la registrazione.
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
              Registrati
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Completa la registrazione per gestire i tuoi ordini, salvare i
              dati e accumulare punti sconto.
            </p>
          </div>

          {globalError && (
            <p className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
              {globalError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-900"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                placeholder="Mario/Maria"
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-2 bg-white px-5 py-2 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)] ${errors.name ? "border-red-400" : "border-neutral-300"}`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-neutral-900"
              >
                Numero di telefono{" "}
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                placeholder="+39 333..."
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-2 bg-white px-5 py-2 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)] ${errors.phoneNumber ? "border-red-400" : "border-neutral-300"}`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

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
                value={formData.email}
                placeholder="nome@email.it"
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-2 bg-white px-5 py-2 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)] ${errors.email ? "border-red-400" : "border-neutral-300"}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-md border-2 bg-white px-5 py-2 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-[var(--color-brand-green)] ${errors.password ? "border-red-400" : "border-neutral-300"}`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="my-6">
              <label className="flex items-start group cursor-pointer">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition ${formData.privacyAccepted ? "bg-green-950 border-green-950" : "bg-white border-neutral-300 group-hover:border-neutral-400"}`}
                  aria-hidden="true"
                >
                  <svg
                    className={`size-3 text-white ${formData.privacyAccepted ? "block" : "hidden"}`}
                    viewBox="0 0 12 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                </span>
                <span className="ml-3 text-sm text-slate-700">
                  So che i miei dati vengono trattati secondo la{" "}
                  <a
                    href="#"
                    className="font-medium text-[var(--color-brand-green)] hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.privacyAccepted && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.privacyAccepted}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-[var(--color-brand-dark)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--color-brand-green)]/90"
            >
              Crea account e ricevi 20 punti
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-600">
            Hai già un account?{" "}
            <a
              href="/login"
              className="font-semibold text-[var(--color-brand-green)] hover:underline"
            >
              Accedi
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
