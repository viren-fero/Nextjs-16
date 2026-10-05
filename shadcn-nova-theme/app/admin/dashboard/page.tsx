import Image from "next/image";

export default function DashboardPage() {
    return (
        <>
            <Image src="/google-logo.webp" alt="ShadCN Nova Theme" width={200} height={200} />
            <span>Admin Dashboard!</span>
        </>
    )
}