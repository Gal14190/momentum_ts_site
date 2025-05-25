import React from 'react';
import classes from './footer.module.css';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // const quickLinks = [
  //   { to: '/', label: 'Home' },
  //   { to: '/about', label: 'About Us' },
  //   { to: '/services', label: 'Services' },
  //   { to: '/contact', label: 'Contact' },
  //   // הוסף קישורים נוספים לפי הצורך
  // ];


  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={classes.footer}
    >
      <div className={classes.container}>
        {/* Quick Links */}
        {/* <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Quick Links</h4>
          <ul className={classes.linkList}>
            {quickLinks.map(({ to, label }) => (
              <li key={to} className={classes.linkItem}>
                <Link to={to} className={classes.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Contact Info */}
        <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Contact Information</h4>
          <ul className={classes.contactList}>
            {/* <li>
              <span className={classes.icon}>📍</span>
              123 Main St, Tel Aviv, Israel
            </li> */}
            <li>
              <span className={classes.icon}>📞</span>
              <a href="tel:+972553044007" className={classes.link}>
                +972 553-044-007
              </a>
            </li>
            <li>
              <span className={classes.icon}>✉️</span>
              <a href="mailto:contact@momentumtailoredsolutions.com" className={classes.link}>
                contact@MomentumTDs.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        {/* <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Follow Us</h4>
          <div className={classes.socials}>
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.iconLink}
            >
              <img src="/icons/wa.svg" alt="WhatsApp" className={classes.iconImage} />
            </a>
            <a
              href="https://instagram.com/momentum"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.iconLink}
            >
              <img src="/icons/ig.svg" alt="Instagram" className={classes.iconImage} />
            </a>
            <a
              href="https://linkedin.com/company/momentum"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.iconLink}
            >
              <img src="/icons/in.svg" alt="LinkedIn" className={classes.iconImage} />
            </a>
          </div>
        </div> */}
      </div>

      {/* Back to Top */}
      <button
        className={classes.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to Top"
      >
        ↑
      </button>

      <div className={classes.copy}>
        © {currentYear} Momentum Tailored Solution Ltd. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
