import Image from "next/image"


type Props = {
    image: string;
    title: string;
    tags: string;
    size?: "big" | "small";
}

export default function ProjectCard({image, title, tags, size = "small"}:Props){
    const imageHeightClass = size === "big" ? "h-[600px]" : "h-[350px]";

    return (
        <div className="bg-[var(--backgroung)] flex flex-col gap-[15px]">
            <div className={`relative w-full ${imageHeightClass}`}>
                <Image src= {image} alt={title} fill className=" w-full h-full object-cover" />
            </div>
            <div>
                <h6 className="text-[25px] font-heading">{title}</h6>
                <p className="text-xl text-[var(--offblack)]">{tags}</p>
            </div>
        </div>
    );

}

