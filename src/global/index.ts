export type ThemeMode = 'auto' | 'dark' | 'light';

const THEME_MODE_KEY = 'winnew-theme-mode';
const THEME_MODE_ATTR = 'theme-mode';
const THEME_MODE_CHANGE_EVENT = 'theme-mode-change';
const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

function setDocumentThemeMode(mode: ThemeMode): void {
  if (mode === 'dark') {
    document.documentElement.setAttribute(THEME_MODE_ATTR, 'dark');
    return;
  }

  if (mode === 'light') {
    document.documentElement.removeAttribute(THEME_MODE_ATTR);
    return;
  }

  if (colorSchemeMedia.matches) {
    document.documentElement.setAttribute(THEME_MODE_ATTR, 'dark');
  } else {
    document.documentElement.removeAttribute(THEME_MODE_ATTR);
  }
}

function dispatchThemeModeChange(mode: ThemeMode): void {
  window.dispatchEvent(new CustomEvent<ThemeMode>(THEME_MODE_CHANGE_EVENT, { detail: mode }));
}

export function getThemeMode(): ThemeMode {
  const storedMode = window.localStorage.getItem(THEME_MODE_KEY);
  if (storedMode === 'dark' || storedMode === 'light' || storedMode === 'auto') {
    return storedMode;
  }
  return 'auto';
}

export function setThemeMode(mode: ThemeMode): void {
  window.localStorage.setItem(THEME_MODE_KEY, mode);
  setDocumentThemeMode(mode);
  dispatchThemeModeChange(mode);
}

export function subscribeThemeModeChange(callback: (mode: ThemeMode) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<ThemeMode>;
    callback(customEvent.detail);
  };

  window.addEventListener(THEME_MODE_CHANGE_EVENT, handler);
  return () => window.removeEventListener(THEME_MODE_CHANGE_EVENT, handler);
}

function syncAutoTheme(): void {
  const mode = getThemeMode();
  if (mode === 'auto') {
    setDocumentThemeMode('auto');
  }
}

function initThemeMode(): void {
  const currentMode = getThemeMode();
  setDocumentThemeMode(currentMode);

  if (typeof colorSchemeMedia.addEventListener === 'function') {
    colorSchemeMedia.addEventListener('change', syncAutoTheme);
  } else {
    colorSchemeMedia.addListener(syncAutoTheme);
  }
}

initThemeMode();
