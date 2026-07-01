const SOCIAL_ICONS = new Set([
  "instagram",
  "tiktok",
  "youtube",
  "spotify",
  "apple",
  "deezer",
  "soundcloud",
]);

export type LinksPageItem = {
  id: string;
  label: string;
  subtitle: string | null;
  url: string;
  icon: string;
  isPrimary: boolean;
};

type SocialRow = {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  isActive: boolean;
  order: number;
};

type ButtonRow = {
  id: string;
  label: string;
  subtitle: string | null;
  url: string;
  icon: string;
  isActive: boolean;
  isPrimary: boolean;
  order: number;
};

function normalizeUrl(url: string): string {
  return url.trim().toLowerCase().replace(/\/$/, "");
}

function matchesSocial(button: ButtonRow, social: SocialRow): boolean {
  if (normalizeUrl(button.url) && normalizeUrl(button.url) === normalizeUrl(social.url)) {
    return true;
  }
  return SOCIAL_ICONS.has(button.icon) && button.icon === social.icon;
}

function isDuplicateSocialButton(button: ButtonRow, socials: SocialRow[]): boolean {
  return socials.some((social) => matchesSocial(button, social));
}

/**
 * Monta os botões da página /links a partir das redes sociais (fonte principal)
 * e dos botões extras cadastrados na central de links (loja, parceiros, etc.).
 */
export function buildLinksPageItems(
  socials: SocialRow[],
  buttons: ButtonRow[],
  activeOnly: boolean,
): LinksPageItem[] {
  const visibleSocials = (activeOnly ? socials.filter((s) => s.isActive) : socials).sort(
    (a, b) => a.order - b.order,
  );
  const visibleButtons = (activeOnly ? buttons.filter((b) => b.isActive) : buttons).sort(
    (a, b) => a.order - b.order,
  );

  const primaryButton = visibleButtons.find((b) => b.isPrimary);
  let primarySocialId: string | null = null;
  if (primaryButton && isDuplicateSocialButton(primaryButton, visibleSocials)) {
    const match = visibleSocials.find((s) => matchesSocial(primaryButton, s));
    if (match) primarySocialId = match.id;
  }

  const socialItems: LinksPageItem[] = visibleSocials.map((social) => ({
    id: `social-${social.id}`,
    label: social.label,
    subtitle: social.handle || null,
    url: social.url,
    icon: social.icon,
    isPrimary: social.id === primarySocialId,
  }));

  const customItems: LinksPageItem[] = visibleButtons
    .filter((button) => !isDuplicateSocialButton(button, visibleSocials))
    .map((button) => ({
      id: button.id,
      label: button.label,
      subtitle: button.subtitle,
      url: button.url,
      icon: button.icon,
      isPrimary: button.isPrimary,
    }));

  return [...socialItems, ...customItems];
}
