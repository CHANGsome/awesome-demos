import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const Nav: React.FC = (props) => {
  return (
    <ul className={styles.navContainer}>
      <li>
        <NavLink to="/music">MusicPlayer</NavLink>
      </li>
      <li>
        <NavLink to="/baymax">Baymax</NavLink>
      </li>
    </ul>
  );
};
export default Nav;
