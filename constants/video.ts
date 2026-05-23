import type { VideoItem } from "../types/video";

export const homeVideos: VideoItem[] = [
  {
    id: "come-nascono",
    number: "01",
    title: "Come nascono i microgreens",
    image: {
      src: "/images/videos/come-nascono.jpg",
      alt: "Serra urbana con microgreens",
    },
    href: "/video/come-nascono-i-microgreens",
  },
  {
    id: "raccolta",
    number: "02",
    title: "Raccolta e confezionamento",
    image: {
      src: "/images/videos/raccolta.jpg",
      alt: "Raccolta dei microgreens",
    },
    href: "/video/raccolta-e-confezionamento",
  },
  {
    id: "in-cucina",
    number: "03",
    title: "In cucina: idee e ispirazioni",
    image: {
      src: "/images/videos/in-cucina.jpg",
      alt: "Piatto gourmet con microgreens",
    },
    href: "/video/in-cucina-idee-e-ispirazioni",
  },
];
