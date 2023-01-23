import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [];

  constructor() {
    super();
    // console.log("Hi const news");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    // console.log("akdjf");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e1ab98a0baea4fb6b41081a85f0bc077&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
    });
  }

  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e1ab98a0baea4fb6b41081a85f0bc077&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ page: this.state.page - 1, articles: parsedData.articles });
  };

  handleNextClick = async () => {
    console.log("Next");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e1ab98a0baea4fb6b41081a85f0bc077&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };
  render() {
    // console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center"> Top headlines for you</h1>

        <div className="row my-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  imageurl={
                    element.urlToImage != null
                      ? element.urlToImage
                      : "https://cdn.cp.adobe.io/content/2/dcx/f30bb7f4-7e4e-43c9-9c27-cede202b0df3/rendition/preview.jpg/version/1/format/jpg/dimension/width/size/1200"
                  }
                  title={
                    element.title != null
                      ? element.title.slice(0, 40) + "..."
                      : "Title Not available:404"
                  }
                  discription={
                    element.description != null
                      ? element.description.slice(0, 82) + "..."
                      : "No description avialable. Click on Read more for more info."
                  }
                  url={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page >=
              Math.floor(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

// this.state.articles.map(() => {});
export default News;
