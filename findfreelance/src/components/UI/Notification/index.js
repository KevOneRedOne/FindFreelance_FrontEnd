import styles from "./index.module.scss";

const Index = ({type, message}) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
}

export default Index;
