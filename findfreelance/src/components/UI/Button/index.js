import styles from "./index.module.scss";

const Index = ({ type, title, handleClick, className, disabled }) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[className]}`}
      onClick={handleClick}
      disabled={disabled ? true : false}
    >
      {title}
    </button>
  );
};

export default Index;
