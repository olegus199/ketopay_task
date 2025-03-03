import styles from "./Loader.module.scss";
import { FC } from "react";

const Loader: FC = () => {
  return <div
    aria-label="loader"
    className={styles.loader}
  />;
};

export default Loader;