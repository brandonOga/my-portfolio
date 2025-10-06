'use client'

import Link from "next/link";
import { ReactNode } from "react";

type SocialButtonProps = {
    label:string;
    url: string;
    icon: ReactNode;
}

export default function SocialButton({
label, 
url,
icon,
}:SocialButtonProps){
    return(
        <Link 
        href={url} 
        target="_blank"
        rel = "noopener noreferr er" className="px-[30px] py-[15px] uppercase border-2 border-[var(--foreground) rounded-full hover:bg-[var(accent)] hover:text-[var(--text-white)]"> 
        <span>{label}</span>{icon}
        </Link>
    );
}
