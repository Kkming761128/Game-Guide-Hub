const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const homePath = () => `${base}/`;
export const gamePath = (gameSlug: string) => `${base}/${gameSlug}/`;
export const routePath = (gameSlug: string, routeName: string) => `${base}/${gameSlug}/route/${encodeURIComponent(routeName)}/`;
export const levelPath = (gameSlug: string, levelId: string) => `${base}/${gameSlug}/${levelId}/`;
