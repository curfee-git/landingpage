export const SERVICE_KEYS = ['diagnosis', 'guidance', 'advisory'] as const satisfies readonly string[];

export type ServiceKey = (typeof SERVICE_KEYS)[number];
