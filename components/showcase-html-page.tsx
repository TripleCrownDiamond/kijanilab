import type { Metadata } from "next";
import Script from "next/script";
import { loadShowcasePage, type ShowcasePageKey } from "@/lib/showcase";

type Props = {
  locale: string;
  page: ShowcasePageKey;
};

type HtmlTag = "header" | "main" | "section";

type HtmlElementProps = {
  tag: HtmlTag;
  id?: string;
  className?: string;
  html: string;
};

function HtmlElement({ tag, id, className, html }: HtmlElementProps) {
  const Tag = tag;
  return <Tag id={id} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function HtmlChunk({ html }: { html: string }) {
  if (!html.trim()) {
    return null;
  }
  return <div className="showcase-chunk" dangerouslySetInnerHTML={{ __html: html }} />;
}

function ShowcaseStructuredBody({ data }: { data: Awaited<ReturnType<typeof loadShowcasePage>> }) {
  const layout = data.layout;

  // Fallback for unexpected pages keeps exact showcase HTML rendering.
  if (!layout.main) {
    return <div className={data.bodyClassName || ""} dangerouslySetInnerHTML={{ __html: data.bodyHtml }} />;
  }

  return (
    <div className={data.bodyClassName || ""}>
      {layout.header ? <HtmlElement tag="header" id={layout.header.id} className={layout.header.className} html={layout.header.innerHtml} /> : null}

      <main id={layout.main.id} className={layout.main.className}>
        <HtmlChunk html={layout.mainBeforeHeroHtml} />
        {layout.hero ? <HtmlElement tag="section" id={layout.hero.id} className={layout.hero.className} html={layout.hero.innerHtml} /> : null}
        <HtmlChunk html={layout.mainAfterHeroHtml} />
      </main>

      <HtmlChunk html={layout.tailHtml} />
    </div>
  );
}

export async function getShowcaseMetadata(page: ShowcasePageKey, locale: string): Promise<Metadata> {
  const data = await loadShowcasePage(page, locale);

  return {
    title: data.title,
    description: data.description,
  };
}

export async function ShowcaseHtmlPage({ locale, page }: Props) {
  const data = await loadShowcasePage(page, locale);

  return (
    <>
      {page === "jeu" && data.gameInlineStyle ? (
        <style dangerouslySetInnerHTML={{ __html: data.gameInlineStyle }} />
      ) : null}

      <ShowcaseStructuredBody data={data} />

      <Script src="/showcase/assets/app.js" strategy="afterInteractive" />
      {page === "jeu" ? <Script src="/showcase/game/game.js" strategy="afterInteractive" /> : null}
    </>
  );
}
