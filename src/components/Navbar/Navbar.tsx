import styles from "./Navbar.module.scss";
import Navlinks from "../Navlinks/Navlinks.tsx";
import { MdMenu } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectSidemenuOpenStatus, sidemenuOpened } from "../../state/sidemenuSlice.ts";

const Navbar = () => {
  const isSidemenuOpen = useAppSelector(selectSidemenuOpenStatus);

  const dispatch = useAppDispatch();

  function handleMenuToggleButtonClick(shouldOpen: boolean): void {
    dispatch(sidemenuOpened(shouldOpen));
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <button
          onClick={() => handleMenuToggleButtonClick(true)}
          className={`${styles.menu_toggle_button} ${styles.burger_button} ${isSidemenuOpen && styles.button_hidden}`}
        >
          <MdMenu className={styles.menu_toggle_icon} />
        </button>

        <p className={styles.sitename}>BESIDER</p>

        <button
          onClick={() => handleMenuToggleButtonClick(false)}
          className={`${styles.menu_toggle_button} ${styles.close_button} ${!isSidemenuOpen && styles.button_hidden}`}
        >
          <HiXMark className={styles.menu_toggle_icon} />
        </button>

        <div className={`${styles.navlinks_container} ${isSidemenuOpen && styles.navlinks_visible}`}>
          <Navlinks />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;