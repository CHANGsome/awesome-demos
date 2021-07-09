import styles from './index.module.scss';
import Nav from './Nav';
import React from "react";

const Layout: React.FC = (props) => {
  return (
    <div className={styles.layoutContainer}>
      <Nav />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
export default Layout;
