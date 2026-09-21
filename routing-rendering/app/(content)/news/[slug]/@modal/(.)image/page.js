"use client";
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound, useRouter } from "next/navigation";

export default async function InterceptedImagePage({ params }) {
    const router = useRouter();

    const { slug } = await params;
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === slug);

    if (!newsItem) {
        notFound();
    }

    return (

        <>
            <div className="modal-backdrop" onClick={router.back} >
                <dialog className="modal" open>
                    <div className="fullscreen-image">
                        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                    </div>
                </dialog>
            </div>
        </>
    )
}