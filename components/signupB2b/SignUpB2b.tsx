"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MailCheck, UserCheck } from "lucide-react";

const TOTAL_STEPS = 3;

export const TYPE_ACTIVITY_LABELS: Record<string, string> = {
  FRUTTA_E_VERDURA: "Frutta e Verdura",
  MINI_MARKET: "Mini Market",
  NEGOZIO: "Negozio",
  FIORERIA: "Fioreria",
  BAR_CON_CUCINA: "Bar con Cucina",
  BAR_SENZA_CUCINA: "Bar senza Cucina",
  PASTICCERIA: "Pasticceria",
  PASTICCERIA_VEGANA: "Pasticceria Vegana",
  PASTICCERIA_VEGETARIANA: "Pasticceria Vegetariana",
  GROSSISTI_DI_FRESCHI_E_FRESCHISSIMI: "Grossisti di Freschi e Freschissimi",
  HOTEL_CON_CUCINA: "Hotel con Cucina",
  HOTEL_SENZA_CUCINA: "Hotel senza Cucina",
  RISTORANTE: "Ristorante",
  RISTORANTE_ETNICO: "Ristorante Etnico",
  RISTORANTE_VEGANO: "Ristorante Vegano",
  RISTORANTE_VEGETARIANO: "Ristorante Vegetariano",
  LIBERI_PROFESSIONISTI: "Liberi Professionisti",
};

type Municipality = {
  municipalityId: string;
  municipalityName: string;
};

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  const searchMunicipalities = async (query: string) => {
    if (query.trim().length < 2) {
      setMunicipalities([]);
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/municipalities/search?municipalityName=${encodeURIComponent(query)}`,
      );

      if (!res.ok) {
        throw new Error("Errore nel caricamento dei comuni");
      }

      const data: Municipality[] = await res.json();
      setMunicipalities(data);
    } catch (error) {
      console.error("Errore caricamento comuni", error);
    }
  };

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

    const payload = {
      ...formData,
      municipalityId: formData.municipalityId || null,
      fiscalCode: formData.fiscalCode || null,
      vatNumber: formData.vatNumber || null,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/b2b`,
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
      router.push("/verify-b2b?registered=true");
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Errore imprevisto");
    }
  };

  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  const stepLabels = [
    { id: 1, title: "Referente", icon: <UserCheck /> },
    { id: 2, title: "Azienda", icon: <Building2 /> },
    { id: 3, title: "Termini", icon: <MailCheck /> },
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
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="/images/login-microgreens.jpg"
          alt="Orto Urbano"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-(--color-brand-green)/10 backdrop-blur-[2px]" />
      </div>

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

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {stepLabels.map((item) => (
                <span
                  key={item.id}
                  className="text-xs font-mono uppercase border-green-800"
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
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.contactName ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
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
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.contactSurname ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
                  />
                  {errors.contactSurname && (
                    <p className="mt-1 text-xs text-red-600">
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
                    className="mt-2 block w-full rounded-md border-2 border-neutral-300 bg-white px-4 py-2 text-neutral-950 outline-none focus:border-(--color-brand-green)"
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
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.password ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </>
            )}

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
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.companyName ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
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
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        typeActivity: e.target.value,
                      }));
                      if (errors.typeActivity)
                        setErrors((prev) => ({ ...prev, typeActivity: "" }));
                    }}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.typeActivity ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
                  >
                    <option value="">Seleziona una tipologia...</option>
                    {Object.keys(TYPE_ACTIVITY_LABELS).map((enumKey) => (
                      <option key={enumKey} value={enumKey}>
                        {TYPE_ACTIVITY_LABELS[enumKey]}
                      </option>
                    ))}
                  </select>
                  {errors.typeActivity && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.typeActivity}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-neutral-900">
                    Comune di Riferimento
                  </label>
                  <input
                    type="text"
                    placeholder="Inizia a digitare il comune..."
                    value={searchTerm}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchTerm(val);
                      setIsDropdownOpen(true);
                      searchMunicipalities(val);
                      if (!val) {
                        setFormData((prev) => ({
                          ...prev,
                          municipalityId: "",
                        }));
                      }
                    }}
                    className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.municipalityId ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
                  />
                  {isDropdownOpen && municipalities.length > 0 && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
                      {municipalities.map((mun) => (
                        <li
                          key={mun.municipalityId}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              municipalityId: mun.municipalityId,
                            }));
                            setSearchTerm(mun.municipalityName); // FIXXED: Usava .name anziché .municipalityName
                            setIsDropdownOpen(false);
                            if (errors.municipalityId) {
                              setErrors((prev) => ({
                                ...prev,
                                municipalityId: "",
                              }));
                            }
                          }}
                          className="cursor-pointer select-none px-4 py-2 text-neutral-900 hover:bg-neutral-100 transition"
                        >
                          {mun.municipalityName}
                        </li>
                      ))}
                    </ul>
                  )}
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
                      className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.vatNumber ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
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
                      className={`mt-2 block w-full rounded-md border-2 bg-white px-4 py-2 text-neutral-950 outline-none ${errors.fiscalCode ? "border-red-400" : "border-neutral-300 focus:border-(--color-brand-green)"}`}
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

            <div
              className={`flex mt-8 ${currentStep > 1 ? "justify-between" : "justify-end"}`}
            >
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2 rounded-md border-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition"
                >
                  Indietro
                </button>
              )}

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-md bg-green-800 text-sm font-semibold text-white hover:bg-green-900 transition"
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
