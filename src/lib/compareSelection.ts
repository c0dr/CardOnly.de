const COMPARE_STORAGE_KEY = 'card_compare_selection';
const MAX_COMPARE = 3;

export const getCompareIssuers = (): string[] => {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is string => typeof entry === 'string').slice(0, MAX_COMPARE);
  } catch (error) {
    return [];
  }
};

export const setCompareIssuers = (issuers: string[]) => {
  try {
    const normalized = Array.isArray(issuers)
      ? issuers.filter((entry): entry is string => typeof entry === 'string').slice(0, MAX_COMPARE)
      : [];
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    // no-op if storage is unavailable
  }
};

export const clearCompareIssuers = () => {
  try {
    localStorage.removeItem(COMPARE_STORAGE_KEY);
  } catch (error) {
    // no-op if storage is unavailable
  }
};

export const maxCompareCards = MAX_COMPARE;
