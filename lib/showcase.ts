import { readFile } from "node:fs/promises";
import path from "node:path";

export type ShowcasePageKey = "home" | "services" | "projets" | "contact" | "auth" | "dashboard" | "admin" | "jeu";

const pageFiles: Record<ShowcasePageKey, string> = {
  home: "index.html",
  services: "pages/services.html",
  projets: "pages/projets.html",
  contact: "pages/contact.html",
  auth: "pages/auth.html",
  dashboard: "pages/dashboard.html",
  admin: "pages/admin.html",
  jeu: "game/index.html",
};

const SHOWCASE_ROOT = path.join(process.cwd(), "public", "showcase");

type ElementSlice = {
  id?: string;
  className?: string;
  innerHtml: string;
};

type ShowcaseLayout = {
  header?: ElementSlice;
  main?: ElementSlice;
  hero?: ElementSlice;
  mainBeforeHeroHtml: string;
  mainAfterHeroHtml: string;
  tailHtml: string;
};

export type ShowcasePageData = {
  page: ShowcasePageKey;
  title: string;
  description: string;
  bodyClassName: string;
  bodyHtml: string;
  gameInlineStyle: string;
  layout: ShowcaseLayout;
};

function replaceAttrValue(html: string, attr: "href" | "src", from: string, to: string) {
  const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.replace(new RegExp(`${attr}=\"${escaped}\"`, "g"), `${attr}="${to}"`);
}

function rewriteLinks(html: string, locale: string) {
  const pageLinkMap: Array<[string, string]> = [
    ["../index.html#atlas", `/${locale}#atlas`],
    ["../index.html", `/${locale}`],
    ["index.html", `/${locale}`],
    ["pages/services.html", `/${locale}/services`],
    ["services.html", `/${locale}/services`],
    ["pages/projets.html", `/${locale}/projets`],
    ["projets.html", `/${locale}/projets`],
    ["pages/contact.html", `/${locale}/contact`],
    ["contact.html", `/${locale}/contact`],
    ["pages/auth.html", `/${locale}/auth`],
    ["auth.html", `/${locale}/auth`],
    ["pages/dashboard.html", `/${locale}/dashboard`],
    ["dashboard.html", `/${locale}/dashboard`],
    ["pages/admin.html", `/${locale}/admin`],
    ["admin.html", `/${locale}/admin`],
    ["game/index.html", `/${locale}/jeu`],
    ["../game/index.html", `/${locale}/jeu`],
    ["../pages/contact.html", `/${locale}/contact`],
    ["MIGRATION.md", "/showcase/MIGRATION.md"],
    ["../MIGRATION.md", "/showcase/MIGRATION.md"],
  ];

  const assetMap: Array<[string, string]> = [
    ["assets/styles.css", "/showcase/assets/styles.css"],
    ["../assets/styles.css", "/showcase/assets/styles.css"],
    ["assets/logo-dark.svg", "/showcase/assets/logo-dark.svg"],
    ["assets/logo-light.svg", "/showcase/assets/logo-light.svg"],
    ["assets/wordmark-dark.svg", "/showcase/assets/wordmark-dark.svg"],
    ["assets/wordmark-light.svg", "/showcase/assets/wordmark-light.svg"],
    ["assets/logo-green-black-leaf.svg", "/showcase/assets/logo-green-black-leaf.svg"],
    ["assets/logo-green-white-leaf.svg", "/showcase/assets/logo-green-white-leaf.svg"],
    ["assets/logo-components/leaves-dark.svg", "/showcase/assets/logo-components/leaves-dark.svg"],
    ["assets/logo-components/leaves-white.svg", "/showcase/assets/logo-components/leaves-white.svg"],
    ["assets/logo-components/dark-leaves.png", "/showcase/assets/logo-components/dark-leaves.png"],
    ["assets/logo-components/white-leaves.png", "/showcase/assets/logo-components/white-leaves.png"],
    ["../assets/logo-dark.svg", "/showcase/assets/logo-dark.svg"],
    ["../assets/logo-light.svg", "/showcase/assets/logo-light.svg"],
    ["../assets/logo-green-black-leaf.svg", "/showcase/assets/logo-green-black-leaf.svg"],
    ["../assets/logo-green-white-leaf.svg", "/showcase/assets/logo-green-white-leaf.svg"],
    ["../assets/logo-components/leaves-dark.svg", "/showcase/assets/logo-components/leaves-dark.svg"],
    ["../assets/logo-components/leaves-white.svg", "/showcase/assets/logo-components/leaves-white.svg"],
    ["../assets/logo-components/dark-leaves.png", "/showcase/assets/logo-components/dark-leaves.png"],
    ["../assets/logo-components/white-leaves.png", "/showcase/assets/logo-components/white-leaves.png"],
  ];

  let out = html;

  for (const [from, to] of pageLinkMap) {
    out = replaceAttrValue(out, "href", from, to);
  }

  for (const [from, to] of assetMap) {
    out = replaceAttrValue(out, "href", from, to);
    out = replaceAttrValue(out, "src", from, to);
  }

  return out;
}

function extractBodyParts(raw: string) {
  const bodyTagMatch = raw.match(/<body([^>]*)>/i);
  const bodyClassMatch = bodyTagMatch?.[1]?.match(/class="([^"]*)"/i);
  const bodyClassName = bodyClassMatch?.[1] ?? "";
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyInner = bodyMatch?.[1] ?? raw;
  const bodyWithoutScripts = bodyInner.replace(/<script[\s\S]*?<\/script>/gi, "");

  return {
    bodyClassName,
    bodyHtml: bodyWithoutScripts,
  };
}

function extractTitle(raw: string) {
  const title = raw.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  return title ?? "KijaniLab";
}

function extractDescription(raw: string) {
  const match = raw.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?\s*>/i);
  return match?.[1] ?? "KijaniLab";
}

function extractFirstStyleBlock(raw: string) {
  return raw.match(/<style>([\s\S]*?)<\/style>/i)?.[1] ?? "";
}

function extractAttr(attrs: string, name: string) {
  return attrs.match(new RegExp(`${name}="([^"]*)"`, "i"))?.[1];
}

function toElementSlice(attrs: string, innerHtml: string): ElementSlice {
  return {
    id: extractAttr(attrs, "id"),
    className: extractAttr(attrs, "class"),
    innerHtml,
  };
}

function extractFirstTag(source: string, tag: "header" | "main") {
  const match = source.match(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!match) {
    return { element: undefined as ElementSlice | undefined, removed: source };
  }

  const full = match[0];
  const attrs = match[1] ?? "";
  const inner = match[2] ?? "";

  return {
    element: toElementSlice(attrs, inner),
    removed: source.replace(full, ""),
  };
}

function extractHero(mainInnerHtml: string, page: ShowcasePageKey) {
  if (page === "jeu") {
    return {
      hero: undefined as ElementSlice | undefined,
      before: "",
      after: mainInnerHtml,
    };
  }

  const classTarget = page === "home" ? "hero" : "page-hero";
  const sectionMatch = mainInnerHtml.match(
    new RegExp(`<section\\b[^>]*class="[^"]*\\b${classTarget}\\b[^"]*"[^>]*>[\\s\\S]*?<\\/section>`, "i"),
  );

  if (!sectionMatch) {
    return {
      hero: undefined as ElementSlice | undefined,
      before: "",
      after: mainInnerHtml,
    };
  }

  const full = sectionMatch[0];
  const start = mainInnerHtml.indexOf(full);
  const end = start + full.length;
  const before = start > 0 ? mainInnerHtml.slice(0, start) : "";
  const after = mainInnerHtml.slice(end);

  const parsed = full.match(/<section\b([^>]*)>([\s\S]*?)<\/section>/i);
  const attrs = parsed?.[1] ?? "";
  const inner = parsed?.[2] ?? "";

  return {
    hero: toElementSlice(attrs, inner),
    before,
    after,
  };
}

function splitLayout(bodyHtml: string, page: ShowcasePageKey): ShowcaseLayout {
  const { element: header, removed: withoutHeader } = extractFirstTag(bodyHtml, "header");
  const { element: main, removed: withoutMain } = extractFirstTag(withoutHeader, "main");

  if (!main) {
    return {
      header,
      main: undefined,
      hero: undefined,
      mainBeforeHeroHtml: "",
      mainAfterHeroHtml: "",
      tailHtml: withoutMain.trim(),
    };
  }

  const heroSplit = extractHero(main.innerHtml, page);

  return {
    header,
    main,
    hero: heroSplit.hero,
    mainBeforeHeroHtml: heroSplit.before,
    mainAfterHeroHtml: heroSplit.after,
    tailHtml: withoutMain.trim(),
  };
}

export async function loadShowcasePage(page: ShowcasePageKey, locale: string): Promise<ShowcasePageData> {
  const rel = pageFiles[page];
  const abs = path.join(SHOWCASE_ROOT, rel);
  const raw = await readFile(abs, "utf8");
  const { bodyClassName, bodyHtml } = extractBodyParts(raw);
  const rewrittenBody = rewriteLinks(bodyHtml, locale);

  return {
    page,
    title: extractTitle(raw),
    description: extractDescription(raw),
    bodyClassName,
    bodyHtml: rewrittenBody,
    gameInlineStyle: page === "jeu" ? extractFirstStyleBlock(raw) : "",
    layout: splitLayout(rewrittenBody, page),
  };
}

