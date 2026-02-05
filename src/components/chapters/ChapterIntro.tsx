 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const ChapterIntro = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const logoRef = useRef<HTMLHeadingElement>(null);
   const taglineRef = useRef<HTMLParagraphElement>(null);
   const subtitleRef = useRef<HTMLParagraphElement>(null);
   const founderRef = useRef<HTMLParagraphElement>(null);
   const gradientRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Animate gradient background
       gsap.to(gradientRef.current, {
         backgroundPosition: '100% 100%',
         duration: 20,
         repeat: -1,
         yoyo: true,
         ease: 'none',
       });
 
       // Split logo text for letter animation
       const logoText = logoRef.current;
       if (logoText) {
         const text = logoText.textContent || '';
         logoText.innerHTML = text
           .split('')
           .map((char) => `<span class="inline-block opacity-0">${char}</span>`)
           .join('');
 
         const letters = logoText.querySelectorAll('span');
 
         // Initial animation timeline
         const tl = gsap.timeline({ delay: 0.5 });
 
         tl.to(letters, {
           opacity: 1,
           y: 0,
           stagger: 0.08,
           duration: 0.6,
           ease: 'power2.out',
           from: { y: 30 },
         })
           .from(
             taglineRef.current,
             {
               opacity: 0,
               y: 20,
               duration: 0.8,
               ease: 'power2.out',
             },
             '-=0.3'
           )
           .from(
             subtitleRef.current,
             {
               opacity: 0,
               y: 20,
               duration: 0.8,
               ease: 'power2.out',
             },
             '-=0.5'
           )
           .from(
             founderRef.current,
             {
               opacity: 0,
               y: 20,
               duration: 0.8,
               ease: 'power2.out',
             },
             '-=0.5'
           );
       }
 
       // Scroll-triggered exit animation
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'top top',
         end: 'bottom top',
         pin: true,
         pinSpacing: true,
         scrub: 1,
         onUpdate: (self) => {
           const progress = self.progress;
           gsap.to(sectionRef.current?.querySelector('.intro-content'), {
             opacity: 1 - progress,
             scale: 1 - progress * 0.1,
             duration: 0,
           });
         },
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section ref={sectionRef} className="chapter relative overflow-hidden">
       {/* Animated gradient background */}
       <div
         ref={gradientRef}
         className="absolute inset-0 opacity-60"
         style={{
           background: `
             radial-gradient(ellipse at 20% 20%, hsl(175 35% 35% / 0.08) 0%, transparent 50%),
             radial-gradient(ellipse at 80% 80%, hsl(38 45% 72% / 0.12) 0%, transparent 50%),
             radial-gradient(ellipse at 50% 50%, hsl(150 20% 88% / 0.1) 0%, transparent 70%)
           `,
           backgroundSize: '200% 200%',
         }}
       />
 
       {/* Decorative elements */}
       <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-champagne/10 blur-3xl" />
       <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-teal/5 blur-3xl" />
 
       <div className="intro-content chapter-content relative z-10 text-center">
         <h1 ref={logoRef} className="heading-hero mb-8">
           Dermacare
         </h1>
 
         <p ref={taglineRef} className="text-tagline mb-6">
           Dermatology | Aesthetic | Hair
         </p>
 
         <p
           ref={subtitleRef}
           className="text-body-large max-w-2xl mx-auto mb-8 italic font-display text-slate"
         >
           The Intersection of Clinical Precision and Artful Aesthetics
         </p>
 
         <p ref={founderRef} className="text-body text-muted-foreground">
           Founded by{' '}
           <span className="text-gradient-gold font-medium">
             Dr. Foram Pathak Dave
           </span>
         </p>
 
         {/* Scroll indicator */}
         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <span className="text-xs uppercase tracking-widest text-muted-foreground">
             Scroll to explore
           </span>
           <div className="w-px h-12 bg-gradient-to-b from-champagne to-transparent" />
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterIntro;