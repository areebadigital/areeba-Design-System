/* areeba Asterisk tokens: generated from tokens.json by scripts/build-platform-tokens.mjs. Do not edit. */
/* React Native theme. Fonts are the files in fonts/ (link them with react-native-asset or Expo). Arabic text uses arabicFont and never letterSpacing. */
const shared = {
  "space": {
    "s1": 4,
    "s2": 8,
    "s3": 12,
    "s4": 16,
    "s5": 20,
    "s6": 24,
    "s8": 32,
    "s10": 40,
    "s12": 48,
    "s16": 64
  },
  "radius": {
    "xs": 4,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "full": 999
  },
  "size": {
    "controlSm": 32,
    "controlMd": 44,
    "controlLg": 48,
    "icon": 24,
    "tabbar": 64
  },
  "motion": {
    "duration": {
      "instant": 100,
      "fast": 150,
      "base": 250,
      "slow": 400
    },
    "easing": {
      "standard": [
        0.2,
        0,
        0,
        1
      ],
      "enter": [
        0,
        0,
        0,
        1
      ],
      "exit": [
        0.3,
        0,
        1,
        1
      ]
    },
    "distance": 8
  },
  "type": {
    "displayXl": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 64,
      "lineHeight": 72,
      "letterSpacing": -1.92
    },
    "displayLg": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 48,
      "lineHeight": 56,
      "letterSpacing": -1.92
    },
    "display": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 36,
      "lineHeight": 44,
      "letterSpacing": -0.72
    },
    "h1": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 30,
      "lineHeight": 38,
      "letterSpacing": -0.6
    },
    "h2": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 24,
      "lineHeight": 32,
      "letterSpacing": 0
    },
    "h3": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 20,
      "lineHeight": 30,
      "letterSpacing": 0
    },
    "bodyLg": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 18,
      "lineHeight": 28,
      "letterSpacing": 0
    },
    "body": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 16,
      "lineHeight": 24,
      "letterSpacing": 0
    },
    "bodySm": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 14,
      "lineHeight": 20,
      "letterSpacing": 0
    },
    "label": {
      "fontFamily": "PlusJakartaSans-Medium",
      "fontSize": 14,
      "lineHeight": 20,
      "letterSpacing": 0
    },
    "caption": {
      "fontFamily": "PlusJakartaSans-Regular",
      "fontSize": 12,
      "lineHeight": 18,
      "letterSpacing": 0
    },
    "amountXl": {
      "fontFamily": "PlusJakartaSans-Bold",
      "fontSize": 40,
      "lineHeight": 48,
      "letterSpacing": -0.8,
      "fontVariant": [
        "tabular-nums"
      ]
    },
    "amount": {
      "fontFamily": "PlusJakartaSans-SemiBold",
      "fontSize": 17,
      "lineHeight": 24,
      "letterSpacing": 0,
      "fontVariant": [
        "tabular-nums"
      ]
    },
    "code": {
      "fontFamily": "IBMPlexMono-Regular",
      "fontSize": 13,
      "lineHeight": 20,
      "letterSpacing": 0,
      "fontVariant": [
        "tabular-nums"
      ]
    }
  },
  "arabicFont": {
    "400": "IBMPlexSansArabic-Regular",
    "500": "IBMPlexSansArabic-Medium",
    "600": "IBMPlexSansArabic-SemiBold",
    "700": "IBMPlexSansArabic-Bold"
  }
};
export const light = { ...shared, ...{
  "dark": false,
  "colors": {
    "brand": "#630c0c",
    "brandHover": "#4a0909",
    "brandSoft": "#efe7e7",
    "onBrand": "#ffffff",
    "accent": "#ff2929",
    "night": "#131210",
    "onNight": "#ffffff",
    "mint": "#c9f2e7",
    "surface": "#ffffff",
    "surfaceSunken": "#f3f2ef",
    "surfaceRaised": "#ffffff",
    "surfaceField": "#f3f2ef",
    "ink": "#131210",
    "inkMuted": "rgba(19, 18, 16, 0.8)",
    "inkDisabled": "#a8a59f",
    "line": "#e0dfdd",
    "lineStrong": "#8a8782",
    "focus": "#1d5fd6",
    "success": "#007612",
    "successSoft": "#e7f8e9",
    "warning": "#a64a05",
    "warningSoft": "#fff3e0",
    "danger": "#d0121b",
    "dangerSoft": "#fdecea",
    "info": "#1d5fd6",
    "infoSoft": "#e8f0fd",
    "chart1": "#630c0c",
    "chart2": "#2f6fe0",
    "chart3": "#0f9488",
    "chart4": "#c27c0e",
    "chartGrid": "#ecebe8"
  },
  "shadow": {
    "shadow1": {
      "shadowColor": "#131210",
      "shadowOpacity": 0.06,
      "shadowRadius": 1,
      "shadowOffset": {
        "width": 0,
        "height": 1
      },
      "elevation": 1
    },
    "shadow2": {
      "shadowColor": "#131210",
      "shadowOpacity": 0.08,
      "shadowRadius": 6,
      "shadowOffset": {
        "width": 0,
        "height": 4
      },
      "elevation": 4
    },
    "shadow3": {
      "shadowColor": "#131210",
      "shadowOpacity": 0.16,
      "shadowRadius": 20,
      "shadowOffset": {
        "width": 0,
        "height": 16
      },
      "elevation": 13
    }
  }
} };
export const dark = { ...shared, ...{
  "dark": true,
  "colors": {
    "brand": "#f3f2ef",
    "brandHover": "#ffffff",
    "brandSoft": "#2b1715",
    "onBrand": "#630c0c",
    "accent": "#ff2929",
    "night": "#1f1d1a",
    "onNight": "#f3f2ef",
    "mint": "#123a33",
    "surface": "#131210",
    "surfaceSunken": "#0c0b0a",
    "surfaceRaised": "#1f1d1a",
    "surfaceField": "#1f1d1a",
    "ink": "#f3f2ef",
    "inkMuted": "rgba(243, 242, 239, 0.8)",
    "inkDisabled": "#57534d",
    "line": "#2e2b27",
    "lineStrong": "#7a766f",
    "focus": "#7ca7f8",
    "success": "#34d399",
    "successSoft": "#0f2e24",
    "warning": "#fbbf24",
    "warningSoft": "#33240a",
    "danger": "#f97066",
    "dangerSoft": "#3a1210",
    "info": "#7ca7f8",
    "infoSoft": "#14233f",
    "chart1": "#f3f2ef",
    "chart2": "#4f86ec",
    "chart3": "#1aa898",
    "chart4": "#c2841c",
    "chartGrid": "#24221f"
  },
  "shadow": {
    "shadow1": {
      "shadowColor": "#000000",
      "shadowOpacity": 0.4,
      "shadowRadius": 1,
      "shadowOffset": {
        "width": 0,
        "height": 1
      },
      "elevation": 1
    },
    "shadow2": {
      "shadowColor": "#000000",
      "shadowOpacity": 0.5,
      "shadowRadius": 6,
      "shadowOffset": {
        "width": 0,
        "height": 4
      },
      "elevation": 4
    },
    "shadow3": {
      "shadowColor": "#000000",
      "shadowOpacity": 0.6,
      "shadowRadius": 20,
      "shadowOffset": {
        "width": 0,
        "height": 16
      },
      "elevation": 13
    }
  }
} };
export const themes = { light, dark };
export default themes;
