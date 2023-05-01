import styles from "./index.module.scss";
import LoaderGif from "../../../../public/images/loader.gif";

const Index = ({isLoad}) => {
  return (
    <>
    {
      isLoad && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <img src={LoaderGif.src} alt="loader" />
          </div>      
        </div>
      )
      }
  </>
  );
}

export default Index;
