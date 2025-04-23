import SVGComponent from '../../SVGComponent';
import classes from './homeInfo.module.css';
import logoIcon from '../../../assets/icons/momentum_logo_white.svg'

const HomeInfo = () => {
     return (
          <div className={classes.container}>
               <div className={classes.about}>
                    <div className={classes.icon}>
                         <SVGComponent src={logoIcon} responsive fill='white' stroke='white'/>
                    </div>
                    <div className={classes.text}>
                         <h1 className={classes.title}>WE CONNECT WORLDS OF TECHNOLOGY</h1>
                         <p className={classes.subtitle}>Momentum Tailored Solution Ltd.</p>
                    </div>
               </div>
               <div className={classes.picture}></div>
          </div>
     );
};

export default HomeInfo;
