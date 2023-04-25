import styles from "./index.module.scss";

const Index = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left__part}>
        <div className={styles.form__wrapper}>
        {children}
        </div>
      </div>
      <div className={styles.right__part}>
        <div className={styles.wrapper}>
          {/* <img src={Image.src} alt="auth" /> */}
        </div>
      </div>
    </div>
  );
}

export default Index;