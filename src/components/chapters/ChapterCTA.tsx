 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const ChapterCTA = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);
   const glowRef = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Calm fade-in
       gsap.from(contentRef.current, {
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top 70%',
           end: 'top 30%',
           scrub: 1,
         },
         opacity: 0,
         y: 40,
         duration: 1,
         ease: 'power2.out',
       });
 
       // Soft glow animation
       gsap.to(glowRef.current, {
         scale: 1.2,
         opacity: 0.8,
         duration: 4,
         repeat: -1,
         yoyo: true,
         ease: 'sine.inOut',
       });
 
       // Scroll slows effect (visual indication)
       ScrollTrigger.create({
         trigger: sectionRef.current,
         start: 'top top',
         end: 'bottom bottom',
         onUpdate: (self) => {
           // Visual slowdown effect at the end
           if (self.progress > 0.8) {
             gsap.to(contentRef.current, {
               scale: 1 + (self.progress - 0.8) * 0.1,
               duration: 0.1,
             });
           }
         },
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter relative"
       style={{ minHeight: '100vh' }}
     >
       {/* Background glow */}
       <div
         ref={glowRef}
         className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
       />
 
       <div ref={contentRef} className="chapter-content relative z-10 text-center">
         <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-charcoal mb-8">
           Your Skin.{' '}
           <span className="text-gradient-teal">Our Science.</span>
         </h2>
 
         <p className="text-body-large max-w-xl mx-auto mb-16">
           Begin your journey to healthier, more radiant skin with Dermacare
         </p>
 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
           {/* Clinic Address */}
           <div className="text-center">
             <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
               <svg
                 viewBox="0 0 24 24"
                 className="w-6 h-6"
                 fill="none"
                 stroke="hsl(var(--teal-medium))"
                 strokeWidth="1.5"
               >
                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                 <circle cx="12" cy="9" r="2.5" />
               </svg>
             </div>
             <h4 className="font-display text-lg text-charcoal mb-2">Location</h4>
             <p className="text-sm text-slate">
               [Clinic Address]<br />
               Your City, State
             </p>
           </div>
 
           {/* Phone */}
           <div className="text-center">
             <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
               <svg
                 viewBox="0 0 24 24"
                 className="w-6 h-6"
                 fill="none"
                 stroke="hsl(var(--teal-medium))"
                 strokeWidth="1.5"
               >
                 <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
               </svg>
             </div>
             <h4 className="font-display text-lg text-charcoal mb-2">Phone</h4>
             <p className="text-sm text-slate">[Phone Number]</p>
           </div>
 
           {/* Website */}
           <div className="text-center">
             <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
               <svg
                 viewBox="0 0 24 24"
                 className="w-6 h-6"
                 fill="none"
                 stroke="hsl(var(--teal-medium))"
                 strokeWidth="1.5"
               >
                 <circle cx="12" cy="12" r="10" />
                 <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
               </svg>
             </div>
             <h4 className="font-display text-lg text-charcoal mb-2">Website</h4>
             <p className="text-sm text-slate">[Website URL]</p>
           </div>
 
           {/* Social */}
           <div className="text-center">
             <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
               <svg
                 viewBox="0 0 24 24"
                 className="w-6 h-6"
                 fill="none"
                 stroke="hsl(var(--teal-medium))"
                 strokeWidth="1.5"
               >
                 <rect x="2" y="2" width="20" height="20" rx="5" />
                 <circle cx="12" cy="12" r="4" />
                 <circle cx="18" cy="6" r="1" fill="hsl(var(--teal-medium))" />
               </svg>
             </div>
             <h4 className="font-display text-lg text-charcoal mb-2">Social</h4>
             <p className="text-sm text-slate">Instagram / Facebook</p>
           </div>
         </div>
 
         <div className="mt-16">
           <button className="px-10 py-4 bg-teal text-primary-foreground font-body font-medium rounded-full shadow-glow hover:shadow-gold transition-all duration-500 hover:scale-105">
             Book Your Consultation
           </button>
         </div>
 
         {/* Footer */}
         <div className="mt-24 pt-8 border-t border-border">
           <p className="text-sm text-muted-foreground">
             © 2024 Dermacare. All rights reserved.
           </p>
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterCTA;