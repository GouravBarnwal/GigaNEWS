import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // Removed unused totalResults variable
  const [hasMore, setHasMore] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `/.netlify/functions/news?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    const articles = parsedData.articles || [];
    const totalResults = parsedData.totalResults || 0;
    props.setProgress(70);
    setArticles(articles);
    // setTotalResults(totalResults); // No longer needed
    setLoading(false);
    setHasMore(articles.length > 0 && articles.length < totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - GigaNEWS`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `/.netlify/functions/news?country=${props.country}&category=${props.category}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    const newArticles = parsedData.articles || [];
    const totalResults = parsedData.totalResults || 0;
    setArticles(articles.concat(newArticles));
    // setTotalResults(totalResults); // No longer needed
    setPage(nextPage);
    setHasMore(newArticles.length > 0 && articles.length + newArticles.length < totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px px' , marginTop:"90px"}}><b><i>GigaNEWS - Top {capitalizeFirstLetter(props.category)} Headlines</i></b></h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4 my-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
