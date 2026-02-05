 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const reasons = [
   { title: 'Doctor-Led Practice', icon: '👨‍⚕️' },
   { title: 'Comprehensive Care', icon: '🏥' },
   { title: 'Advanced Technology', icon: '⚡' },
   { title: 'Holistic Approach', icon: '🌿' },
 ];
 
 const ChapterWhy = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const checksRef = useRef<(HTMLDivElement | null)[]>([]);
   const badgeRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Checkmarks animate in
       checksRef.current.forEach((check, index) => {
         if (check) {
           const checkmark = check.querySelector('.checkmark');
           const text = check.querySelector('.reason-text');
 
           gsap.from(checkmark, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${60 - index * 8}%`,
               end: `top ${45 - index * 8}%`,
               scrub: 1,
             },
             scale: 0,
             rotation: -180,
             duration: 0.5,
             ease: 'power2.out',
           });
 
           gsap.from(text, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${58 - index * 8}%`,
               end: `top ${43 - index * 8}%`,
               scrub: 1,
             },
             x: -20,
             opacity: 0,
             duration: 0.4,
             ease: 'power2.out',
           });
         }
       });
 
       // Badge rotates slowly
       gsap.to(badgeRef.current, {
         rotation: 360,
         duration: 20,
         repeat: -1,
         ease: 'none',
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter"
       style={{ background: 'var(--gradient-medical)' }}
     >
       <div className="chapter-content">
         <div className="grid md:grid-cols-2 gap-16 items-center">
           <div>
             <p className="text-tagline mb-4">Chapter 12</p>
             <h2 className="heading-chapter mb-12">Why Dermacare?</h2>
 
             <div className="space-y-8">
               {reasons.map((reason, index) => (
                 <div
                   key={reason.title}
                   ref={(el) => (checksRef.current[index] = el)}
                   className="flex items-center gap-6"
                 >
                   <div className="checkmark w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
                     <svg
                       viewBox="0 0 24 24"
                       className="w-6 h-6"
                       fill="none"
                       stroke="hsl(var(--teal-medium))"
                       strokeWidth="2.5"
                     >
                       <path
                         d="M5 13l4 4L19 7"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                       />
                     </svg>
                   </div>
                   <span className="reason-text font-display text-xl text-charcoal">
                     {reason.title}
                   </span>
                 </div>
               ))}
             </div>
           </div>
 
           <div className="flex justify-center">
             <div
               ref={badgeRef}
               className="relative w-48 h-48 md:w-64 md:h-64"
             >
               <svg viewBox="0 0 200 200" className="w-full h-full">
                 {/* Outer ring */}
                 <circle
                   cx="100"
                   cy="100"
                   r="90"
                   fill="none"
                   stroke="hsl(var(--champagne))"
                   strokeWidth="2"
                   strokeDasharray="8 4"
                 />
                 {/* Inner circle */}
                 <circle
                   cx="100"
                   cy="100"
                   r="70"
                   fill="hsl(var(--teal-medium))"
                   opacity="0.1"
                 />
                 {/* Center emblem */}
                 <circle
                   cx="100"
                   cy="100"
                   r="50"
                   fill="hsl(var(--champagne))"
                   opacity="0.2"
                 />
                 {/* Medical cross */}
                 <rect x="92" y="70" width="16" height="60" rx="2" fill="hsl(var(--teal-deep))" />
                 <rect x="70" y="92" width="60" height="16" rx="2" fill="hsl(var(--teal-deep))" />
               </svg>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterWhy;