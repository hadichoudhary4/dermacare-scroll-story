 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const surgicalServices = [
   'Excision & Biopsy',
   'Wart & Skin Tag Removal',
   'Ear Lobe Repair',
   'Nail Surgery',
   'Double Chin Treatment',
   'Stretch Marks Treatment',
 ];
 
 const ChapterSurgical = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Minimal motion - fade + slight scale
       cardsRef.current.forEach((card, index) => {
         if (card) {
           gsap.from(card, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${70 - index * 5}%`,
               end: `top ${50 - index * 5}%`,
               scrub: 1,
             },
             opacity: 0,
             scale: 0.95,
             duration: 0.6,
             ease: 'power2.out',
           });
         }
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section ref={sectionRef} className="chapter">
       <div className="chapter-content">
         <div className="text-center mb-16">
           <p className="text-tagline mb-4">Chapter 9</p>
           <h2 className="heading-chapter">Surgical & Body Care</h2>
           <p className="text-body mt-4 max-w-xl mx-auto">
             Precision procedures with trusted results
           </p>
         </div>
 
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
           {surgicalServices.map((service, index) => (
             <div
               key={service}
               ref={(el) => (cardsRef.current[index] = el)}
               className="service-card text-center"
             >
               <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                 <svg
                   viewBox="0 0 24 24"
                   className="w-6 h-6"
                   fill="none"
                   stroke="hsl(var(--teal-medium))"
                   strokeWidth="1.5"
                 >
                   <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                   <circle cx="12" cy="12" r="10" />
                 </svg>
               </div>
               <h3 className="font-display text-lg text-charcoal">{service}</h3>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterSurgical;