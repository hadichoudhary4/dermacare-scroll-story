 import { useEffect, useRef } from 'react';
 import Lenis from 'lenis';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 export const useLenis = () => {
   const lenisRef = useRef<Lenis | null>(null);
 
   useEffect(() => {
     const lenis = new Lenis({
       duration: 1.2,
       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
       orientation: 'vertical',
       gestureOrientation: 'vertical',
       smoothWheel: true,
     });
 
     lenisRef.current = lenis;
 
     // Update ScrollTrigger on scroll
     lenis.on('scroll', ScrollTrigger.update);
 
     // Update progress bar
     lenis.on('scroll', ({ progress }: { progress: number }) => {
       const progressBar = document.getElementById('progress-bar');
       if (progressBar) {
         progressBar.style.transform = `scaleX(${progress})`;
       }
     });
 
     // RAF loop
     const raf = (time: number) => {
       lenis.raf(time);
       requestAnimationFrame(raf);
     };
     requestAnimationFrame(raf);
 
     // Sync with GSAP
     gsap.ticker.lagSmoothing(0);
 
     return () => {
       lenis.destroy();
     };
   }, []);
 
   return lenisRef;
 };