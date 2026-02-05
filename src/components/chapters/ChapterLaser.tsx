 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const laserServices = [
   { title: 'Tattoo Removal', side: 'left' },
   { title: 'Birthmark Removal', side: 'right' },
   { title: 'Glow Laser', side: 'left' },
   { title: 'Laser Hair Reduction', side: 'right' },
   { title: 'Carbon Facial', side: 'left' },
   { title: 'Laser Toning', side: 'right' },
 ];
 
 const ChapterLaser = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const beamRef = useRef<SVGLineElement>(null);
   const pulseRef = useRef<SVGCircleElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Pin section
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'top top',
         end: `+=${laserServices.length * 120}`,
         pin: true,
         pinSpacing: true,
       });
 
       // Laser beam draws downward
       const beamTl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 60%',
           end: 'top 20%',
           scrub: 1,
         },
       });
 
       beamTl.from(beamRef.current, {
         strokeDashoffset: 300,
         duration: 1,
         ease: 'power2.out',
       });
 
       // Pulse animation synchronized with scroll
       gsap.to(pulseRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 50%',
           end: 'bottom top',
           scrub: true,
         },
         r: 30,
         opacity: 0,
         repeat: -1,
         yoyo: true,
         ease: 'power2.inOut',
       });
 
       // Cards slide in from alternating sides
       cardsRef.current.forEach((card, index) => {
         if (card) {
           const isLeft = laserServices[index].side === 'left';
           gsap.from(card, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${40 - index * 5}%`,
               end: `top ${20 - index * 5}%`,
               scrub: 1,
             },
             x: isLeft ? -100 : 100,
             opacity: 0,
             duration: 0.8,
             ease: 'power2.out',
           });
         }
       });
 
       // Exit fade
       gsap.to([beamRef.current, pulseRef.current], {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'bottom 60%',
           end: 'bottom 30%',
           scrub: 1,
         },
         opacity: 0,
         ease: 'power2.out',
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter relative overflow-hidden"
       style={{
         background:
           'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(175 35% 35% / 0.05) 50%, hsl(var(--background)) 100%)',
       }}
     >
       {/* Laser beam SVG */}
       <svg
         className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-4 pointer-events-none z-0"
         viewBox="0 0 16 400"
         preserveAspectRatio="none"
       >
         <defs>
           <linearGradient id="laserGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="hsl(175 35% 35%)" stopOpacity="1" />
             <stop offset="100%" stopColor="hsl(38 45% 72%)" stopOpacity="0.5" />
           </linearGradient>
         </defs>
         <line
           ref={beamRef}
           x1="8"
           y1="0"
           x2="8"
           y2="400"
           stroke="url(#laserGradient)"
           strokeWidth="2"
           strokeDasharray="300"
           strokeDashoffset="0"
         />
         <circle
           ref={pulseRef}
           cx="8"
           cy="200"
           r="8"
           fill="hsl(175 35% 35%)"
           opacity="0.6"
         />
       </svg>
 
       <div className="chapter-content relative z-10">
         <div className="text-center mb-16">
           <p className="text-tagline mb-4">Chapter 5</p>
           <h2 className="heading-chapter">Laser Science in Motion</h2>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
           {laserServices.map((service, index) => (
             <div
               key={service.title}
               ref={(el) => (cardsRef.current[index] = el)}
               className={`service-card ${
                 service.side === 'right' ? 'md:translate-y-8' : ''
               }`}
             >
               <div className="flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal to-champagne animate-pulse" />
                 <h3 className="font-display text-xl text-charcoal">
                   {service.title}
                 </h3>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterLaser;