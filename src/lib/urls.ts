const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const homePath = () => `${base}/`;
export const gamePath = (gameSlug: string) => `${base}/${gameSlug}/`;
export const levelPath = (gameSlug: string, levelId: string) => `${base}/${gameSlug}/${levelId}/`;
