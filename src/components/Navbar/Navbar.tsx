import styles from "./Navbar.module.scss";
import Navlinks from "../Navlinks/Navlinks.tsx";
import { MdMenu } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectSidemenuOpenStatus, sidemenuOpened } from "../../state/sidemenuSlice.ts";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const isSidemenuOpen = useAppSelector(selectSidemenuOpenStatus);

  const navlinksContainerRef = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();

  function handleMenuToggleButtonClick(shouldOpen: boolean): void {
    dispatch(sidemenuOpened(shouldOpen));
  }

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (isSidemenuOpen) {
      if (navlinksContainerRef.current) {
        navlinksContainerRef.current.style.transition = "transform .15s ease-out";
      }
    } else {
      timer.current = setTimeout(() => {
        if (navlinksContainerRef.current) {
          navlinksContainerRef.current.style.transition = "none";
        }
      }, 200);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isSidemenuOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <button
          onClick={() => handleMenuToggleButtonClick(true)}
          aria-label="open menu"
          className={`${styles.menu_toggle_button} ${styles.burger_button} ${isSidemenuOpen && styles.button_hidden}`}
        >
          <MdMenu className={styles.menu_toggle_icon} />
        </button>

        <p className={styles.sitename}>BESIDER</p>

        <button
          onClick={() => handleMenuToggleButtonClick(false)}
          aria-label="close menu"
          className={`${styles.menu_toggle_button} ${styles.close_button} ${!isSidemenuOpen && styles.button_hidden}`}
        >
          <HiXMark className={styles.menu_toggle_icon} />
        </button>

        <div
          ref={navlinksContainerRef}
          className={`${styles.navlinks_container} ${isSidemenuOpen && styles.navlinks_visible}`}
        >
          <Navlinks />
        </div>
      </div>

    </nav>
  );
};

export default Navbar;