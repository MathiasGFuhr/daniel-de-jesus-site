interface ThemeLike {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  mutedTextColor: string;
  sidebarColor: string;
  titleFont: string;
  bodyFont: string;
  cardRadius: string;
}

function fontFamily(name: string): string {
  if (name === "Playfair Display") return "var(--font-playfair)";
  if (name === "Inter") return "var(--font-inter)";
  return `'${name}'`;
}

export function buildThemeCss(theme: ThemeLike): string {
  return `:root{
--site-bg:${theme.backgroundColor};
--site-card:${theme.cardColor};
--site-text:${theme.textColor};
--site-muted:${theme.mutedTextColor};
--site-accent:${theme.accentColor};
--site-primary:${theme.primaryColor};
--site-sidebar:${theme.sidebarColor};
--site-title-font:${fontFamily(theme.titleFont)};
--site-body-font:${fontFamily(theme.bodyFont)};
--site-card-radius:${theme.cardRadius};
}`;
}
