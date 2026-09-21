import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

export default function LatestNewsPage() {
    const latestNews = getLatestNews();
    return <>
        <h2>
            Latest News page.
        </h2>
        <NewsList news={latestNews}></NewsList>
    </>
}

// you can delete this file if the default.js has the exact smae things.