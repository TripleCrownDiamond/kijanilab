import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "Blog" : "Blog" };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalized = isLocale(locale) ? locale : "fr";
  const copy = getDictionary(normalized);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8 px-4 pb-20 pt-14 md:px-8">
      <h1 className="font-display text-6xl text-base-text">Blog</h1>
      <div className="grid gap-4">
        {copy.blogPosts.map((post) => (
          <article key={post.title} className="glass p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-text">{post.category}</p>
            <h2 className="mt-2 text-2xl font-semibold text-base-text">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-text">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
