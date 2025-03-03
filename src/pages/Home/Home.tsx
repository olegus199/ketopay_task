import styles from "./Home.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import Page from "../Page/Page.tsx";
import { AxiosRequestConfig } from "axios";
import { API_KEY, API_URL } from "../../config.ts";
import { fetchData, handleFetchError } from "../../utils/api-client.ts";
import { GroupedArticles, IArticleResponse } from "../../types/types.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks.tsx";
import { articlesFetched, articlesPrepended, selectArticles } from "../../state/articlesSlice.ts";
import Articles from "./Articles.tsx";
import Loader from "../../ui/Loader.tsx";
import { useQuery } from "@tanstack/react-query";
import { calcLatestNewsKey } from "../../utils/latest-news-key.ts";

function initializeFromDate(): string {
  const today = new Date();
  const daysAgo = new Date(today);
  daysAgo.setDate(today.getDate() - 3);
  return daysAgo.toISOString();
}

function initializeToDate(): string {
  const today = new Date();
  const dayAgo = new Date(today);
  dayAgo.setDate(today.getDate() - 1);
  return dayAgo.toISOString();
}

const Home: FC = () => {
  const selectedArticles = useAppSelector(selectArticles);

  // I'm setting initial fromDate and toDate today.getDate() - 1 because newsapi.org has limitations
  // for free accounts (all articles have a 24 hours delay)
  const [fromDate, setFromDate] = useState(initializeFromDate());
  const [toDate, setToDate] = useState(initializeToDate());
  const [errorMsg, setErrorMsg] = useState("");

  const interval = useRef<NodeJS.Timeout | null>(null);

  const { data, status, error } = useQuery<GroupedArticles>({
    queryKey: ["articles", fromDate, toDate],
    queryFn: ({ queryKey }) => fetchArticles(queryKey[1] as string, queryKey[2] as string),
  });

  const dispatch = useAppDispatch();

  function loadMoreData(): void {
    const prevFrom = fromDate;

    const to = new Date(prevFrom);
    const from = new Date(prevFrom);

    to.setDate(to.getDate());
    from.setDate(from.getDate() - 2);

    setFromDate(from.toISOString());
    setToDate(to.toISOString());
  }

  async function fetchArticles(fromDate: string, toDate: string) {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `${API_URL}?domains=cnn.com&from=${fromDate}&to=${toDate}&pageSize=20&apiKey=${API_KEY}`,
    };

    const response = await fetchData<IArticleResponse>(config);

    const articles = response.data.articles;

    const grouped: GroupedArticles = {};

    articles.forEach((article) => {
      const date = article.publishedAt.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(article);
    });

    return grouped;
  }

  useEffect(() => {
    if (data) {
      dispatch(articlesFetched(data));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMsg(error.message);
    }
  }, [error]);

  useEffect(() => {
    interval.current = setInterval(async () => {
      try {
        const result = await fetchArticles(initializeToDate(), initializeToDate());
        const latestNewsKey = calcLatestNewsKey(Object.keys(result));
        if (latestNewsKey) {
          dispatch(articlesPrepended({
            key: latestNewsKey,
            latestArticles: result[latestNewsKey],
          }));
        }
      } catch (e) {
        const handledError = handleFetchError(e);
        setErrorMsg(handledError.message);
      }
    }, 1000 * 30);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <Page>
      {Object.keys(selectedArticles).length !== 0 &&
          <>
            <Articles />
            {status === "success" && (
              <button
                onClick={loadMoreData}
                className={styles.load_more_button}
              >
                Load more
              </button>
            )}
          </>
      }
      {status === "pending" && <Loader />}
      {errorMsg &&
          <div className={styles.error_msg}>An error occurred: {errorMsg}</div>}
    </Page>
  );
};

export default Home;