 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const conditions = [
   'Acne, Acne Marks',
   'Eczema, Rosacea',
   'Psoriasis, Lichen Planus',
   'Skin Infections & Allergies',
   'Pigmentation Disorders',
   'Autoimmune Diseases',
   'Pediatric Dermatology',
   'STDs',
 ];
 
 const ChapterClinical = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
   const bgRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Pin section during scroll
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'top top',
         end: `+=${conditions.length * 100}`,
         pin: true,
         pinSpacing: true,
       });
 
       // Title animation
       gsap.from(titleRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 80%',
           end: 'top 40%',
           scrub: 1,
         },
         y: 50,
         opacity: 0,
         ease: 'power2.out',
       });
 
       // Staggered item reveals
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 30%',
           end: `+=${conditions.length * 80}`,
           scrub: 1,
         },
       });
 
       itemsRef.current.forEach((item, index) => {
         if (item) {
           tl.from(
             item,
             {
               y: 30,
               opacity: 0,
               duration: 0.5,
               ease: 'power2.out',
             },
             index * 0.1
           );
         }
       });
 
       // Subtle background texture shift
       gsap.to(bgRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top bottom',
           end: 'bottom top',
           scrub: true,
         },
         backgroundPosition: '100% 100%',
         ease: 'none',
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter"
       style={{ background: 'hsl(var(--sage-light))' }}
     >
       {/* Texture background */}
       <div
         ref={bgRef}
         className="absolute inset-0 opacity-30"
         style={{
           backgroundImage: `
             radial-gradient(circle at 20% 30%, hsl(175 35% 35% / 0.1) 0%, transparent 40%),
             radial-gradient(circle at 80% 70%, hsl(38 45% 72% / 0.1) 0%, transparent 40%)
           `,
           backgroundSize: '200% 200%',
           backgroundPosition: '0% 0%',
         }}
       />
 
       <div className="chapter-content relative z-10">
         <div className="text-center mb-12">
           <p className="text-tagline mb-4">Chapter 4</p>
           <h2 ref={titleRef} className="heading-chapter">
             Clinical Dermatology
           </h2>
           <p className="text-body mt-4 max-w-xl mx-auto">
             Comprehensive medical care for all skin conditions
           </p>
         </div>
 
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
           {conditions.map((condition, index) => (
             <div
               key={condition}
               ref={(el) => (itemsRef.current[index] = el)}
               className="service-card text-center group"
             >
               <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                 <div className="w-2 h-2 rounded-full bg-teal" />
               </div>
               <p className="font-display text-lg text-charcoal">{condition}</p>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterClinical;