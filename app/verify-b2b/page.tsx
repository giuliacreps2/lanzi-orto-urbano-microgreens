"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyB2bContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("URL completo:", window.location.href);
    console.log("TOKEN LETTO:", token);
    if (!token) {
      setStatus("error");
      setMessage("Token di verifica mancante o non valido.");
      return;
    }

    // Effettua la chiamata POST passando il token coerentemente con le richieste del backend
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify/b2b?token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Verifica fallita");
        return res.json();
      })
      .then((data) => {
        if (data.userId) {
          setStatus("success");
          setTimeout(() => router.push("/login?b2bApproved=true"), 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Impossibile verificare l'account B2B.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Errore durante la verifica del token o sessione scaduta.");
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center">
        {status === "loading" && (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto"></div>
            <p className="text-neutral-600 font-medium">
              Verifica del profilo aziendale in corso...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-3">
            <span className="text-4xl" role="img" aria-label="success">
              ✉️
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              Email Verificata con Successo!
            </h2>
            <p className="text-sm text-neutral-600">
              La tua richiesta è ora in cima alla coda. I nostri amministratori
              stanno verificando i dati aziendali.
            </p>
            <p className="text-xs text-neutral-400 animate-pulse mt-2">
              Reindirizzamento in corso...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <span className="text-4xl" role="img" aria-label="error">
              ❌
            </span>
            <h2 className="text-xl font-bold text-red-600">
              Qualcosa è andato storto
            </h2>
            <p className="text-sm text-neutral-600">{message}</p>
            <button
              onClick={() => router.push("/register")}
              className="mt-4 inline-block text-sm font-semibold text-green-700 hover:underline"
            >
              Torna alla registrazione
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyB2bPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <p className="text-neutral-500">
            Caricamento dei sistemi di verifica...
          </p>
        </div>
      }
    >
      <VerifyB2bContent />
    </Suspense>
  );
}
