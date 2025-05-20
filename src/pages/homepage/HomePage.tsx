// import ContactUs from '../../components/home/contact/ContactUs';
// import Footer from '../../components/home/footer/Footer';
import HomeInfo from '../../components/home/homeInfo/HomeInfo';
import HomeInfo2 from '../../components/home/homeInfo2/HomeInfo2';
import WhyMomentum from '../../components/home/whyMomentum/WhyMomentum';
import classes from './homePage.module.css'
import { motion } from 'framer-motion';

function HomePage() {
  return (
    <>
      <div className={classes.container}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={classes.container_item}
        >
          <HomeInfo />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={classes.container_item}
        >
          <HomeInfo2 />
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={classes.container_item}
        >
          <WhyMomentum />
        </motion.div>
        {/* <div className={classes.container_item}>
          <ContactUs />
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
