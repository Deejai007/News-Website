import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, discription, imageurl, url } = this.props;
    return (
      <div>
        <div className="card my-4 " style={{ width: "18rem }}>
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>

            <a href={url} target="_blank" className="btn btn-primary btn-sm">
              Read more...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
