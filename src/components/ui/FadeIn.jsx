"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function FadeIn({ children, duration = 0, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {
        treshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
      } ${className} `}
    >
      {children}
    </div>
  );
}

export function FadeInUp({ children, duration = 0, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {
        treshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className} `}
    >
      {children}
    </div>
  );
}

export function FadeInDown({ children, duration = 0, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {
        treshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-800 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      } ${className} `}
    >
      {children}
    </div>
  );
}
