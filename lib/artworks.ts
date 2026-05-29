export type Artwork = {
  id: string;
  slug: string;
  name: string;
  tags: string;
  year: string;
  description: string;
  cover: string;
  images: string[];
  aspect?: "portrait" | "landscape" | "square";
};

const UNS = "https://images.unsplash.com/photo-";
const q   = "?auto=format&fit=crop&q=80";

export const artworks: Artwork[] = [
  {
    id: "01",
    slug: "bloom",
    name: "SISBURMA",
    tags: "SUMMER CAMPAIGN",
    year: "2025",
    description:
      "A spring collection editorial exploring femininity through soft textures, botanical motifs, and fluid silhouettes shot entirely in natural light.",
    cover:   "/1.webp",
    aspect:  "portrait",
    images: [
      `${UNS}1469334031218-e382a71b716b${q}&w=600`,
      `${UNS}1483985988355-763728e1935b${q}&w=600`,
      `${UNS}1534528741775-53994a69daeb${q}&w=600`,
    ],
  },
  {
    id: "02",
    slug: "dusk",
    name: "SISBURMA",
    tags: "SALMON RUN CAMPAIGN",
    year: "2025",
    description:
      "An evening styling project capturing the shift from day to night through layered textures, deep saturated tones, and quiet drama.",
    cover:   "/2.webp",
    aspect:  "landscape",
    images: [
      `${UNS}1515886657613-9f3515b0c78f${q}&w=600`,
      `${UNS}1534528741775-53994a69daeb${q}&w=600`,
      "https://picsum.photos/seed/dusk-sub/600/900",
    ],
  },
  {
    id: "03",
    slug: "thread",
    name: "SISBURMA",
    tags: "SECOND SKIN CAMPAIGN",
    year: "2024",
    description:
      "A series of hand-drawn fashion illustrations celebrating tailoring craft — celebrating the constructed silhouette and the poetry of fabric.",
    cover:   "/3.webp",
    aspect:  "square",
    images: [
      `${UNS}1515886657613-9f3515b0c78f${q}&w=600`,
      `${UNS}1469334031218-e382a71b716b${q}&w=600`,
      "https://picsum.photos/seed/thread-sub/600/900",
    ],
  },
  {
    id: "04",
    slug: "reverie",
    name: "SISBURMA",
    tags: "HOLIDAY CAMPAIGN",
    year: "2024",
    description:
      "Experimental mixed-media collages blending vintage fashion photography with abstract painted marks, archival imagery, and unexpected juxtapositions.",
    cover:   "/4.webp",
    aspect:  "landscape",
    images: [
      "https://picsum.photos/seed/reverie-a/600/900",
      `${UNS}1483985988355-763728e1935b${q}&w=600`,
      "https://picsum.photos/seed/reverie-b/600/900",
    ],
  },
  {
    id: "05",
    slug: "petal",
    name: "SISBURMA",
    tags: "SALMON RUN CAMPAIGN",
    year: "2024",
    description:
      "Art-directed photography focusing on nature-inspired styling, organic colour palettes, and the quiet relationship between body and flora.",
    cover:   "/5.webp",
    aspect:  "portrait",
    images: [
      `${UNS}1469334031218-e382a71b716b${q}&w=600`,
      `${UNS}1515886657613-9f3515b0c78f${q}&w=600`,
      "https://picsum.photos/seed/petal-sub/600/900",
    ],
  },
];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}
