import Link from "next/link";

export default function NewsPage() {
    return <>
        <h1>News Page</h1>
        <ul>
            <li>
                <Link href="news/first" >First</Link>
            </li>
            <li>
                <Link href="news/second" >Second</Link>
            </li>
            <li>
                <Link href="news/third" >Third</Link>
            </li>
        </ul>
    </>
}