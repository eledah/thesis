import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// Define Color Palettes
const colorPalettes = {
  original: {
    lightMode: {
      light: "#faf8f8",
      lightgray: "#e5e5e5",
      gray: "#b8b8b8",
      darkgray: "#4e4e4e",
      dark: "#2b2b2b",
      secondary: "#284b63",
      tertiary: "#84a59d",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#fff23688",
    },
    darkMode: {
      light: "#161618",
      lightgray: "#393639",
      gray: "#646464",
      darkgray: "#d4d4d4",
      dark: "#ebebec",
      secondary: "#7b97aa",
      tertiary: "#84a59d",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#b3aa0288",
    },
  },
  thesis: {
    lightMode: {
      light: "#FAFAF7",
      lightgray: "#E7E5E4",
      gray: "#A8A29E",
      darkgray: "#3F3F46",
      dark: "#111827",
      secondary: "#1E3A8A",
      tertiary: "#A37C28",
      highlight: "rgba(30, 58, 138, 0.12)",
      textHighlight: "#F2CC0F88",
    },
    darkMode: {
      light: "#0E1116",
      lightgray: "#2A2F36",
      gray: "#5B6472",
      darkgray: "#D1D5DB",
      dark: "#F3F4F6",
      secondary: "#8AA4FF",
      tertiary: "#E6C17A",
      highlight: "rgba(138, 164, 255, 0.15)",
      textHighlight: "#F2CC0F88",
    },
  },
}

// Select your desired palette here
 // Available palettes: original, thesis, coolBlues, warmEarth, forestGreen, royalPurple, oceanicTeal, monochrome, vintageCream, devDark, oceanVibes, halloween, neon, sunset, persianAzure, sakuraDreams, cyberpunkCity, autumnGrove
// type PaletteName = keyof typeof colorPalettes; // This line might cause issues with older TS
const currentPaletteName: keyof typeof colorPalettes = "thesis"

const selectedPalette = colorPalettes[currentPaletteName]

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "سفر علمی",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "fa-IR",
    baseUrl: "eledah.ir/thesis",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Vazirmatn",
        body: "Vazirmatn",
        code: "IBM Plex Mono",
      },
      colors: selectedPalette,
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
