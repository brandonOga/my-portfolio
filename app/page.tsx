'use client';
import  SmoothScrollHero from "@/components/SmoothScrollHero";
import Image from "next/image";
import Link from "next/link";
import { PiStarFourFill } from "react-icons/pi";
import dynamic from 'next/dynamic';
import ProjectCard from "@/components/ProjectCard";
import {projects} from "@/data/projects";
import { IoIosMail, IoLogoLinkedin } from "react-icons/io";
import { MdPhoneEnabled } from "react-icons/md";
import { PiDribbbleLogoFill } from "react-icons/pi";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { image } from "framer-motion/client";


const PillScene = dynamic(() => import('../components/PillScene'), { ssr: false });
gsap.registerPlugin(ScrollTrigger);


export default function Home() {

  const floatingImages = [
      { src: "/images/brandon.png", top: "10%", left: "0", size: 150 },
      { src: "/images/brandon.png", top: "35%", left: "15%", size: 100 },
      { src: "/images/brandon.png", top: "5%", left: "20%", size: 130 },
      { src: "/images/neighbourhood.jpg", top: "0", left: "45%", size: 200 },
      { src: "/images/brandon.png", bottom: "50%", right: "25%", size: 150 },
      { src: "/images/brandon.png", top: "5%", right: "10%", size: 180 },
      { src: "/images/brandon.png", bottom: "40%", right: "0%", size: 80 },
    ]

 
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }




  return (
    <main className="min-h-screen flex flex-col ">
      {/* Banner Section */}
      <section  id="banner" className="w-full min-h-screen flex items-start flex-col relative overflow-hidden">
          <div className = "w-full px-[1.5vw] justify-center pb-[300px] flex flex-col gap-[20px]  flex-1 relative overflow-hidden">

            {/*Randomized Images */}
            {floatingImages.map((img, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  top: "50%",  // 👈 starting point (all images start here)
                  left: "50%",
                  translateX: "-50%", // center correction
                  translateY: "-50%",
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  top: img.top ?? "auto",
                  left: img.left ?? "auto",
                  right: img.right ?? "auto",
                  bottom: img.bottom ?? "auto",
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.2, // staggered entrance
                  ease: "easeOut",
                }}
                style={{ width: img.size }}
              >
                <Image
                  src={img.src}
                  alt={`floating-${i}`}
                  width={img.size}
                  height={img.size}
                  className="object-cover"
                />
              </motion.div>
            ))}

            {/*Headline */}
            <div className="w-full flex-col flex items-center gap-[0px] relative z-10">
              <h1 className="text-[max(2rem,3.5vw)] leading-none uppercase font-heading">Pixels</h1>
              <h1 className="text-[max(2rem,3.5vw)] leading-none uppercase font-heading">Prototypes</h1>
              <h1 className="text-[max(2rem,3.5vw)] leading-none uppercase font-heading">& code</h1>
            </div>

            {/*Name */}
            <div className="absolute bottom-0 left-0 right-0 justify-center flex flex-col gap-[20px]">

              {/*Quick overview */}
              <div className="flex flex-col xl:flex-row justify-between items-end px-[1.5vw] gap-[25px]">
                <p className="w-full xl:w-2/5 text-lg/8 md:text-xl/9 xl:text-2xl/10  text-[var(--offblack)] ">Hi 👋, I am a <span className="italic text-[var(--foreground)] ">UI/UX Designer</span> and  <span className="italic text-[var(--foreground)]">Developer</span> with 3 years of experience based in Zimbabwe.</p>
                <p className ="text-base lg:text-lg text-[var(--offblack)] uppercase">[Scroll to Explore]</p>
              </div>

              {/*Large Name */}
              <h1
                className="uppercase font-heading text-[10.4vw] text-center leading-none"
              >
                Brandon Mupemhi
              </h1>

              {/*Animated skills*/}
              <div className=" bg-[var(--foreground)] py-[15px]  rotate-[-0.5deg] origin-left flex gap-[40px]">
                <p className="text-white text-xl flex items-center gap-[40px] uppercase">
                  UI/UX designer <span className="flex gap-[10px] items-center"><PiStarFourFill /> /</span>
                </p>
                <p className="text-white text-xl flex items-center gap-[40px] uppercase">
                  frontend developer <span className="flex gap-[10px] items-center"><PiStarFourFill /> /</span>
                </p>
                <p className="text-white text-xl flex items-center gap-[40px] uppercase">
                  Wordpress developer <span className="flex gap-[10px] items-center"><PiStarFourFill /> /</span>
                </p>
              </div>

            </div>
          </div>
      </section>

       {/* About Section */}
      <section id="about" className="w-full flex justify-center">
        <div className="w-full max-w-screen-2xl  px-[min(10%,150px)]  py-[50px] lg:py-[100px]">
          <div className="w-full flex flex-col lg:flex-row items-start gap-[50px] " >
            <div className="w-full lg:w-1/5">
              <p className="font-heading text-2xl  uppercase leading-[1.8em]">About me</p>
            </div>
            <div className=" w-full lg:w-4/5 flex flex-col gap-[30px]">
              <p className="text-3xl font-light text-[var(--offblack)] leading-[1.5em]">
                Hi there, I am Brandon Mupemhi! Since starting my design journey in 2022,  I have been passionately crafting digital products that blend aesthetics and functionality. I love transforming creative concepts into responsive, intuitive interfaces that feel seamless and delightful to use.
              </p> 
              <div>
                <p className="text-3xl font-light text-[var(--offblack)]">with my skills in:</p>
                
              </div>
              <div className="flex justify-start pt-[50px]">
                <Link 
                  href="/about" 
                  className="w-full md:w-auto justify-center px-[25px] py-[15px] text-[var(--text-white)] bg-[var(--accent)] uppercase items-center text-lg md:text-2xl   flex gap-[20px]  rounded-full hover:bg-[var(--primary)] hover:text-[var(--foreground)]"> 
                  More about me
                </Link> 
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Work Section */}
      <section id ="work" className="w-full flex justify-center">
        <div className="w-full max-w-screen-2xl px-[min(10%,150px)] py-[50px] lg:py-[100px] flex flex-col gap-[50px] xl:gap-[80px]">
          <div className="w-full  ">
            <h2 className="uppercase text-[min(7.8vw,122px)]">Featured Work</h2>
          </div>
          <div className="">
            <div className="space-y-[50px]">
              {rows.map((pair, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid gap-y-[50px] justify-between items-start ${
                    rowIndex % 2 === 0 ? "grid-cols-[58%_40%]" : "grid-cols-[40%_58%]"
                  }`}
                >
                  {rowIndex % 2 === 0 ? (
                    <>
                      <ProjectCard {...pair[0]} size="big" />
                      <ProjectCard {...pair[1]} size="small" />
                    </>
                  ) : (
                    <>
                      <ProjectCard {...pair[0]} size="small" />
                      <ProjectCard {...pair[1]} size="big" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Contact Section */}
      <section id = "contact" className="w-full flex justify-center">
        <div className="w-full max-w-screen-2xl px-[min(10%,150px)] py-[80px] lg:py-[100px] flex flex-col gap-[100px] xl:gap-[200px]">

          {/*Section Title */}
          <div className="w-full flex flex-col ">
            <h2 className="relative uppercase text-[min(11vw,180px)] flex items-end justify-between">
              Contact
              <div className="absolute right-[18%] top-[55%] -translate-y-1/2 w-[min(14vw,200px)] h-50px lg:h-[100px] xl:h-[100px] 2xl:h-[120px] rotate-[5deg] origin-right ">
                <Image
                  src="/images/brandon2.jpg"
                  alt="mockup"
                  width={130}
                  height={130}
                  className="border-4 border-[var(--primary)] rounded-full object-cover w-full h-full "
                />
              </div>
              me
            </h2>
            <h6 className="text-2xl text-[var(--offblack)] text-center font-heading">Interested in working together? 🤝</h6>
          </div>

          {/* Contact Details */}
          <div className="w-full flex flex-wrap xl:flex-row  justify-center  items-center gap-[20px] xl:gap-[5px]">

            {/*Email */}
            <div className="w-full md:w-auto border-2 border-[var(--foreground)] rounded-full hover:bg-[var(--accent)] hover:border-[var(--accent)] ">
              <div className="w-full md:w-auto p-[4px] animate-rotate-border rounded-full bg-conic/[from_var(--border-angle)] from-transparent via-[var(--accent)] to-transparent from-80% via-90% to-100%">
                <a 
                  href="mailto:brandoneemupemhi@gmail.com" target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto justify-center px-[25px] py-[12px] bg-[var(--background)] uppercase items-center text-lg md:text-2xl  flex gap-[20px]  rounded-full hover:bg-[var(--accent)] hover:text-[var(--text-white)]"> 
                  Drop me a line
                  <IoIosMail className="text-[30px] md:text-[40px]" />
                </a>
              </div>
            </div>

            {/*Phone */}
            <div className="w-full md:w-auto xl:rotate-[-14deg] origin-left border-2 border-[var(--foreground)] rounded-full hover:bg-[var(--accent)] hover:border-[var(--accent)] ">
              <div className="p-[5px] w-full md:w-auto ">
                <a href="tel:+263776382111" target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto justify-center px-[25px] py-[10px] bg-[var(--background)] uppercase items-center text-lg md:text-2xl   flex gap-[20px]  rounded-full hover:bg-[var(--accent)] hover:text-[var(--text-white)]"> 
                  Ring me up
                  <MdPhoneEnabled className="text-[30px] md:text-[40px]" />
                </a>
              </div>
            </div>
            
            {/*Linkedin */}
            <div className="w-full md:w-auto border-2 border-[var(--foreground)] rounded-full hover:bg-[var(--accent)] hover:border-[var(--accent)] xl:ml-[-30px] ">
              <div className="p-[5px] w-full md:w-auto ">
                <a 
                  href="https://www.linkedin.com/in/brandon-mupemhi-697007230/" target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto justify-center px-[25px] py-[10px] bg-[var(--background)] uppercase items-center text-lg md:text-2xl   flex gap-[20px]  rounded-full hover:bg-[var(--accent)] hover:text-[var(--text-white)]"> 
                  Linkedin
                  <IoLogoLinkedin  className="text-[30px] md:text-[40px]" />
                </a>
              </div>
            </div>
            
            {/*Dribbble */}
            <div className="w-full md:w-auto xl:w-auto xl:rotate-[18deg] origin-right border-2 border-[var(--foreground)] rounded-full hover:bg-[var(--accent)] hover:border-[var(--accent)] xl:ml-[-40px] ">
              <div className="p-[5px] w-full md:w-auto">
                <a 
                  href="https://dribbble.com/OGA_01" target="_blank" rel="noopener noreferrer"
                  className="w-full md:w-auto justify-center px-[25px] py-[10px] bg-[var(--background)] uppercase items-center text-lg md:text-2xl   flex gap-[20px]  rounded-full hover:bg-[var(--accent)] hover:text-[var(--text-white)]"> 
                  Dribbble
                  <PiDribbbleLogoFill className="text-[30px] md:text-[40px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
