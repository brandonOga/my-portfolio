'use client';

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const technicalSkills = [
  'Responsive Design',
  'Visual Design',
  'WordPress',
  'Prototyping',
  'Wireframing',
  'Next Js',
  'Tailwind CSS',
];

const softSkills = [
  'Journey Mapping',
  'User Research',
  'Communication',
  'Collaboration',
  'Problem Solving',
];

const PillScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);

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

  // Pause physics when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.positionIterations = 20;
    engine.velocityIterations = 20;
    engine.enableSleeping = true;

    const runner = Runner.create();
    const width = dimensions.width;

    if (sceneRef.current) sceneRef.current.innerHTML = '';

    // Pills
    const pills: (Matter.Body & { renderData: { width: number; height: number } })[] = [];
    const pillEls: HTMLDivElement[] = [];
    const allSkills = [...technicalSkills, ...softSkills];

    const topPadding = 20;
    const horizontalPadding = 20;

    allSkills.forEach((label) => {
      const pillDiv = document.createElement('div');
      pillDiv.innerText = label;
      pillDiv.className =
        'absolute w-auto px-[20px] py-[10px] rounded-full flex items-center justify-center text-xl pointer-events-none select-none';

      const useSolidBg = Math.random() < 0.5;
      if (useSolidBg) {
        pillDiv.style.background = '#242124';
        pillDiv.style.color = '#FFFFFF';
        pillDiv.style.border = 'none';
      } else {
        pillDiv.style.background = '#F5F5F4';
        pillDiv.style.color = '#242124';
        pillDiv.style.border = '2px solid #242124';
      }

      pillDiv.style.visibility = 'hidden';
      sceneRef.current!.appendChild(pillDiv);

      const rect = pillDiv.getBoundingClientRect();
      const pillWidth = rect.width;
      const pillHeight = rect.height;

      // Start near top with random X
      const x = Math.random() * (width - pillWidth - horizontalPadding) + pillWidth / 2 + horizontalPadding / 2;
      const y = topPadding + Math.random() * 50;

      const pillBody = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        restitution: 0.1,
        friction: 0.8,
        frictionStatic: 1,
        density: 0.002,
        chamfer: { radius: 25 },
        sleepThreshold: 60,
      }) as Matter.Body & { renderData: { width: number; height: number } };

      pillBody.renderData = { width: pillWidth, height: pillHeight };

      pills.push(pillBody);
      pillEls.push(pillDiv);
      pillDiv.style.visibility = 'visible';
    });

    // Estimate initial container height
    const initialHeight = 200;
    if (containerRef.current && sceneRef.current) {
      containerRef.current.style.height = `${initialHeight}px`;
      sceneRef.current.style.height = '100%';
    }

    // Walls
    const thickness = 100;
    const ground = Bodies.rectangle(width / 2, initialHeight + thickness / 2, width, thickness, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true });
    const leftWall = Bodies.rectangle(-thickness / 2, initialHeight / 2, thickness, initialHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(width + thickness / 2, initialHeight / 2, thickness, initialHeight, { isStatic: true });

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...pills]);

    // Mouse drag
    const mouse = Mouse.create(sceneRef.current!);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mouseConstraint);

    // Animation loop
    let animationId: number;
    const update = () => {
      let maxY = 0;

      pills.forEach((pill, i) => {
        const { position, angle, speed, renderData } = pill;
        if (speed > 0.01) {
          const el = pillEls[i];
          el.style.transform = `translate(${position.x - renderData.width / 2}px, ${
            position.y - renderData.height / 2
          }px) rotate(${angle}rad)`;
        }
        const bottom = position.y + renderData.height / 2;
        if (bottom > maxY) maxY = bottom;
      });

      // Dynamically adjust container height
      if (containerRef.current) {
        containerRef.current.style.height = `${maxY + 20}px`;
      }

      animationId = requestAnimationFrame(update);
    };

    if (isVisible) {
      Runner.run(runner, engine);
      update();
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      Body.setPosition(ground, { x: rect.width / 2, y: rect.height + thickness / 2 });
      Body.setPosition(ceiling, { x: rect.width / 2, y: -thickness / 2 });
      Body.setPosition(leftWall, { x: -thickness / 2, y: rect.height / 2 });
      Body.setPosition(rightWall, { x: rect.width + thickness / 2, y: rect.height / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      Runner.stop(runner);
      pillEls.forEach((el) => el.remove());
    };
  }, [dimensions, isVisible]);

  return (
    <div ref={containerRef} className="w-full relative">
      <div ref={sceneRef} className="relative w-full h-full overflow-hidden" />
    </div>
  );
};

export default PillScene;
