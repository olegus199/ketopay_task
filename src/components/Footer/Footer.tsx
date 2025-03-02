import styles from "./Footer.module.scss";
import { FC } from "react";
import logo from "../../assets/footerLogo.png";
import { footerLinks } from "../../data.ts";
import { NavLink } from "react-router-dom";
import { formatFooterLinks } from "../../utils/format-footer-links.ts";
import { useAppDispatch } from "../../hooks/redux-hooks.tsx";
import { sidemenuOpened } from "../../state/sidemenuSlice.ts";

const Footer: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <ul className={styles.footer_links}>
          {footerLinks.map((link, idx) => (
            <li
              key={idx}
              className={styles.li}
            >
              {
                link === "sitemap" ? (
                    <p
                      onClick={() => dispatch(sidemenuOpened(true))}
                    >{formatFooterLinks(link)}</p>
                  ) :
                  (
                    <NavLink
                      to={link}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {formatFooterLinks(link)}
                    </NavLink>
                  )
              }
            </li>
          ))}
        </ul>

        <div
          className={styles.logo_container}
        >
          <p>Powered by</p>
          <img
            src={logo}
            alt="logo"
            className={styles.logo_img}
          />
        </div>

        <p className={styles.footnote}>© 2023 Besider. Inspired by Insider</p>
      </div>
    </footer>
  );
};

export default Footer;