import classes from "./News.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import newsImage from "../public/mainimage.jpg";
import Loader from "./UI/Loader";

function News() {
  // const [newsData, setNewsData] = useState([]);

  // const url = "https://mrnewsapi.p.rapidapi.com/news/india/entertainment";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "f8730af747mshe7be8505608f9b7p107917jsn6cf5a4a46437",
  //     "X-RapidAPI-Host": "mrnewsapi.p.rapidapi.com",
  //   },
  // };

  // useEffect(() => {
  // async function fetchNews() {
  //   try {
  // const response = await fetch(
  //   `https://newsapi.org/v2/everything?q=movie&apiKey=517623b5d0f949f8a30aa607f6546172`
  // );
  // const response = await fetch(url, options);
  // const results = await response.json();
  // console.log(results);

  // const data = results.articles.map((movie) => {
  //   return {
  //     id: movie.title,
  //     title: movie.title,
  //     content: movie.content,
  //     description: movie.description,
  //     image: movie.urlToImage,
  //     published: movie.publishedAt,
  //   };
  // });
  // setNewsData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchNews();
  // }, []);

  return (
    <>
      {/* {newsData.map((news) => ( */}
      <div className={classes.newsContainer}>
        <div className={classes.miniContainer}>
          <div className={classes.imageContainer}>
            <Image alt={"Test"} src={newsImage} className={classes.image} />
          </div>
          <div className={classes.details}>
            <h1>Some title for news</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, rerum. Sapiente tempore, reiciendis soluta esse quia
              eius fugiat sequi quibusdam saepe necessitatibus at minus ratione
              omnis aperiam, reprehenderit id temporibus? Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Blanditiis, repellendus. Facere
              sed reprehenderit laborum saepe. Commodi error magnam quae
              accusamus ea minus, culpa nostrum assumenda! Qui, soluta?
              Consequatur, adipisci ullam.
            </h4>
          </div>
        </div>

        <div className={classes.miniContainer}>
          <div className={classes.imageContainer}>
            <Image alt={"Test"} src={newsImage} className={classes.image} />
          </div>
          <div className={classes.details}>
            <h1>Some title for news</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, rerum. Sapiente tempore, reiciendis soluta esse quia
              eius fugiat sequi quibusdam saepe necessitatibus at minus ratione
              omnis aperiam, reprehenderit id temporibus? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Dolor, nulla nesciunt quasi
              accusamus sapiente sit nemo perferendis necessitatibus corrupti
              quae cupiditate sequi velit provident eum doloribus! Soluta
              dolorem delectus numquam.
            </h4>
          </div>
        </div>

        <div className={classes.miniContainer}>
          <div className={classes.imageContainer}>
            <Image src={newsImage} className={classes.image} alt={"Test"} />
          </div>
          <div className={classes.details}>
            <h1>Some title for news</h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Provident, rerum. Sapiente tempore, reiciendis soluta esse quia
              eius fugiat sequi quibusdam saepe necessitatibus at minus ratione
              omnis aperiam, reprehenderit id temporibus?
            </h4>
          </div>
        </div>
      </div>
      {/* ))} */}
    </>
  );
}

export default News;
