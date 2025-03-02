import styles from "./Page.module.scss";
import { FC, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
};

export default Page;