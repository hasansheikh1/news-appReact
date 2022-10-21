import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const getNews = (e) => {
    // axios.get("");
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: query,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "1cede07cd8mshdfa8ae0bcfae0ccp11f8fcjsnbc26c5e53856",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.value);
        setData(response.data.value);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={getNews}>
        {/* <input
          type="text"
          id="cityName"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Enter City.."
        /> */}

<div class="wrap">
   <div class="search">
      <input id="cityName" onChange={(e)=>{
        
        setQuery(e.target.value);

      }} type="text" className="searchTerm" placeholder="What are you looking for?"/>
      <button type="submit" className="searchButton">
        Search!
     </button>
   </div>
</div>


        <div>
          {data.map((eachPost) => (
            <div className="post" key={eachPost.name}>
              <h1>{eachPost.name}</h1>
              <span>{moment(eachPost.datePublished).format('MMMM Do YYYY, h:mm: a')}</span>
              <h3>{eachPost.description}</h3>

              <button className="btn-read" ><a className="btn-read1" target="_blank" href={eachPost.url}>Read More</a></button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default App;
