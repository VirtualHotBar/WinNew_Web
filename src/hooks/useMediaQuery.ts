/"**
 * useMediaQuery Hook
 * 响应式媒体查询 Hook
 */

import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// 断点定义（与 TDesign 保持一致）
const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
};

/**
 * 监听媒体查询
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // 现代浏览器
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // 兼容旧浏览器
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

/**
 * 获取当前断点
 */
export function useBreakpoint(): Breakpoint {
  const isXs = useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);

  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}

/**
 * 是否移动端
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/**
 * 是否平板或更小
 */
export function useIsTabletOrLess(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
}

/**
 * 是否桌面端
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

export { BREAKPOINTS };
export type { Breakpoint };
