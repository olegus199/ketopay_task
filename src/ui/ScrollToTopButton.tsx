import styles from "./ScrollToTopButton.module.scss";
import { FC } from "react";
import { BiChevronUp } from "react-icons/bi";

const ScrollToTopButton: FC = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={styles.scroll_button}
    >
      <BiChevronUp className={styles.icon} />
    </button>
  );
};

export default ScrollToTopButton;