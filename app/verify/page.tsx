"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Verifica la tua email");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify/b2c?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.userId) {
          setStatus("success");
          setTimeout(() => router.push("/login?verified=true"), 2000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verifica fallita.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Errore di rete.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <p>Verifica in corso...</p>}
      {status === "success" && (
        <p>✅ Email verificata! Reindirizzamento al login...</p>
      )}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Caricamento...</p>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
