import classes from "./News.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import newsImage from "../public/mainimage.jpg";
import Loader from "./UI/Loader";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth-sliceMirza";

function News() {
  const [newsData, setNewsData] = useState([]);
  const dispatch = useDispatch();

  // const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=517623b5d0f949f8a30aa607f6546172";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "f8730af747mshe7be8505608f9b7p107917jsn6cf5a4a46437",
  //     "X-RapidAPI-Host": "mrnewsapi.p.rapidapi.com",
  //   },
  // };

  useEffect(() => {
    dispatch(authActions.setLoading(true));
    async function fetchNews() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=517623b5d0f949f8a30aa607f6546172`
        );
        const results = await response.json();
        console.log(results);

        const data = results.articles.map((movie) => {
          return {
            id: movie.title,
            title: movie.title,
            content: movie.content,
            description: movie.description,
            image: movie.urlToImage,
            published: movie.publishedAt,
          };
        });
        setNewsData(data);
      } catch (error) {
        console.error(error);
      }
    }
    dispatch(authActions.setLoading(false));
    fetchNews();
  }, []);

  return (
    <>
      <div className={classes.newsContainer}>
        {newsData.map((news) => (
          <div className={classes.miniContainer}>
            <div className={classes.imageContainer}>
              <img alt={"Test"} src={news.image} className={classes.image} />
            </div>
            <div className={classes.details}>
              <h1>{news.title}</h1>
              <h4>{news.content}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default News;
