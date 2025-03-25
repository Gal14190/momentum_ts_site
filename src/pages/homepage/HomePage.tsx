import HomeImage from '../../components/homeImage/HomeImage';
import classes from './homePage.module.css'

function HomePage() {
  return (
    <div className={classes.container}>
      <div className={classes.container_item}></div>
      <div className={classes.container_item}></div>
      <div className={classes.container_item}></div>
      <div className={classes.container_item}></div>
      <div className={classes.container_item}></div>
      <div className={classes.container_item}></div>
      {/* <HomeImage/> */}
    </div>
  );
}

export default HomePage;
