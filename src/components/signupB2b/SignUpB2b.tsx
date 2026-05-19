"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building,
  Building2,
  Mail,
  MailCheck,
  User,
  UserCheck,
} from "lucide-react";

const TOTAL_STEPS = 3;

// Esempio dell'Enum allineato al backend Java
const TYPE_ACTIVITY_OPTIONS = [
  { value: "RESTAURANT", label: "Ristorante / Bistrot" },
  { value: "CATERING", label: "Catering" },
  { value: "RETAIL", label: "Negozio al dettaglio" },
  { value: "GAS", label: "Gruppo d'Acquisto Solidale" },
  { value: "OTHER", label: "Altro tipo di attività" },
];

// Mock o caricamento dinamico iniziale per i comuni del DB
const MOCK_MUNICIPALITIES = [
  { id: "e3b0c442-98fc-11ee-b9d1-0242ac120002", name: "Firenze" },
  { id: "f4c1d553-98fc-11ee-b9d1-0242ac120002", name: "Lucca" },
  { id: "a1b2c3d4-5678-90ab-cdef-1234567890ab", name: "Siena" },
  { id: "09876543-fedc-ba09-8765-43210fedcba0", name: "Pisa" },
];

export default function SignUpB2b() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    contactName: "",
    contactSurname: "",
    contactEmail: "",
    password: "",
    contactPhone: "",
    companyName: "",
    vatNumber: "",
    fiscalCode: "",
    typeActivity: "",
    municipalityId: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.contactName.trim())
        newErrors.contactName = "Il nome del referente è obbligatorio";
      if (!formData.contactSurname.trim())
        newErrors.contactSurname = "Il cognome del referente è obbligatorio";
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = "L'email è obbligatoria";
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = "Inserisci un'email valida";
      }
      if (!formData.password) {
        newErrors.password = "La password è obbligatoria";
      } else if (formData.password.length < 8) {
        newErrors.password = "Deve contenere almeno 8 caratteri";
      }
    }

    if (step === 2) {
      if (!formData.companyName.trim())
        newErrors.companyName = "La ragione sociale è obbligatoria";
      if (!formData.typeActivity)
        newErrors.typeActivity = "Seleziona la tipologia di attività";
      if (!formData.municipalityId)
        newErrors.municipalityId = "Il comune è richiesto";

      // Specifica logica Backend: Almeno uno dei due deve esserci
      const hasVat = formData.vatNumber.trim().length > 0;
      const hasFiscal = formData.fiscalCode.trim().length > 0;
      if (!hasVat && !hasFiscal) {
        newErrors.vatNumber =
          "Inserisci almeno la Partita IVA o il Codice Fiscale";
        newErrors.fiscalCode =
          "Inserisci almeno la Partita IVA o il Codice Fiscale";
      }
      if (hasVat && !/^[0-9]{11}$/.test(formData.vatNumber)) {
        newErrors.vatNumber =
          "La partita IVA deve contenere esattamente 11 cifre";
      }
    }

    if (step === 3) {
      if (!formData.privacyAccepted) {
        newErrors.privacyAccepted =
          "Devi accettare l'informativa della privacy per procedere";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setGlobalError("");

    const payload = formData;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register/b2b`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Errore durante la richiesta di registrazione B2B",
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Errore imprevisto");
    }
  };

  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
  //const stepLabels = ["User", "Building", "Mail"];

  const stepLabels = [
    {
      id: 1,
      title: "Referente",
      icon: <UserCheck />,
    },
    {
      id: 2,
      title: "Azienda",
      icon: <Building2 />,
    },
    {
      id: 3,
      title: "Termini",
      icon: <MailCheck />,
    },
  ];

  if (isSubmitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-(--color-brand-white) px-5">
        <div className="w-full max-w-md text-center bg-white p-8 rounded-3xl border-2 border-neutral-100 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <svg
              className="h-6 w-6 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Richiesta inviata!
          </h2>
          <p className="mt-4 text-sm leading-6 text-neutral-600">
            Abbiamo registrato la tua richiesta. Controlla la casella email
            aziendale per completare la verifica del profilo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-(--color-brand-white)">
      {/* IMMAGINE */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="/images/login-microgreens.jpg"
          alt="Orto Urbano"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-(--color-brand-green)/10 backdrop-blur-[2px]" />
      </div>

      {/* FORM CONTAINER */}
      <div className="flex items-center justify-center px-5 py-10 md:px-8 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <img
              src="/images/logo-lanzi.svg"
              alt="Lanzi"
              className="h-14 w-auto"
            />
            <h2 className="text-3xl font-semibold mt-6 text-neutral-950">
              Registrazione Professionisti (B2B)
            </h2>
          </div>

          {globalError && (
            <p className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
              {globalError}
            </p>
          )}

          {/* PROGRESS BAR */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {stepLabels.map((item) => (
                <span
                  key={item.id}
                  className={`text-xs font-mono uppercase border-green-800`}
                >
                  {item.icon}
                </span>
              ))}
            </div>
            <div className="overflow-hidden h-1.5 rounded bg-green-200">
              <div
                className="h-full bg-green-700 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* STEP 1 */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Nome Referente
                  </label>
                  <input
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.contactName ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.contactName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Cognome Referente
                  </label>
                  <input
                    name="contactSurname"
                    type="text"
                    value={formData.contactSurname}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.contactSurname ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  />
                  {errors.contactSurname && (
                    <p className="mt-1 text-xs text-red-600!">
                      {errors.contactSurname}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Email Aziendale / Contatto
                  </label>
                  <input
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.contactEmail ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.contactEmail}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Telefono Diretto{" "}
                    <span className="text-xs text-neutral-400">
                      (opzionale)
                    </span>
                  </label>
                  <input
                    name="contactPhone"
                    type="text"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border-2 border-neutral-300 bg-white px-4 py-2 text-neutral-950 outline-none focus:border-[var(--color-brand-green)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.password ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Ragione Sociale
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.companyName ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Tipologia di Attività
                  </label>
                  <select
                    name="typeActivity"
                    value={formData.typeActivity}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2.5 text-base text-neutral-950 outline-none ${errors.typeActivity ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  >
                    <option value="">Seleziona un'opzione...</option>
                    {TYPE_ACTIVITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.typeActivity && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.typeActivity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-900">
                    Comune di Riferimento
                  </label>
                  <select
                    name="municipalityId"
                    value={formData.municipalityId}
                    onChange={handleChange}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2.5 text-base text-neutral-950 outline-none ${errors.municipalityId ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                  >
                    <option value="">Seleziona il tuo comune...</option>
                    {MOCK_MUNICIPALITIES.map((mun) => (
                      <option key={mun.id} value={mun.id}>
                        {mun.name}
                      </option>
                    ))}
                  </select>
                  {errors.municipalityId && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.municipalityId}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900">
                      Partita IVA
                    </label>
                    <input
                      name="vatNumber"
                      type="text"
                      placeholder="11 cifre"
                      value={formData.vatNumber}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.vatNumber ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                    />
                    {errors.vatNumber && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.vatNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-900">
                      Codice Fiscale{" "}
                      <span className="text-xs text-neutral-400">(opz)</span>
                    </label>
                    <input
                      name="fiscalCode"
                      type="text"
                      value={formData.fiscalCode}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.fiscalCode ? "border-red-400" : "border-neutral-300 focus:border-[var(--color-brand-green)]"}`}
                    />
                    {errors.fiscalCode && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.fiscalCode}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="py-4 space-y-4">
                <h4 className="text-base font-semibold text-neutral-900">
                  Accettazione Termini di Servizio
                </h4>
                <p className="text-sm text-neutral-600 leading-6">
                  Le richieste B2B sono soggette ad approvazione da parte del
                  nostro team amministrativo. Riceverai un link di conferma via
                  mail non appena avremo validato la consistenza aziendale dei
                  dati inseriti.
                </p>

                <div className="pt-4">
                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition ${formData.privacyAccepted ? "bg-green-950 border-green-950" : "bg-white border-neutral-300"}`}
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
                    <span className="ml-3 text-sm text-neutral-700">
                      Accetto le condizioni di trattamento dei dati
                      professionali secondo la{" "}
                      <a
                        href="#"
                        className="font-medium text-green-700 hover:underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      di Lanzi Orto Urbano.
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.privacyAccepted}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* CONTROLLI DI NAVIGAZIONE */}
            <div
              className={`flex mt-8 ${currentStep > 1 ? "justify-between" : "justify-end"}`}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2 rounded-md border-2 btn-secondary text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Indietro
                </button>
              )}

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-md btn-primary text-sm font-semibold text-white hover:bg-green-900 transition"
                >
                  Avanti
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-2xl bg-neutral-950 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-green-900"
                >
                  Invia Richiesta Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
