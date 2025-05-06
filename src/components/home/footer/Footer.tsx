import React, { useEffect, useState, RefObject } from 'react';
import { Link } from 'react-router-dom';
import classes from './footer.module.css';

interface FooterProps {
  /**
   * אם יש אלמנט גלילה פנימי (לדוגמה Home), תעביר כאן ref לתוכו
   * כדי למדוד את מצב הגלילה שלו במקום גלילת החלון
   */
  scrollContainerRef?: RefObject<HTMLElement>;
}

const Footer: React.FC<FooterProps> = ({ scrollContainerRef }) => {
  const [showFooter, setShowFooter] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
    // הוסף קישורים נוספים לפי הצורך
  ];

  useEffect(() => {
    // קובע את היעד שעליו מאזינים לאירוע גלילה
    const target = scrollContainerRef?.current ?? window;
    const isAtBottom = () => {
      if (scrollContainerRef?.current) {
        const el = scrollContainerRef.current;
        return el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      }
      return window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 20;
    };

    const handleScroll = () => setShowFooter(isAtBottom());

    target.addEventListener('scroll', handleScroll as EventListener);
    // בדיקה ראשונית
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll as EventListener);
  }, [scrollContainerRef]);

  return (
    <footer
      className={classes.footer}
      style={{
        transform: showFooter ? 'translateY(0)' : 'translateY(100%)'
      }}
    >
      <div className={classes.container}>
        {/* Quick Links */}
        <div className={classes.section}>
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
        </div>

        {/* Contact Info */}
        <div className={classes.section}>
          <h4 className={classes.sectionTitle}>Contact Information</h4>
          <ul className={classes.contactList}>
            <li>
              <span className={classes.icon}>📍</span>
              123 Main St, Tel Aviv, Israel
            </li>
            <li>
              <span className={classes.icon}>📞</span>
              <a href="tel:+972123456789" className={classes.link}>
                +972 1-234-567-89
              </a>
            </li>
            <li>
              <span className={classes.icon}>✉️</span>
              <a href="mailto:info@momentum.com" className={classes.link}>
                info@momentum.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className={classes.section}>
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
        </div>
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
    </footer>
  );
};

export default Footer;
