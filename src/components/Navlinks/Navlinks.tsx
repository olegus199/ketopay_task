import styles from "./Navlinks.module.scss";
import { FC } from "react";
import { pageNames } from "../../data.ts";
import { NavLink } from "react-router-dom";

interface NavlinksProps {
  inFooter?: boolean;
}

const Navlinks: FC<NavlinksProps> = ({ inFooter }) => {
  return (
    <ul className={`${styles.navlinks} ${inFooter && styles.in_footer}`}>
      {pageNames.map((pageName, idx) => (
        <li
          key={idx}
          className={styles.li}
        >
          <NavLink
            to={idx === 0 ? "/" : pageName}
            className={styles.navlink}
          >
            {pageName.toUpperCase()}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;