import type { VideoItem } from "../types/video";

export const homeVideos: VideoItem[] = [
  {
    id: "come-nascono",
    number: "01",
    title: "Come nascono i microgreens",
    image: {
      src: "/Come-nascono-i-microgreens.jpg",
      alt: "Serra urbana con microgreens",
    },
    href: "/video/come-nascono-i-microgreens",
  },
  {
    id: "raccolta",
    number: "02",
    title: "Raccolta e confezionamento",
    image: {
      src: "/Packaging-Microgreen_Farming_480x480.webp",
      alt: "Raccolta dei microgreens",
    },
    href: "/video/raccolta-e-confezionamento",
  },
  {
    id: "in-cucina",
    number: "03",
    title: "In cucina: idee e ispirazioni",
    image: {
      src: "/Piatti-gourmet-microgreens.webp",
      alt: "Piatto gourmet con microgreens",
    },
    href: "/video/in-cucina-idee-e-ispirazioni",
  },
];
