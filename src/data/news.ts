import type { NewsArticle } from "@/types";
import { client } from "@/sanity/lib/client";
import { mapSanityNewsArticle } from "@/sanity/lib/mapNewsArticle";
import { newsArticlesQuery } from "@/sanity/lib/queries/news";

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const documents = await client.fetch(newsArticlesQuery);
  return documents.map(mapSanityNewsArticle);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  const articles = await getNewsArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  const articles = await getNewsArticles();
  return articles.slice(0, limit);
}
