'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from "next/image";
import HeadingReveal from "@/components/HeadingReveal";


export default function About() {

  const mazita = [
    {id: 1, name: 'Brandon' },
    {id: 2, name: 'Oga'},
    {id: 3, name: 'Mupemhi'},
  ]

  return(
    <main className="flex flex-col min-h-screen ">
      <section className="w-full flex justify-center px-[min(10%,150px)]">
        <div className="w-full max-w-screen-2xl min-h-screen pb-[100px] leading-none flex flex-col gap-[100px]">

          {/*Headline */}
          <div className='pt-[100px] lg:pt-0'>
            <h1 className='font-heading text-center uppercase text-[15vw]'>About Me</h1>
          </div>

          {/*Biography*/}
          <div className='flex flex-col'>
            <div className="w-full lg:w-1/2  h-[500px] lg:h-[800px] relative">
              <Image
                src="/images/brandon.svg"
                alt ="Picture of Brandon"
                fill
                className='object-cover'
              />
            </div>
            <div className='w-full lg:w-1/2 bg-'>
              
            </div>
          </div>

          {/*Skills & Experience*/}
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px]'>
            <div className='w-full h-[300px] '>
              <h6 className='font-heading uppercase'>Skills & Interest</h6>
            </div>

            <div className='w-full h-[300px] '>
              <h6 className='font-heading uppercase'>Experience</h6>
            </div>

            <div className='w-full h-[300px] '>
              <h6 className='font-heading uppercase'>Education</h6>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex flex-col">
        <div className=' w-full justify-center flex flex-1'>
          <div className='bg-accent w-full max-w-screen-2xl px-[150px] flex flex-col gap-3 justify-center items-center'>
            <div className='flex flex-col items-center gap-5'>
              <HeadingReveal
                text="Adapt for Our Future"
                className="text-6xl md:text-8xl font-extrabold leading-none"
                delay={0.1}
                once
              />
              {mazita.map((zita) => (
                <motion.h1 
                  key={zita.id}
                  className='uppercase text-9xl text-[var(--text-white)] bg-[var(--foreground)] whitespace-nowrap overflow-hidden relative leading-none'

                  initial="initial"
                  whileHover="hovered"
                >
                  <motion.div
                    
                    variants={{
                      initial: { y: 0},
                      hovered: { y: "-100%"},
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1] 
                    }}
                  >
                    {zita.name}
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 bgamber-500"
                    variants={{
                      initial: { y: "100%"},
                      hovered: { y: 0},
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1] // same easing for fluid sync
                    }}
                  >
                    {zita.name}
                  </motion.div>
                  
                </motion.h1>
              ))}
            </div>
            
          </div>
        </div>
      </section>
  </main>
  )
}
