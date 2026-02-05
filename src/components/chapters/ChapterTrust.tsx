 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const ChapterTrust = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const illustrationRef = useRef<HTMLDivElement>(null);
   const textRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       const tl = gsap.timeline({
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 80%',
           end: 'center center',
           scrub: 1,
         },
       });
 
       // Illustration slides in from left
       tl.from(illustrationRef.current, {
         x: -100,
         opacity: 0,
         duration: 1,
         ease: 'power2.out',
       });
 
       // Text reveals line by line
       const textElements = textRef.current?.querySelectorAll('.reveal-text');
       if (textElements) {
         tl.from(
           textElements,
           {
             y: 40,
             opacity: 0,
             stagger: 0.2,
             duration: 0.8,
             ease: 'power2.out',
           },
           '-=0.5'
         );
       }
 
       // Floating animation for illustration
       gsap.to(illustrationRef.current, {
         y: -15,
         duration: 3,
         repeat: -1,
         yoyo: true,
         ease: 'sine.inOut',
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
       <div className="chapter-content grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
         {/* Doctor Illustration */}
         <div ref={illustrationRef} className="relative order-2 lg:order-1">
           <div className="relative w-full max-w-md mx-auto">
             {/* Abstract doctor representation */}
             <svg
               viewBox="0 0 400 500"
               className="w-full h-auto"
               fill="none"
             >
               {/* Background circle */}
               <circle
                 cx="200"
                 cy="250"
                 r="180"
                 fill="url(#trustGradient)"
                 opacity="0.3"
               />
               {/* Stethoscope abstract */}
               <path
                 d="M150 200 Q 120 280 180 320 Q 220 350 260 300"
                 stroke="hsl(175 35% 35%)"
                 strokeWidth="3"
                 fill="none"
                 strokeLinecap="round"
               />
               <circle cx="260" cy="300" r="20" fill="hsl(175 35% 35%)" />
               {/* Medical cross */}
               <rect
                 x="185"
                 y="150"
                 width="30"
                 height="80"
                 rx="4"
                 fill="hsl(38 45% 72%)"
               />
               <rect
                 x="160"
                 y="175"
                 width="80"
                 height="30"
                 rx="4"
                 fill="hsl(38 45% 72%)"
               />
               {/* Decorative elements */}
               <circle cx="100" cy="150" r="8" fill="hsl(150 20% 75%)" />
               <circle cx="320" cy="180" r="6" fill="hsl(38 50% 85%)" />
               <circle cx="280" cy="400" r="10" fill="hsl(175 30% 50% / 0.5)" />
               <defs>
                 <radialGradient id="trustGradient">
                   <stop offset="0%" stopColor="hsl(175 35% 35%)" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="hsl(150 20% 88%)" stopOpacity="0.1" />
                 </radialGradient>
               </defs>
             </svg>
           </div>
         </div>
 
         {/* Text Content */}
         <div ref={textRef} className="order-1 lg:order-2">
           <h2 className="reveal-text heading-chapter mb-8">
             Expertise You Can Trust
           </h2>
           <p className="reveal-text text-body-large mb-6">
             Doctor-led dermatology rooted in medical science, combining clinical
             dermatology with modern aesthetics for safe, effective results.
           </p>
           <div className="reveal-text flex items-center gap-4 mt-8">
             <div className="w-16 h-px bg-champagne" />
             <span className="text-tagline">Medical Excellence</span>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterTrust;