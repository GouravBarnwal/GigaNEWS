import React from "react";

const NewsItem =(props) => {
  

    let { title, description, imageUrl, newsUrl, author, date, source } =
      props;
    return (
      <div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>

          <img
            src={
              imageUrl
                ? imageUrl
                : "https://images.pushsquare.com/299c2398e114e/large.jpg"
            }
            className="card-img-top"
            alt="..."
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.pushsquare.com/299c2398e114e/large.jpg";
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>

            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {!author ? "Author" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }


export default NewsItem;
