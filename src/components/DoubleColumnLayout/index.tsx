import styles from './index.module.scss';
import Nav from './Nav';

const Layout: React.FC = (props) => {
  return (
    <div className={styles.layoutContainer}>
      <Nav />
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
export default Layout;
