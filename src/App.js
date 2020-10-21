import React from "react";
import "./App.css";
import jsondata from "./colleges.js";
import collegeImg1 from "./asset/college_02.jpg";
const loadData = () => JSON.parse(JSON.stringify(jsondata));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: loadData().colleges.slice(0, 10),
      counter: 10,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  render() {
    return <div className="App">{this.printcolleges(this.state.colleges)}</div>;
  }

  printcolleges = (colleges) => {
    let arrayCollege = [];
    for (let i = 0; i < colleges.length - 1; i = i + 2) {
      arrayCollege.push(
        <div className="college_row" key={i}>
          <div className="college_tile tile1">
            {this.printtile(colleges[i])}
          </div>
          <div className="college_tile tile2">
            {this.printtile(colleges[i + 1])}
          </div>
        </div>
      );
    }
    return arrayCollege;
  };

  printtile = (college) => {
    return (
      <React.Fragment>
        <div
          className="college_image"
          style={{ backgroundImage: "url(" + collegeImg1 + ")" }}
        >
          <div className="layer">
            {" "}
            <div className="tags">
              {college.tags.map((tag, i) => (
                <span className="tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
            <span className="ranking">#{college.ranking}</span>
            <div className="ratings">
              <p className="rating">
                <span className="rating_value">{college.rating}</span>/5
              </p>
              <p className="rating_remarks">{college.rating_remarks}</p>
            </div>
            <span className="promoted">PROMOTED</span>
          </div>
        </div>
        <div className="college_details">
          <div className="college_loc_details">
            <p className="title">{college.college_name}</p>
            <p className="nearest_metro">
              {college.nearest_place[0]} |
              <span className="nearest_bus"> {college.nearest_place[1]}</span>
            </p>
            <p className="offer_text">{college.offertext}</p>
          </div>
          <div className="college_fee_details">
            <p className="original_fees_main">
              <span className="original_fees">₹{college.original_fees} </span>
              <span className="discount">‧ {college.discount}</span>
            </p>
            <p className="discounted_fees">₹{college.discounted_fees}</p>
            <p className="fees_cycle">{college.fees_cycle}</p>
            <p className="amenties">{this.printamen(college.amenties)}</p>
          </div>
        </div>
      </React.Fragment>
    );
  };

  printamen = (amenties) => {
    let amentiearr = [];
    amenties.forEach((amentie, index) => {
      if (index === 0) {
        amentiearr.push(<span key={index}>{amentie}</span>);
      } else {
        amentiearr.push(<span key={index}> ‧ {amentie}</span>);
      }
    });
    return amentiearr;
  };

  componentDidMount() {
    this.scrollListener = window.addEventListener("scroll", (e) => {
      this.handleScroll(e);
    });
  }

  handleScroll = () => {
    var lastLi = document.querySelector(".college_row:last-child");
    if (lastLi) {
      var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
      var pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset >= lastLiOffset) {
        this.loadMore();
      }
    }
  };

  loadMore = () => {
    this.setState((state) => {
      if (state.counter === 50) {
        return {
          colleges: [...state.colleges, ...loadData().colleges.slice(0, 10)],
          counter: 10,
        };
      }
      return {
        colleges: [
          ...state.colleges,
          ...loadData().colleges.slice(state.counter, state.counter + 10),
        ],
        counter: state.counter + 10,
      };
    });
  };
}

export default App;
