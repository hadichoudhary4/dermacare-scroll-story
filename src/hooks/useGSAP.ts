 import { useEffect, useRef } from 'react';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
 gsap.registerPlugin(ScrollTrigger);
 
 export const useGSAP = () => {
   const contextRef = useRef<gsap.Context | null>(null);
 
   useEffect(() => {
     return () => {
       if (contextRef.current) {
         contextRef.current.revert();
       }
     };
   }, []);
 
   return { gsap, ScrollTrigger, contextRef };
 };
 
 export { gsap, ScrollTrigger };