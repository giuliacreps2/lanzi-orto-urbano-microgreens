import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { VideoItem } from "@/types/video";

type VideoCardProps = {
  video: VideoItem;
};

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link
      href={video.href}
      className="group relative block aspect-9/16 min-h-90 overflow-hidden rounded-xl border border-white/20 bg-black"
    >
      <Image
        src={video.image.src}
        alt={video.image.alt}
        fill
        className="object-cover opacity-75 transition duration-300 group-hover:scale-105 group-hover:opacity-85"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition group-hover:scale-105">
          <Play size={24} fill="currentColor" strokeWidth={1.5} />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 text-white">
        <span className="font-(--font-serif-brand) text-3xl leading-none text-[#b8c5a8] lg:text-2xl">
          {video.number}
        </span>

        <h3 className="max-w-47.5 text-base font-semibold leading-tight lg:text-sm">
          {video.title}
        </h3>
      </div>
    </Link>
  );
}
