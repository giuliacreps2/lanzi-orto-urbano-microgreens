"use client";

import { useEffect, useState } from "react";
import { getLabelImageUrl } from "@/lib/api/labels"; // o dove si trova getLabelImageUrl

type BarcodeImageProps = {
  labelId: string;
  altText: string;
  className?: string;
  token?: string | null; // <-- Rinominato in modo generico per mappare la tua variabile
};

export default function BarcodeImage({
  labelId,
  altText,
  className,
  token,
}: BarcodeImageProps) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSecureImage = async () => {
      try {
        const headers: HeadersInit = {};

        // Se il token esiste (qualunque sia il suo nome nel componente padre), lo inseriamo qui
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(getLabelImageUrl(labelId), {
          method: "GET",
          headers: headers,
        });

        if (!res.ok) throw new Error("Impossibile caricare il barcode");

        const blob = await res.blob();
        const localUrl = URL.createObjectURL(blob);
        setImgUrl(localUrl);
      } catch (err) {
        console.error("Errore nel caricamento del barcode:", err);
        setError(true);
      }
    };

    fetchSecureImage();

    return () => {
      if (imgUrl) URL.revokeObjectURL(imgUrl);
    };
  }, [labelId, token]);

  if (error) return <span className="text-xs text-red-500">⚠️ Errore</span>;
  if (!imgUrl)
    return <span className="text-xs text-zinc-400">Caricamento...</span>;

  return <img src={imgUrl} alt={altText} className={className} />;
}
