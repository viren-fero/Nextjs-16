export default async function NewsDetailPage({ params }) {
    const { id } = await params;
    return <>
        News ID: {id}
    </>
}