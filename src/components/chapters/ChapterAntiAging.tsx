 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const antiAgingServices = [
   { title: 'Botox', icon: 'M10 5 L10 15 M5 10 L15 10' },
   { title: 'Fillers', icon: 'M10 3 Q3 10 10 17 Q17 10 10 3' },
   { title: 'Biostimulators', icon: 'M5 10 A5 5 0 1 1 15 10 A5 5 0 1 1 5 10' },
   { title: 'Thread Lift', icon: 'M5 15 Q10 5 15 15' },
   { title: 'Non-Surgical Skin Tightening', icon: 'M5 8 L15 8 M5 12 L15 12' },
 ];
 
 const ChapterAntiAging = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const iconsRef = useRef<(SVGSVGElement | null)[]>([]);
   const textsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // SVG icons draw themselves
       iconsRef.current.forEach((icon, index) => {
         if (icon) {
           const paths = icon.querySelectorAll('path');
           paths.forEach((path) => {
             const length = (path as SVGPathElement).getTotalLength?.() || 50;
             gsap.set(path, {
               strokeDasharray: length,
               strokeDashoffset: length,
             });
 
             gsap.to(path, {
               scrollTrigger: {
                 trigger: sectionRef.current,
                 start: `top ${60 - index * 8}%`,
                 end: `top ${40 - index * 8}%`,
                 scrub: 1,
               },
               strokeDashoffset: 0,
               duration: 1,
               ease: 'power2.out',
             });
           });
         }
       });
 
       // Text fades after icon completion
       textsRef.current.forEach((text, index) => {
         if (text) {
           gsap.from(text, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${55 - index * 8}%`,
               end: `top ${35 - index * 8}%`,
               scrub: 1,
             },
             opacity: 0,
             x: 20,
             duration: 0.6,
             ease: 'power2.out',
           });
         }
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter"
       style={{ background: 'var(--gradient-luxury)' }}
     >
       <div className="chapter-content">
         <div className="text-center mb-16">
           <p className="text-tagline mb-4">Chapter 7</p>
           <h2 className="heading-chapter">Anti-Aging & Injectables</h2>
           <p className="text-body mt-4 max-w-xl mx-auto">
             Turn back time with precision treatments
           </p>
         </div>
 
         <div className="max-w-3xl mx-auto space-y-8">
           {antiAgingServices.map((service, index) => (
             <div
               key={service.title}
               className="flex items-center gap-8 group"
             >
               <svg
                 ref={(el) => (iconsRef.current[index] = el)}
                 viewBox="0 0 20 20"
                 className="w-16 h-16 flex-shrink-0"
                 fill="none"
               >
                 <circle
                   cx="10"
                   cy="10"
                   r="9"
                   stroke="hsl(var(--champagne))"
                   strokeWidth="0.5"
                   opacity="0.5"
                 />
                 <path
                   d={service.icon}
                   stroke="hsl(var(--teal-medium))"
                   strokeWidth="1.5"
                   strokeLinecap="round"
                   fill="none"
                 />
               </svg>
               <div ref={(el) => (textsRef.current[index] = el)}>
                 <h3 className="font-display text-2xl text-charcoal group-hover:text-teal transition-colors">
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
 
 export default ChapterAntiAging;