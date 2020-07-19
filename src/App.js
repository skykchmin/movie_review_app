import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Movie from './Movie';
import "./App.css"

class App extends React.Component{ // React는 자동적으로 나의 class component의 render method를 실행한다. 사용하는 이유: state는 object이고 component의 data를 넣는 공간 이 있는데 데이터가 변하기 떄문에
  // set State를 호출할 때마다 react는 새로운 state와 함께 render function을 호출한다.
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => { //비동기화 데이터를 기다린다음에 영화가 나오게한다.
    const {
      data: { 
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies, isLoading: false}); // movie를 리스트안에 넣는다
  };

  componentDidMount(){
   this.getMovies();
  }
  
  render(){
    const { isLoading, movies } = this.state;

  return (
  <section className="container">
    {isLoading ? (
    <div className="loader">
        <span className="loader__text">"Loading" </span>
    </div>
   ) : (
    <div className="movies">
      {movies.map(movie => (
        <Movie 
          key = {movie.id}
          id={movie.id} 
          year={movie.id} 
          title={movie.title} 
          summary={movie.summary}
          poster={movie.medium_cover_image}
          genres={movie.genres}
        />
      ))}
    </div>
  )}</section>
  );
  }
}
export default App;