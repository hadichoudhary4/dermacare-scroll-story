 import { useEffect } from 'react';
 import { useLenis } from '@/hooks/useLenis';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 // Chapter imports
 import ChapterIntro from '@/components/chapters/ChapterIntro';
 import ChapterTrust from '@/components/chapters/ChapterTrust';
 import ChapterPhilosophy from '@/components/chapters/ChapterPhilosophy';
 import ChapterClinical from '@/components/chapters/ChapterClinical';
 import ChapterLaser from '@/components/chapters/ChapterLaser';
 import ChapterAesthetic from '@/components/chapters/ChapterAesthetic';
 import ChapterAntiAging from '@/components/chapters/ChapterAntiAging';
 import ChapterHair from '@/components/chapters/ChapterHair';
 import ChapterSurgical from '@/components/chapters/ChapterSurgical';
 import ChapterSignature from '@/components/chapters/ChapterSignature';
 import ChapterJourney from '@/components/chapters/ChapterJourney';
 import ChapterWhy from '@/components/chapters/ChapterWhy';
 import ChapterCTA from '@/components/chapters/ChapterCTA';
 
 gsap.registerPlugin(ScrollTrigger);
 
 const Index = () => {
   // Initialize Lenis smooth scrolling
   useLenis();
 
   useEffect(() => {
     // Refresh ScrollTrigger after all components mount
     const timeout = setTimeout(() => {
       ScrollTrigger.refresh();
     }, 100);
 
     return () => {
       clearTimeout(timeout);
       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
     };
   }, []);
 
   return (
     <main className="relative">
       {/* Progress indicator */}
       <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
         <div
           className="h-full bg-gradient-to-r from-teal to-champagne origin-left"
           style={{ transform: 'scaleX(0)' }}
           id="progress-bar"
         />
       </div>
 
       {/* Navigation hint - fixed */}
       <nav className="fixed top-6 right-6 z-50 hidden lg:block">
         <div className="glass rounded-full px-4 py-2">
           <span className="text-xs uppercase tracking-widest text-muted-foreground">
             Scroll to explore
           </span>
         </div>
       </nav>
 
       {/* All Chapters */}
       <ChapterIntro />
       <ChapterTrust />
       <ChapterPhilosophy />
       <ChapterClinical />
       <ChapterLaser />
       <ChapterAesthetic />
       <ChapterAntiAging />
       <ChapterHair />
       <ChapterSurgical />
       <ChapterSignature />
       <ChapterJourney />
       <ChapterWhy />
       <ChapterCTA />
     </main>
   );
 };
 
 export default Index;
