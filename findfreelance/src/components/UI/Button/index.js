import styles from "./index.module.scss";

const Index = ({ type, title, handleClick, className, disabled }) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled ? true : false}
      className={`${styles.btn} ${styles[className]}`}
    >
      {title}
    </button>
  );
};

export default Index;
