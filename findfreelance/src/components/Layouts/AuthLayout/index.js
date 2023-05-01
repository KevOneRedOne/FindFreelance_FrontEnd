import styles from "./index.module.scss";

const Index = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left__part}>
        {children}
      </div>
    </div>
  );
}

export default Index;