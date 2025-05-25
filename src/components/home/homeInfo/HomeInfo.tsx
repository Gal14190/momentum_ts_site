import SVGComponent from '../../SVGComponent';
import classes from './homeInfo.module.css';
import logoIcon from '../../../assets/icons/momentum_logo_white.svg'
import { motion } from "framer-motion"

const HomeInfo = () => {
     return (
          <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={classes.container}
          >
               <motion.div
                    className={classes.about}
               >
                    <div className={classes.text}>
                         <h1 className={classes.title}>WE CONNECT WORLDS OF TECHNOLOGY</h1>
                         <p className={classes.subtitle}>Momentum Tailored Solution Ltd.</p>
                    </div>
                    <div className={classes.icon}>
                         <SVGComponent src={logoIcon} responsive fill='white' stroke='white' />
                    </div>
               </motion.div>
               <div className={classes.picture}></div>
          </motion.div>
     );
};

export default HomeInfo;
