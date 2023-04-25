import React from 'react';
import styles from "./index.module.scss";

const Index = ({title, Level}) => {

  return (
    <div className={styles.wrapper}>
      <Level>
        {title}
      </Level>
    </div>
  );
}

export default Index;
