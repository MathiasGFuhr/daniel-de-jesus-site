// Valores padrão usados para semear o banco e como fallback de leitura.
// Refletem o conteúdo atual do site (Daniel de Jesus).

export const defaultSiteSettings = {
  id: "singleton",
  siteName: "Daniel de Jesus — Site oficial",
  artistName: "Daniel de Jesus",
  artistLabel: "Cantor e compositor",
  description:
    "Daniel de Jesus é um cantor que transforma sentimentos em música pop contemporânea.",
  footerText:
    "Um artista que transforma sentimentos em música pop contemporânea.",
  aiDisclosureText: "",
  copyrightText: "© 2025 Daniel de Jesus",
  logoUrl: "/images/logo.svg",
  faviconUrl: "/favicon.ico",
  isPublished: true,
  maintenanceMode: false,
};

export const defaultTheme = {
  id: "singleton",
  primaryColor: "#b08a52",
  secondaryColor: "#1b1813",
  accentColor: "#c4a373",
  backgroundColor: "#faf7f1",
  cardColor: "#fdfbf7",
  textColor: "#1b1813",
  mutedTextColor: "#6f665a",
  buttonColor: "#1b1813",
  sidebarColor: "#14110d",
  headerColor: "#faf7f1",
  titleFont: "Playfair Display",
  bodyFont: "Inter",
  cardRadius: "16px",
  buttonStyle: "rounded",
};

export const defaultHome = {
  id: "singleton",
  eyebrow: "Cantor e compositor",
  title: "Daniel de Jesus",
  slogan: "Música que toca a alma.",
  description:
    "Um artista que transforma sentimentos em música.",
  imageUrl: "/images/daniel-hero.svg",
  primaryButtonLabel: "Ouça no Spotify",
  primaryButtonUrl: "/spotify",
  secondaryButtonLabel: "Assistir vídeo",
  secondaryButtonUrl: "/videos",
  thirdButtonLabel: "Ver links",
  thirdButtonUrl: "/links",
  showHero: true,
  showFeaturedVideo: true,
  showSpotify: true,
  showOfficialLinks: true,
  showProducts: true,
  showAbout: true,
  showContact: true,
  bioShort:
    "Um artista digital que transforma sentimentos humanos em música pop contemporânea.",
  bioFull:
    "Daniel de Jesus é um cantor e compositor que transforma sentimentos em música, misturando interpretação vocal, composição emocional e estética de artista pop contemporâneo.\n\nSuas músicas falam sobre temas reais: amor, saudade, recomeços, noites longas, sonhos e conexões que atravessam a tela.",
  aboutImageUrl: "",
  aboutGenre: "Pop / Pop Romântico",
  aboutYear: "2025",
};

export const defaultSpotify = {
  id: "singleton",
  title: "Entre Estrelas",
  artist: "Daniel de Jesus",
  description: "EP • 2025 • 5 faixas • 17min",
  embedUrl: "https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3",
  externalUrl: "https://open.spotify.com/artist/0TnOYISbd1XYRBk9myaseg",
  type: "EP",
  isActive: true,
};

export const defaultContact = {
  id: "singleton",
  email: "comercial@danieldejesus.art",
  headline: "Entre em contato com a equipe Daniel de Jesus",
  description:
    "Para parcerias, divulgação, shows virtuais e projetos comerciais.",
  address: "",
  instagram: "@danieldejesus.oficial",
  affiliateDisclaimer:
    "Alguns links podem gerar comissão para o projeto, sem custo adicional para você.",
  contactTypes: JSON.stringify([
    "Parcerias",
    "Contratar show virtual",
    "Divulgação",
    "Imprensa",
    "Comercial",
    "Outros",
  ]),
};

export const defaultLinkPage = {
  id: "singleton",
  avatarUrl: "/images/daniel-hero.svg",
  title: "Daniel de Jesus",
  subtitle: "Cantor e compositor",
};

export const defaultAdvanced = {
  id: "singleton",
  ownerName: "Proprietário",
  ownerEmail: process.env.ADMIN_EMAIL ?? "admin@danieldejesus.art",
  googleAnalyticsId: "",
  metaPixelId: "",
  tiktokPixelId: "",
  customHeadCode: "",
  customFooterCode: "",
};

export const defaultSocialLinks = [
  { label: "Instagram", handle: "@danieldejesus.oficial", url: "https://instagram.com", icon: "instagram", order: 1 },
  { label: "TikTok", handle: "@danieldejesus.oficial", url: "https://tiktok.com", icon: "tiktok", order: 2 },
  { label: "YouTube", handle: "/danieldejesus.oficial", url: "https://youtube.com", icon: "youtube", order: 3 },
  { label: "Spotify", handle: "Ouça agora", url: "https://spotify.com", icon: "spotify", order: 4 },
  { label: "Apple Music", handle: "Ouça no Apple Music", url: "https://music.apple.com", icon: "apple", order: 5 },
  { label: "Deezer", handle: "Ouça no Deezer", url: "https://deezer.com", icon: "deezer", order: 6 },
];

export const defaultSongs = [
  {
    title: "Entre Estrelas",
    type: "Single",
    year: "2025",
    releaseDate: "2025-05-10",
    coverUrl: "/images/covers/entre-estrelas.svg",
    description: "Uma música sobre distância, memória e sentimentos que continuam vivos.",
    spotifyUrl: "https://open.spotify.com",
    youtubeUrl: "https://youtube.com",
    appleMusicUrl: "https://music.apple.com",
    deezerUrl: "https://deezer.com",
    isFeatured: true,
    order: 1,
  },
  {
    title: "Não é Fim",
    type: "Single",
    year: "2025",
    releaseDate: "2025-03-01",
    coverUrl: "/images/covers/nao-e-fim.svg",
    description: "Sobre recomeços e a coragem de seguir mesmo depois do adeus.",
    spotifyUrl: "https://open.spotify.com",
    youtubeUrl: "https://youtube.com",
    appleMusicUrl: "https://music.apple.com",
    deezerUrl: "https://deezer.com",
    isFeatured: false,
    order: 2,
  },
  {
    title: "Quando Você Sorri",
    type: "Single",
    year: "2025",
    releaseDate: "2025-01-15",
    coverUrl: "/images/covers/quando-voce-sorri.svg",
    description: "Uma declaração leve sobre os pequenos momentos que iluminam o dia.",
    spotifyUrl: "https://open.spotify.com",
    youtubeUrl: "https://youtube.com",
    appleMusicUrl: "https://music.apple.com",
    deezerUrl: "https://deezer.com",
    isFeatured: false,
    order: 3,
  },
  {
    title: "Entre Estrelas — EP",
    type: "EP",
    year: "2025",
    releaseDate: "2025-05-10",
    coverUrl: "/images/covers/entre-estrelas.svg",
    description: "O EP de estreia com 5 faixas sobre amor, saudade e conexões que atravessam a tela.",
    spotifyUrl: "https://open.spotify.com",
    youtubeUrl: "https://youtube.com",
    appleMusicUrl: "https://music.apple.com",
    deezerUrl: "https://deezer.com",
    isFeatured: false,
    order: 4,
  },
];

export const defaultVideos = [
  {
    title: "Entre Estrelas",
    type: "Clipe oficial",
    description: "Clipe oficial do lançamento Entre Estrelas.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/videos/entre-estrelas.svg",
    publishedAt: "2025-05-10",
    isFeatured: true,
    order: 1,
  },
  {
    title: "Não é Fim",
    type: "Lyric video",
    description: "Lyric video da faixa Não é Fim.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/videos/nao-e-fim.svg",
    publishedAt: "2025-03-01",
    isFeatured: false,
    order: 2,
  },
  {
    title: "Bastidores do EP",
    type: "Bastidores",
    description: "Bastidores da produção do EP Entre Estrelas.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/videos/bastidores.svg",
    publishedAt: "2025-04-20",
    isFeatured: false,
    order: 3,
  },
  {
    title: "Quando Você Sorri — Live Session",
    type: "Live session",
    description: "Performance ao vivo de Quando Você Sorri.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/videos/live-session.svg",
    publishedAt: "2025-02-10",
    isFeatured: false,
    order: 4,
  },
];

export const defaultProducts = [
  {
    name: "Fone de Ouvido Studio Pro",
    category: "Áudio",
    price: "R$ 299,90",
    imageUrl: "/images/products/fone.svg",
    url: "https://link-afiliado.com/fone",
    type: "Afiliado",
    tag: "Mais vendido",
    description: "Fone premium para ouvir os lançamentos do Daniel de Jesus com qualidade de estúdio.",
    order: 1,
  },
  {
    name: "Microfone Condensador USB",
    category: "Estúdio",
    price: "R$ 499,90",
    imageUrl: "/images/products/microfone.svg",
    url: "https://link-afiliado.com/microfone",
    type: "Afiliado",
    tag: "Mais vendido",
    description: "Microfone indicado para criadores de conteúdo e músicos iniciantes.",
    order: 2,
  },
  {
    name: "Camiseta Daniel de Jesus",
    category: "Vestuário",
    price: "R$ 89,90",
    imageUrl: "/images/products/camiseta.svg",
    url: "https://checkout.com/camiseta",
    type: "Produto oficial",
    tag: "Produto oficial",
    description: "Camiseta oficial do artista Daniel de Jesus.",
    order: 3,
  },
  {
    name: "Painel de LED Portátil",
    category: "Iluminação",
    price: "R$ 199,90",
    imageUrl: "/images/products/painel-led.svg",
    url: "https://link-afiliado.com/painel-led",
    type: "Afiliado",
    tag: "Novo",
    description: "Iluminação portátil ideal para gravações e transmissões.",
    order: 4,
  },
  {
    name: "Caneca Daniel de Jesus",
    category: "Acessórios",
    price: "R$ 59,90",
    imageUrl: "/images/products/caneca.svg",
    url: "https://checkout.com/caneca",
    type: "Produto oficial",
    tag: "Produto oficial",
    description: "Caneca oficial para começar o dia ouvindo boa música.",
    order: 5,
  },
];

export const defaultLinkButtons = [
  { label: "Ouça no Spotify", subtitle: "Último lançamento", url: "https://spotify.com", icon: "spotify", isPrimary: true, order: 1 },
  { label: "YouTube", subtitle: "Clipes oficiais", url: "https://youtube.com", icon: "youtube", isPrimary: false, order: 2 },
  { label: "Instagram", subtitle: "@danieldejesus.oficial", url: "https://instagram.com", icon: "instagram", isPrimary: false, order: 3 },
  { label: "TikTok", subtitle: "@danieldejesus.oficial", url: "https://tiktok.com", icon: "tiktok", isPrimary: false, order: 4 },
  { label: "Loja", subtitle: "Produtos oficiais", url: "/loja", icon: "store", isPrimary: false, order: 5 },
];

export const ICON_OPTIONS = [
  "instagram",
  "tiktok",
  "youtube",
  "spotify",
  "apple",
  "deezer",
  "soundcloud",
  "store",
  "music",
  "link",
] as const;

export const SONG_TYPES = ["Single", "EP", "Álbum", "Acústico", "Remix", "Live Session"] as const;
export const VIDEO_TYPES = ["Clipe oficial", "Lyric video", "Bastidores", "Live session", "Visualizer", "Entrevista"] as const;
export const SPOTIFY_TYPES = ["Artista", "Música", "Álbum", "Playlist", "EP"] as const;
export const PRODUCT_TYPES = ["Afiliado", "Produto oficial", "Digital", "Serviço", "Merchandising"] as const;
export const PRODUCT_TAGS = ["Afiliado", "Produto oficial", "Mais vendido", "Novo", "Promoção"] as const;
export const FONT_OPTIONS = ["Playfair Display", "Inter", "Georgia", "Arial"] as const;
