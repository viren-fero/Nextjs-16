"use client";

import Form from "next/form";

export default function ContactForm({action}){
    return (
        <Form action={action} className="flex flex-col gap-3">
            <input name="name" placeholder="Name" className="border p-2" />
            <input name="email" placeholder="Email" className="border p-2" />
            <input name="message" placeholder="Message" className="border p-2" />
            <button className="bg-black text-white px-4 py-12" >Submit</button>
        </Form>
    )
}