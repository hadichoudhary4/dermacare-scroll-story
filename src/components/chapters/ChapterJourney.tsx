 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const journeySteps = [
   { title: 'Consultation', description: 'Personalized assessment of your needs' },
   { title: 'Customized Plan', description: 'Tailored treatment strategy' },
   { title: 'Procedure', description: 'Expert care with precision' },
   { title: 'Maintenance', description: 'Ongoing support for lasting results' },
 ];
 
 const ChapterJourney = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const lineRef = useRef<HTMLDivElement>(null);
   const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Timeline draws left to right
       gsap.from(lineRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 60%',
           end: 'center center',
           scrub: 1,
         },
         scaleX: 0,
         transformOrigin: 'left center',
         duration: 1,
         ease: 'power2.out',
       });
 
       // Steps highlight as line grows
       stepsRef.current.forEach((step, index) => {
         if (step) {
           const dot = step.querySelector('.timeline-dot');
           const content = step.querySelector('.step-content');
 
           gsap.from(dot, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${55 - index * 10}%`,
               end: `top ${40 - index * 10}%`,
               scrub: 1,
             },
             scale: 0,
             duration: 0.4,
             ease: 'power2.out',
           });
 
           gsap.from(content, {
             scrollTrigger: {
               trigger: sectionRef.current,
               start: `top ${50 - index * 10}%`,
               end: `top ${35 - index * 10}%`,
               scrub: 1,
             },
             y: 20,
             opacity: 0,
             duration: 0.5,
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
         <div className="text-center mb-20">
           <p className="text-tagline mb-4">Chapter 11</p>
           <h2 className="heading-chapter">Your Patient Journey</h2>
         </div>
 
         <div className="relative max-w-4xl mx-auto">
           {/* Timeline line */}
           <div
             ref={lineRef}
             className="timeline-line absolute top-8 left-0 right-0 hidden md:block"
           />
 
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {journeySteps.map((step, index) => (
               <div
                 key={step.title}
                 ref={(el) => (stepsRef.current[index] = el)}
                 className="relative text-center"
               >
                 <div className="timeline-dot mx-auto mb-6 relative z-10" />
                 <div className="step-content">
                   <h3 className="font-display text-xl text-charcoal mb-2">
                     {step.title}
                   </h3>
                   <p className="text-sm text-slate">{step.description}</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterJourney;