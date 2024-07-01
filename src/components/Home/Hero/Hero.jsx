import styles from "./styles/Hero.module.scss";
import CarouselImg from "../../../data/carouselImages";
import Carousel from "./Carousel/Carousel";
import { AnimatedBox } from "../../../assets/animations/AnimatedBox";


function Hero() {
  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.hero1}>
          <AnimatedBox direction="left">
            <div className={styles.heroone}>
              <strong>Nurturing <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>entrepreneurship</span> through creative, authentic, and efficient techniques.</strong> 
            </div>
            <div className={styles.herotwo}>
              <div className={styles.smallcontent}>
                <strong>Nurturing <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>entrepreneurship</span> through creative, authentic, and efficient techniques.</strong>
              </div>
            </div>
          </AnimatedBox>
        </div>
        <div className={styles.hero2}>
          <Carousel images={CarouselImg} />
        </div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
}

export default Hero;
