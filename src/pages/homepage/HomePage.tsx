// import ContactUs from '../../components/home/contact/ContactUs';
import Footer from '../../components/home/footer/Footer';
import HomeInfo from '../../components/home/homeInfo/HomeInfo';
import HomeInfo2 from '../../components/home/homeInfo2/HomeInfo2';
import WhyMomentum from '../../components/home/whyMomentum/WhyMomentum';
import classes from './homePage.module.css'

function HomePage() {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.container_item}>
          <HomeInfo />
        </div>
        <div className={classes.container_item}>
          <HomeInfo2 />
        </div>
        <div className={classes.container_item}>
          <WhyMomentum />
        </div>
        {/* <div className={classes.container_item}>
          <ContactUs />
        </div> */}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
