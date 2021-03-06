import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import React from "react";

const Nav: React.FC = (props) => {
  return (
    <ul className={styles.navContainer}>
      <li>
        <NavLink to="/music">MusicPlayer</NavLink>
      </li>
      <li>
        <NavLink to="/baymax">Baymax</NavLink>
      </li>
      <li>
        <NavLink to="/canvas">Canvas</NavLink>
      </li>
      <li>
        <NavLink to="/list">Sortable List</NavLink>
      </li>
    </ul>
  );
};
export default Nav;
