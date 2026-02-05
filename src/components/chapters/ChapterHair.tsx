 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const conditions = [
   'Androgenetic Alopecia',
   'Alopecia Areata',
   'Dandruff',
   'Hair Fall',
   'Scalp Infections',
 ];
 
 const treatments = [
   'PRP',
   'Stem Cell Therapy',
   'Mesotherapy',
   'Scalp Peels',
 ];
 
 const ChapterHair = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const follicleRef = useRef<SVGPathElement>(null);
   const conditionsRef = useRef<(HTMLLIElement | null)[]>([]);
   const treatmentsRef = useRef<(HTMLLIElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Pin section
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'top top',
         end: '+=800',
         pin: true,
         pinSpacing: true,
       });
 
       // Hair follicle grows with scroll
       if (follicleRef.current) {
         const length = follicleRef.current.getTotalLength();
         gsap.set(follicleRef.current, {
           strokeDasharray: length,
           strokeDashoffset: length,
         });
 
         gsap.to(follicleRef.current, {
           scrollTrigger: {
             trigger: sectionRef.current,
             start: 'top 30%',
             end: '+=600',
             scrub: 1,
           },
           strokeDashoffset: 0,
           duration: 2,
           ease: 'power2.out',
         });
       }
 
       // Conditions appear on left
       conditionsRef.current.forEach((item, index) => {
         if (item) {
           gsap.from(item, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${50 - index * 6}%`,
               end: `top ${30 - index * 6}%`,
               scrub: 1,
             },
             x: -50,
             opacity: 0,
             duration: 0.6,
             ease: 'power2.out',
           });
         }
       });
 
       // Treatments appear on right
       treatmentsRef.current.forEach((item, index) => {
         if (item) {
           gsap.from(item, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${45 - index * 8}%`,
               end: `top ${25 - index * 8}%`,
               scrub: 1,
             },
             x: 50,
             opacity: 0,
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
       style={{ background: 'var(--gradient-calm)' }}
     >
       <div className="chapter-content">
         <div className="text-center mb-16">
           <p className="text-tagline mb-4">Chapter 8</p>
           <h2 className="heading-chapter">Hair & Scalp Restoration</h2>
         </div>
 
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
           {/* Conditions - Left */}
           <div>
             <h3 className="heading-section text-lg mb-6">Conditions</h3>
             <ul className="space-y-4">
               {conditions.map((condition, index) => (
                 <li
                   key={condition}
                   ref={(el) => (conditionsRef.current[index] = el)}
                   className="flex items-center gap-3 text-body"
                 >
                   <div className="w-2 h-2 rounded-full bg-teal" />
                   {condition}
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Hair Follicle SVG - Center */}
           <div className="flex justify-center">
             <svg
               viewBox="0 0 100 200"
               className="w-32 h-64"
               fill="none"
             >
               {/* Follicle bulb */}
               <ellipse
                 cx="50"
                 cy="180"
                 rx="20"
                 ry="15"
                 fill="hsl(var(--champagne))"
                 opacity="0.3"
               />
               {/* Hair shaft growing upward */}
               <path
                 ref={follicleRef}
                 d="M50 180 Q45 140 50 100 Q55 60 50 20 Q48 10 50 5"
                 stroke="hsl(var(--teal-deep))"
                 strokeWidth="3"
                 strokeLinecap="round"
                 fill="none"
               />
               {/* Root sheath */}
               <path
                 d="M35 175 Q30 160 35 145"
                 stroke="hsl(var(--sage))"
                 strokeWidth="2"
                 strokeLinecap="round"
                 fill="none"
                 opacity="0.6"
               />
               <path
                 d="M65 175 Q70 160 65 145"
                 stroke="hsl(var(--sage))"
                 strokeWidth="2"
                 strokeLinecap="round"
                 fill="none"
                 opacity="0.6"
               />
             </svg>
           </div>
 
           {/* Treatments - Right */}
           <div>
             <h3 className="heading-section text-lg mb-6">Treatments</h3>
             <ul className="space-y-4">
               {treatments.map((treatment, index) => (
                 <li
                   key={treatment}
                   ref={(el) => (treatmentsRef.current[index] = el)}
                   className="flex items-center gap-3 text-body"
                 >
                   <div className="w-2 h-2 rounded-full bg-champagne" />
                   {treatment}
                 </li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterHair;