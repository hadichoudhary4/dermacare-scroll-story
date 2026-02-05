 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const aestheticServices = [
   'Hydra Facial',
   'Medi Facial',
   'Hollywood Facial',
   'Microneedling',
   'MNRF',
   'Fractional CO₂ Laser',
   'Chemical Peels',
   'Exosomes',
   'Stretch Marks Treatment',
 ];
 
 const ChapterAesthetic = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const gradientRef = useRef<HTMLDivElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Fluid gradient morph
       gsap.to(gradientRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top bottom',
           end: 'bottom top',
           scrub: true,
         },
         backgroundPosition: '100% 100%',
         ease: 'none',
       });
 
       // Cards scale in one by one
       cardsRef.current.forEach((card, index) => {
         if (card) {
           gsap.from(card, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${70 - index * 3}%`,
               end: `top ${50 - index * 3}%`,
               scrub: 1,
             },
             scale: 0.8,
             opacity: 0,
             duration: 0.6,
             ease: 'power2.out',
           });
 
           // Hover micro-motion (not scroll-driven)
           card.addEventListener('mouseenter', () => {
             gsap.to(card, {
               scale: 1.02,
               duration: 0.3,
               ease: 'power2.out',
             });
           });
           card.addEventListener('mouseleave', () => {
             gsap.to(card, {
               scale: 1,
               duration: 0.3,
               ease: 'power2.out',
             });
           });
         }
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section ref={sectionRef} className="chapter relative overflow-hidden">
       {/* Fluid gradient background */}
       <div
         ref={gradientRef}
         className="absolute inset-0"
         style={{
           background: `
             linear-gradient(135deg, 
               hsl(38 45% 72% / 0.1) 0%, 
               hsl(150 20% 88% / 0.15) 25%,
               hsl(175 35% 35% / 0.05) 50%,
               hsl(38 50% 85% / 0.1) 75%,
               hsl(30 20% 98%) 100%
             )
           `,
           backgroundSize: '200% 200%',
           backgroundPosition: '0% 0%',
         }}
       />
 
       <div className="chapter-content relative z-10">
         <div className="text-center mb-16">
           <p className="text-tagline mb-4">Chapter 6</p>
           <h2 className="heading-chapter">Aesthetic Transformation</h2>
           <p className="text-body mt-4 max-w-xl mx-auto">
             Luxury treatments for radiant, rejuvenated skin
           </p>
         </div>
 
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {aestheticServices.map((service, index) => (
             <div
               key={service}
               ref={(el) => (cardsRef.current[index] = el)}
               className="service-card cursor-pointer"
             >
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-champagne/30 to-champagne-light/20 flex items-center justify-center">
                   <span className="text-champagne font-display text-lg">
                     {String(index + 1).padStart(2, '0')}
                   </span>
                 </div>
                 <h3 className="font-display text-xl text-charcoal">
                   {service}
                 </h3>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterAesthetic;