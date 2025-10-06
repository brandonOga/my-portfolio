'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

type SocialPill = {
  label: string;
  url: string;
  iconKey: 'email' | 'phone' | 'linkedin' | 'dribbble';
};

const socialPills: SocialPill[] = [
  { label: 'drop me a line', url: 'mailto:brandoneemupemhi@gmail.com', iconKey: 'email' },
  { label: 'ring me up', url: 'tel:+263776382111', iconKey: 'phone' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/brandon-mupemhi-697007230/', iconKey: 'linkedin' },
  { label: 'Dribbble', url: 'https://dribbble.com/OGA_01', iconKey: 'dribbble' },
];

// Helper: returns SVG path strings for each icon key
const IconToSvgString = (key: string) => {
  switch (key) {
    case 'email':
      return `<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16
        c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>`;
    case 'phone':
      return `<path d="M6.62 10.79a15.466 15.466 0 006.59 6.59l2.2-2.2a1
        1 0 011.11-.21c1.21.48 2.53.75 3.88.75a1 1 0 011 1v3.5a1
        1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011
        1c0 1.35.27 2.67.75 3.88a1 1 0 01-.21 1.11l-2.42 2.42z"/>`;
    case 'linkedin':
      return `<path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5
        5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3a1.75
        1.75 0 110-3.5 1.75 1.75 0 010 3.5zm13.5 10.3h-3v-4.5c0-1.1-.9-2-2-2s-2
        .9-2 2v4.5h-3v-9h3v1.5a3.5 3.5 0 016 3v4.5z"/>`;
    case 'dribbble':
        return `<path d="M16.457 22.06c-.623-3.072-1.435-5.923-2.496-8.63c-3.412.865-5.972 3.14-8.886 7.117A10.95 10.95 0 0 0 12 23c1.587 0 3.095-.336 4.457-.94m1.38-.735a11 11 0 0 0 5.044-7.7c-2.978-.588-5.379-.742-7.421-.478c.994 2.583 1.77 5.29 2.377 8.178M23 12.12V12c0-2.651-.938-5.083-2.5-6.983c-1.833 2.115-3.915 3.574-6.585 4.575q.51 1.049.966 2.122c2.31-.359 4.95-.207 8.118.406Zm-3.534-8.2A10.96 10.96 0 0 0 12 1a11 11 0 0 0-3.175.465a47 47 0 0 1 4.405 6.781c2.56-.932 4.505-2.295 6.235-4.326ZM7.358 2.025a11.02 11.02 0 0 0-6.193 8.064c4.467-.214 7.875-.61 10.613-1.378a45.7 45.7 0 0 0-4.42-6.686m-6.35 9.573c4.758-.22 8.46-.641 11.47-1.528q.479.97.906 1.96c-3.754 1.017-6.51 3.552-9.414 7.488a10.96 10.96 0 0 1-2.963-7.92Z""/>`;
    default:
      return '';
  }
};

const SocialPills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;
    const engine = Engine.create();
    const runner = Runner.create();

    const width = dimensions.width;
    const height = dimensions.height;

    if (sceneRef.current) sceneRef.current.innerHTML = '';

    const thickness = 100;
    const ground = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true });
    const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true });

    const pills: Matter.Body[] = [];
    const pillEls: HTMLAnchorElement[] = [];

    socialPills.forEach(({ label, url, iconKey }) => {
      const pillLink = document.createElement('a');
      pillLink.href = url;
      pillLink.target = url.startsWith('mailto:') || url.startsWith('tel:') ? '_self' : '_blank';
      pillLink.rel = url.startsWith('mailto:') || url.startsWith('tel:') ? '' : 'noopener noreferrer';

      pillLink.className =
        'absolute flex items-center gap-[15px] px-[30px] py-[15px] rounded-full cursor-pointer text-4xl uppercase select-none font-semibold ' +
        'border-2 border-[#242124] bg-[#F5F5F4] text-[#242124] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white transition-colors duration-300';

      pillLink.innerHTML = `<svg style="width:40px; height:40px;" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">${IconToSvgString(iconKey)}</svg> <span>${label}</span>`;

      sceneRef.current!.appendChild(pillLink);

      const rect = pillLink.getBoundingClientRect();
      const pillWidth = rect.width;
      const pillHeight = rect.height;

      const x = Math.random() * (width - pillWidth) + pillWidth / 2;
      const y = Math.random() * (height - pillHeight) + pillHeight / 2;

      const pillBody = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.9,
        chamfer: { radius: 25 },
        label,
      });

      pills.push(pillBody);
      pillEls.push(pillLink);
    });

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...pills]);

    const mouse = Mouse.create(sceneRef.current!);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);

    Runner.run(runner, engine);

    let animationId: number;
    const update = () => {
      pills.forEach((pill, i) => {
        const { position, angle } = pill;
        const el = pillEls[i];
        const rect = el.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        el.style.transform = `translate(${position.x - w / 2}px, ${position.y - h / 2}px) rotate(${angle}rad)`;
      });
      animationId = requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      Body.setPosition(ground, { x: rect.width / 2, y: rect.height + thickness / 2 });
      Body.setPosition(ceiling, { x: rect.width / 2, y: -thickness / 2 });
      Body.setPosition(leftWall, { x: -thickness / 2, y: rect.height / 2 });
      Body.setPosition(rightWall, { x: rect.width + thickness / 2, y: rect.height / 2 });

      Body.setVertices(ground, [
        { x: 0, y: rect.height },
        { x: rect.width, y: rect.height },
        { x: rect.width, y: rect.height + thickness },
        { x: 0, y: rect.height + thickness },
      ]);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      Runner.stop(runner);
      pillEls.forEach(el => el.remove());
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={sceneRef} className="relative w-full h-[300px] overflow-hidden" />
    </div>
  );
};

export default SocialPills;
