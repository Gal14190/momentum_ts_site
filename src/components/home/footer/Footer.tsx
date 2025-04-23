import { useState } from 'react';
import classes from './footer.module.css';

const Footer = () => {
     const [isOpen, setIsOpen] = useState(false);

     // const scrollToSection = (index: number) => {
     //      const target = document.querySelectorAll(`.container_item`)[index];
     //      if (target) {
     //           target.scrollIntoView({ behavior: 'smooth' });
     //           setIsOpen(false);
     //      }
     // };

     return (
          <>
               <button className={`${classes.toggleButton} ${isOpen ? (classes.buttonClose) : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? 'X' : '^'}
               </button>

               <footer className={`${classes.footer} ${isOpen ? classes.open : ''}`}>
                    {/* <div className={classes.sitemap}>
                    <a href="/" className={classes.link}>Home</a>
                    <a href="about" className={classes.link}>About</a>
                    <a href="services" className={classes.link}>Services</a>
                    <a href="contact" className={classes.link}>Contact</a>
               </div> */}
                    <div className={classes.socials}>
                         <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className={classes.icon}>
                              <img src="/icons/wa.svg" alt="WhatsApp" className={classes.iconImage} />
                         </a>
                         <a href="mailto:info@momentum.com" className={classes.icon}>
                              <img src="/icons/em.svg" alt="Email" className={classes.iconImage} />
                         </a>
                         <a href="https://linkedin.com/company/momentum" target="_blank" rel="noopener noreferrer" className={classes.icon}>
                              <img src="/icons/in.svg" alt="LinkedIn" className={classes.iconImage} />
                         </a>
                         <a href="https://linkedin.com/company/momentum" target="_blank" rel="noopener noreferrer" className={classes.icon}>
                              <img src="/icons/ig.svg" alt="LinkedIn" className={classes.iconImage} />
                         </a>
                    </div>
                    <div className={classes.copy}>
                         © {new Date().getFullYear()} Momentum Tailored Solution Ltd. All rights reserved.
                    </div>
               </footer>
          </>
     );
};

export default Footer;
