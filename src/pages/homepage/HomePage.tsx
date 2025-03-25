import HomeImage from '../../components/homeImage/HomeImage';
import classes from './homePage.module.css'

function HomePage() {
  return (
    <div className={classes.container}>
      <div className={classes.container_item}>
        <HomeImage />
      </div>
    </div>
  );
}

export default HomePage;
