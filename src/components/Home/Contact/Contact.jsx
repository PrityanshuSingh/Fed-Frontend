import styles from './styles/Contact.module.scss';
import contactImg from "../../../assets/images/contact.png";
import { AnimatedBox } from "../../../assets/animations/AnimatedBox";

function ContactForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    console.log(data);
  };

  return (
    <div className={styles.contactFormContainer}>
      <h2>GET <span className={styles.highlight}>IN</span> TOUCH</h2>
      <div className={styles.bottomLine}></div>
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div className={styles.formGroup}>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div className={styles.formGroup}>
            <textarea name="message" placeholder="Message"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className={styles.imageSection}>
          <div className={styles.backCircle}></div>
          <AnimatedBox direction="right">
            <img src={contactImg} alt="To Fed" />
          </AnimatedBox>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
