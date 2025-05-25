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
  }
];

const WhyMomentum = () => {
  const [columns, setColumns] = useState(Math.floor(window.innerWidth / 290));
  const currentYear = new Date().getFullYear();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateColumns = () => {
      const gridWidth = sectionRef.current?.offsetWidth || window.innerWidth;
      setColumns(Math.max(1, Math.floor(gridWidth / 290)));
    };

    updateColumns(); // call once at start

    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return (
    <div className={classes.container} ref={sectionRef}>
      <h2 className={classes.mainTitle}>Why Momentum?</h2>
      <p className={classes.subtitle}>Momentum Tailored Solution Ltd.</p>

      <h3 className={classes.sectionTitle}>Areas of Expertise</h3>
      <div className={classes.grid}>
        {expertise.map((item, index) => {
          const isLastAlone =
            index === expertise.length - 1 &&
            expertise.length % columns === 1 &&
            expertise.length > columns;

          return (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`${classes.card} ${classes.visible} ${isLastAlone ? classes.fullWidth : ''}`}
            >
              <h4 className={classes.cardTitle}>{item.title}</h4>
              <p className={classes.cardDescription}>{item.description}</p>
            </div>
          );
        })}

      </div>
      <div className={`${classes.grid} ${classes.momentum}`}>
        <div
          style={{ background: "rgb(196, 237, 255)" }}
          className={`${classes.card} ${classes.visible}`}
        >
          <h4 className={classes.cardTitle}>Momentum Tailored Solutions</h4>
          <p className={classes.cardDescription}>An innovative company specializing in developing and consulting for advanced hi-tech systems. We combine a futuristic vision with engineering expertise to provide tailored solutions for each client.</p>
        </div>
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
              contact@momentumtailoredsolutions.com
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