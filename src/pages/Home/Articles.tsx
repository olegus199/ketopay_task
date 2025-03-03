import styles from "./Articles.module.scss";
import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { selectArticles } from "../../state/articlesSlice.ts";
import { formatDate } from "../../utils/format-date.ts";
import { IArticle } from "../../types/types.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { scrollToTopVisibilityChanged } from "../../state/scrollToTopSlice.ts";

const Articles: FC = () => {
  const articles = useAppSelector(selectArticles);

  const dispatch = useAppDispatch();

  const firstH2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        dispatch(scrollToTopVisibilityChanged(false));
      } else {
        dispatch(scrollToTopVisibilityChanged(true));
      }
    });

    if (firstH2Ref.current) {
      observer.observe(firstH2Ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ul className={styles.articles_blocks}>
      {Object.keys(articles).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((date, idx) => (
          <div
            key={idx}
            className={styles.articles_block}
          >
            <h2
              ref={idx === 0 ? firstH2Ref : undefined}
              className={styles.h2}
            >
              News for {formatDate(date, "header")}
            </h2>
            <ul className={styles.articles_list}>
              {articles[date].map((article, i) => (
                <Article
                  key={i}
                  article={article}
                />
              ))}
            </ul>

          </div>
        ))}
    </ul>
  );
};

interface ArticleProps {
  article: IArticle;
}

const Article: FC<ArticleProps> = ({
  article: {
    description,
    publishedAt,
    url,
    urlToImage,
    source: { name },
  },
}) => {
  return (
    <li className={styles.li}>
      <a
        href={url}
        target="_blank"
        className={styles.article}
      >
        <div className={styles.header}>
          <div className={styles.header_filler} />
          <p className={styles.source_name}>{name}</p>
        </div>
        <div
          className={styles.article_content}
        >
          <div className={styles.image_wrapper}>
            <LazyLoadImage
              src={urlToImage}
              alt="article image"
              className={styles.article_img}
            />
          </div>
          <div>
            <p className={styles.description}>{description.slice(0, 200) + "..."}</p>
            <p className={styles.date}>{formatDate(publishedAt, "paragraph")}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Articles;