import { useEffect, useRef, useState } from 'react';
import classes from './whyMomentum.module.css';

const expertise = [
  {
    title: "Space Technologies",
    description: "Development of satellite systems, advanced algorithms and cutting edge communication solutions."
  },
  {
    title: "Navigation",
    description: "Integrating GNSS and system immunity, precise timing, AI-based navigation, testing labs, advanced research and development."
  },
  {
    title: "Avionics & Air Communications",
    description: "Consulting and systems engineering for avionics, airborne and ground communications."
  },
  {
    title: "Momentum Tailored Solutions",
    description: "An innovative company specializing in developing and consulting for advanced hi-tech systems. We combine a futuristic vision with engineering expertise to provide tailored solutions for each client."
  }
];

const WhyMomentum = () => {
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleStates, setVisibleStates] = useState(
    new Array(expertise.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const sectionEntry = entries.find((entry) => entry.target === sectionRef.current);
        if (sectionEntry?.isIntersecting) {
          const interval = setInterval(() => {
            setVisibleStates((prev) => {
              const nextVisible = [...prev];
              const nextIndex = nextVisible.findIndex((v) => !v);
              if (nextIndex === -1) {
                clearInterval(interval);
                return nextVisible;
              }
              nextVisible[nextIndex] = true;
              return nextVisible;
            });
          }, 50);
        } else {
          setVisibleStates(new Array(expertise.length).fill(false));
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={classes.container} ref={sectionRef}>
        <h2 className={classes.mainTitle}>Why Momentum?</h2>
        <p className={classes.subtitle}>Momentum Tailored Solution Ltd.</p>

        <h3 className={classes.sectionTitle}>Areas of Expertise</h3>
        <div className={classes.grid}>
          {expertise.map((item, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`${classes.card} ${visibleStates[index] ? classes.visible : ''}`}
            >
              <h4 className={classes.cardTitle}>{item.title}</h4>
              <p className={classes.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>

      <div className={classes.section}>
        <h4 className={classes.sectionTitle}>Contact Information</h4>
        <ul className={classes.contactList}>
          {/* <li>
              <span className={classes.icon}>📍</span>
              123 Main St, Tel Aviv, Israel
            </li> */}
          <li>
            {/* <span className={classes.icon}>📞</span> */}
            <a href="tel:+972553044007" className={classes.link}>
              +972 553-044-007
            </a>
          </li>
          <li>
            {/* <span className={classes.icon}>✉️</span> */}
            <a href="mailto:contact@momentumtailoredsolutions.com" className={classes.link}>
              Contact@MomentumTD.com
            </a>
          </li>
        </ul>
        <div className={classes.copy}>
          © {currentYear} Momentum Tailored Solution Ltd. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default WhyMomentum;