import { useEffect, useRef, useState } from 'react';
import classes from './homeInfo.module.css';

const items = [
  <div className={`${classes.picture} ${classes.listItem}`}></div>,
  <h1 className={`${classes.title} ${classes.listItem}`}>WE CONNECT WORLDS OF TECHNOLOGY</h1>
];

const HomeInfo2 = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visibleStates, setVisibleStates] = useState(new Array(items.length + 2).fill(false));

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
          }, 100);
        } else {
          setVisibleStates(new Array(items.length + 2).fill(false));
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={classes.container} ref={sectionRef}>
      <div className={`${classes.picture} ${classes.listItem} ${visibleStates[0] ? classes.visible : ''}`}></div>
      <div className={classes.about}>
        <div className={classes.text}>
          <h1 className={`${classes.title} ${classes.listItem} ${visibleStates[1] ? classes.visible : ''}`}>
            WE CONNECT WORLDS OF TECHNOLOGY
          </h1>
          <ul className={classes.description}>
            <li>A team of top-tier engineers and experts</li>
            <li>Innovative technologies tailored to unique needs</li>
            <li>Joint ventures with leading industry and academia</li>
            <li>Proven experience in G2G collaborations, procurement and project management</li>
            <li>Establishment and management of R&D technology labs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo2;
