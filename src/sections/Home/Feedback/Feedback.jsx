import { useRef, useEffect } from 'react';
import styles from './styles/Feedback.module.scss';
import feedbackData from '../../../data/Feedback.json';
import quoteImg from "../../../assets/images/quote.png";

const Feedback = () => {
  const feedbacksRef = useRef(null);

  const FeedbackCard = ({ quote }) => {
    return (
      <div className={styles.feedbackCard}>
        <div className={styles.FeedbackMsg}><p className={styles.feedbackText}>{quote.quote}</p></div>
        
        <div>
        <p className={styles.feedbackAuthor}>{quote.title}</p>
        <p className={styles.feedbackEv}>{quote.post}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const feedbacksContainer = feedbacksRef.current;
    const handleMouseEnter = () => {
      feedbacksContainer.style.animationPlayState = 'paused'; 
    };
    const handleMouseLeave = () => {
      feedbacksContainer.style.animationPlayState = 'running';
    };

    feedbacksContainer.addEventListener('mouseenter', handleMouseEnter);
    feedbacksContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      feedbacksContainer.removeEventListener('mouseenter', handleMouseEnter);
      feedbacksContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.feedbackContainer}>
      <img className={styles.upQuote} src={quoteImg} alt="Up Quote" />
      <div className={styles.heading}>
        <h2>TESTIMO<span>NIALS</span></h2>
        <div className={styles.bottomLine}></div>
      </div>
      <div className={styles.feedbacksContainer}>
        <div className={styles.feedbacks} ref={feedbacksRef}>
          
          {feedbackData.concat(feedbackData).map((quote, index) => ( 
            <FeedbackCard key={index} quote={quote} />
          ))}
          
        </div>
      </div>
      <img className={styles.downQuote} src={quoteImg} alt="Down Quote" />
    </div>
  );
};

export default Feedback;
