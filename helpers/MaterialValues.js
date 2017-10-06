// Building Material Design Apps on Android with React Native
// by Linton Ye

// This file is and edited version of the file given in the
// linkedIn Learning course by Linton Ye

const baselineGrid = 8;

export const metrics = {
  baselineGrid,
  screenEdgeMarginHorizontal: baselineGrid * 2,
  gutterHorizontal: baselineGrid * 2,
  gutterVertical: baselineGrid * 2,
  toolbarHeight: baselineGrid * 7,
  fabSize: baselineGrid * 7,
  fabIconSize: baselineGrid * 3,
  fabSizeMini: baselineGrid * 5,
  elevation: {
    appBar: 4,
    fabResting: 6,
    fabPressed: 12,
    dialog: 24,
  },
};

export const fontFamilies = {
  android: {
    light: { fontFamily: 'sans-serif-light' },
    normal: { fontFamily: 'sans-serif' },
    medium: { fontFamily: 'sans-serif-medium' },
    // Bold sans-serif is not currently supported, normal sans-serif instead
    bold: { fontFamily: 'sans-serif' },
  },
  ios: {
    light: { fontFamily: 'Helvetica-Light' },
    normal: { fontFamily: 'Helvetica' },
    medium: { fontFamily: 'HelveticaNeue-Medium' },
    bold: { fontFamily: 'Helvetica-Bold' },
  }
};

export const fonts = {
  // English and English-alike only.
  sizes: {
    android: {
      display4: { fontSize: 112, ...fontFamilies.android.light },
      display3: { fontSize: 56, },
      display2: { fontSize: 45, lineHeight: 48 },
      display1: { fontSize: 34, lineHeight: 40 },
      headline: { fontSize: 24, lineHeight: 32 },
      title: { fontSize: 20, lineHeight: 24, ...fontFamilies.android.medium },
      subheading: { fontSize: 16, lineHeight: 24 },
      body2: { fontSize: 14, lineHeight: 24, ...fontFamilies.android.medium },
      body1: { fontSize: 14, lineHeight: 20 },
      caption: { fontSize: 12 },
      button: { fontSize: 14, ...fontFamilies.android.medium },
    },
    ios: {
      display4: { fontSize: 112, ...fontFamilies.ios.light },
      display3: { fontSize: 56, },
      display2: { fontSize: 45, lineHeight: 48 },
      display1: { fontSize: 34, lineHeight: 40 },
      headline: { fontSize: 24, lineHeight: 32 },
      title: { fontSize: 20, lineHeight: 24, ...fontFamilies.ios.medium },
      subheading: { fontSize: 16, lineHeight: 24 },
      body2: { fontSize: 14, lineHeight: 24, ...fontFamilies.ios.medium },
      body1: { fontSize: 14, lineHeight: 20 },
      caption: { fontSize: 12 },
      button: { fontSize: 14, ...fontFamilies.ios.medium },
    }
  },
  families: fontFamilies,
};