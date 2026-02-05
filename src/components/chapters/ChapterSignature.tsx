 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const signatureTreatments = [
   {
     title: 'Hollywood Facial',
     description: 'Red carpet-ready skin with instant glow',
   },
   {
     title: 'MNRF',
     description: 'Micro-needling radio frequency for deep rejuvenation',
   },
   {
     title: 'Glow Laser',
     description: 'Advanced laser technology for luminous skin',
   },
   {
     title: 'Exosomes',
     description: 'Next-generation cellular regeneration',
   },
   {
     title: 'Thread Lift',
     description: 'Non-surgical lifting and contouring',
   },
 ];
 
 const ChapterSignature = () => {
   const sectionRef = useRef<HTMLElement>(null);
   const trackRef = useRef<HTMLDivElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Horizontal scroll
       const track = trackRef.current;
       if (!track) return;
 
       const cards = cardsRef.current.filter(Boolean);
       const cardWidth = cards[0]?.offsetWidth || 350;
       const gap = 32;
       const totalWidth = cards.length * (cardWidth + gap);
 
       gsap.to(track, {
         x: -(totalWidth - window.innerWidth + 200),
         ease: 'none',
         scrollTrigger: {
           trigger: sectionRef.current,
           start: 'top top',
           end: `+=${totalWidth}`,
           pin: true,
           scrub: 1,
           onUpdate: (self) => {
             const progress = self.progress;
             const activeIndex = Math.floor(progress * cards.length);
 
             cards.forEach((card, index) => {
               if (card) {
                 if (index === activeIndex) {
                   gsap.to(card, {
                     scale: 1.05,
                     filter: 'blur(0px)',
                     opacity: 1,
                     duration: 0.3,
                   });
                 } else {
                   gsap.to(card, {
                     scale: 1,
                     filter: 'blur(2px)',
                     opacity: 0.7,
                     duration: 0.3,
                   });
                 }
               }
             });
           },
         },
       });
     }, sectionRef);
 
     return () => ctx.revert();
   }, []);
 
   return (
     <section
       ref={sectionRef}
       className="chapter overflow-hidden"
       style={{ background: 'var(--gradient-luxury)' }}
     >
       <div className="h-screen flex flex-col justify-center">
         <div className="text-center mb-12 px-8">
           <p className="text-tagline mb-4">Chapter 10</p>
           <h2 className="heading-chapter">Signature Treatments</h2>
         </div>
 
         <div
           ref={trackRef}
           className="signature-track pl-8 md:pl-24"
         >
           {signatureTreatments.map((treatment, index) => (
             <div
               key={treatment.title}
               ref={(el) => (cardsRef.current[index] = el)}
               className="signature-card"
             >
               <div className="mb-6">
                 <span className="text-tagline text-champagne">
                   {String(index + 1).padStart(2, '0')}
                 </span>
               </div>
               <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-4">
                 {treatment.title}
               </h3>
               <p className="text-body">{treatment.description}</p>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ChapterSignature;