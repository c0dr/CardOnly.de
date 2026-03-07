const COMPARE_STORAGE_KEY = 'card_compare_selection';
const MAX_COMPARE = 3;

export const getCompareIssuers = () => {
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry) => typeof entry === 'string').slice(0, MAX_COMPARE);
  } catch (error) {
    return [];
  }
};

export const setCompareIssuers = (issuers) => {
  try {
    const normalized = Array.isArray(issuers)
      ? issuers.filter((entry) => typeof entry === 'string').slice(0, MAX_COMPARE)
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
