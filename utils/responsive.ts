import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Base design dimensions (designed for 390x844 — iPhone 14)
const BASE_W = 390;
const BASE_H = 844;

// ─── Scale helpers ────────────────────────────────────────────────────────────

/** Scale based on screen WIDTH (use for font sizes, horizontal spacing) */
export const ws = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_W / BASE_W) * size));

/** Scale based on screen HEIGHT (use for vertical spacing, heights) */
export const hs = (size: number): number =>
  Math.round(PixelRatio.roundToNearestPixel((SCREEN_H / BASE_H) * size));

/** Moderate scale — mix of width + fixed (use for font sizes to avoid extremes) */
export const ms = (size: number, factor = 0.5): number =>
  Math.round(size + (ws(size) - size) * factor);

// ─── Device breakpoints ───────────────────────────────────────────────────────

export const isSmallDevice  = SCREEN_W < 360;   // e.g. Galaxy A series small
export const isMediumDevice = SCREEN_W >= 360 && SCREEN_W < 414;
export const isLargeDevice  = SCREEN_W >= 414;  // e.g. Plus / Pro Max / tablets

export const isTablet = SCREEN_W >= 768;

// ─── Safe area top ────────────────────────────────────────────────────────────

export const safeTop: number =
  Platform.OS === 'android'
    ? (StatusBar.currentHeight ?? 24) + ws(16)
    : ws(56);

// ─── Screen dimensions (live) ────────────────────────────────────────────────

export const screenWidth  = SCREEN_W;
export const screenHeight = SCREEN_H;

// ─── Responsive font ─────────────────────────────────────────────────────────

/**
 * Returns a font size clamped between min and max.
 * Usage: rf(16) — scales with screen width, won't go too small or too large.
 */
export const rf = (size: number, min?: number, max?: number): number => {
  const scaled = ms(size);
  if (min !== undefined && scaled < min) return min;
  if (max !== undefined && scaled > max) return max;
  return scaled;
};
