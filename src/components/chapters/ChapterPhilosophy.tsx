 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const philosophyItems = [
   {
     title: 'Restore',
     subtitle: 'Medical Dermatology',
     className: 'circle-restore',
   },
   {
     title: 'Correct',
     subtitle: 'Laser & Advanced Technology',
     className: 'circle-correct',
   },
   {
     title: 'Enhance',
     subtitle: 'Aesthetic & Anti-Aging Care',
     className: 'circle-enhance',
   },
 ];
 
 const ChapterPhilosophy = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const circlesRef = useRef<(HTMLDivElement | null)[]>([]);
   const glowRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 60%',
           end: 'center center',
           scrub: 1,
         },
       });
 
       // Circles scale in sequentially
       circlesRef.current.forEach((circle, index) => {
         if (circle) {
           tl.from(
             circle,
             {
               scale: 0,
               opacity: 0,
               duration: 0.6,
               ease: 'power2.out',
             },
             index * 0.2
           );
         }
       });
 
       // Glow effect in the center
       tl.to(
         glowRef.current,
         {
           opacity: 0.6,
           scale: 1.2,
           duration: 0.8,
           ease: 'power2.out',
         },
         '-=0.3'
       );
 
       // Exit animation - circles merge slightly
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'center center',
         end: 'bottom top',
         scrub: 1,
         onUpdate: (self) => {
           const progress = self.progress;
           circlesRef.current.forEach((circle, index) => {
             if (circle) {
               const direction = index === 0 ? 1 : index === 2 ? -1 : 0;
               gsap.to(circle, {
                 x: direction * progress * 30,
                 duration: 0,
               });
             }
           });
         },
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section ref={sectionRef} className="chapter">
       <div className="chapter-content text-center">
         <h2 className="heading-chapter mb-16">
           <span className="text-gradient-teal">Restore</span>
           <span className="mx-4 text-muted-foreground">–</span>
           <span className="text-gradient-teal">Correct</span>
           <span className="mx-4 text-muted-foreground">–</span>
           <span className="text-gradient-teal">Enhance</span>
         </h2>
 
         <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
           {/* Center glow */}
           <div
             ref={glowRef}
             className="absolute inset-0 m-auto w-32 h-32 rounded-full opacity-0"
             style={{
               background:
                 'radial-gradient(circle, hsl(175 35% 35% / 0.3), transparent)',
               filter: 'blur(30px)',
             }}
           />
 
           {philosophyItems.map((item, index) => (
             <div
               key={item.title}
               ref={(el) => (circlesRef.current[index] = el)}
               className={`philosophy-circle ${item.className} ${
                 index === 1 ? 'md:-mx-8 z-10' : ''
               }`}
             >
               <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-2">
                 {item.title}
               </h3>
               <p className="text-sm text-slate px-4">{item.subtitle}</p>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterPhilosophy;