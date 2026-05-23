import { Button } from "../ui/Button";
import { VideoCard } from "../ui/VideoCard";
import type { VideoItem } from "@/src/types/video"

type VideoSectionProps = {
  title: string;
  description: string;
  videos: VideoItem[];
};

export function VideoSection({ title, description, videos }: VideoSectionProps) {
  return (
    <section className="bg-[var(--color-brand-dark)] px-5 mt-5 py-10 text-white md:px-8 md:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.6fr] lg:items-center">
        <div>
          <h2 className="section-title-white text-4xl leading-none tracking-[-0.03em] md:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-6 text-white/80 md:text-base md:leading-7">
            {description}
          </p>

          <Button
            href="/video"
            variant="ghost"
            className="mt-7 border-white/70 text-white hover:bg-white/10"
          >
            Guarda i video
          </Button>
        </div>

       <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-3 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
  {videos.map((video) => (
    <div
      key={video.id}
      className="min-w-[240px] max-w-[260px] md:min-w-[280px] md:max-w-[320px] lg:min-w-0 lg:max-w-none"
    >
      <VideoCard video={video} />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}