import React, { Component } from "react";
import { getMovies } from "./temp/MovieService";
import Pagination from "./Pagination";
import GenreElement from "./GenreElement";
import { Link} from "react-router-dom"

// ????
import SearchEle from "./SearchEle"

export default class MoviesPage extends Component {
  state = {
    genres:[{id:1,name:"All Genres"}],
    searchText : "",
    limit : 4,
    currentPage:1,
    currGenre:"All Genres"
  }

  

  handleSearch = (e) => {
    let task = e.target.value;
        this.setState({
            searchText: task
        })
  }

  sortRating = (e) =>{
      let cName = e.target.className;
      let { movies } = this.props;
      let sortedArr;
      if(cName=="fas fa-sort-up"){
        sortedArr= movies.sort((a,b)=>{
            return b.dailyRentalRate - a.dailyRentalRate;
        })
      } else {
        sortedArr= movies.sort((a,b)=>{
            return a.dailyRentalRate - b.dailyRentalRate;
        })
      }

      this.setState({
          movies:sortedArr,
      })
  }

  changelimit = (e) => {
      this.setState({
          limit:e.target.value,
      })
  }

  changeCurrentPage = (pageNumber) => {
      this.setState({
          currentPage: pageNumber,
      })
  }

  changeGenre = (name) =>{
    this.setState({
        currGenre:name,
        searchText:"",
    })
  }

  async componentDidMount() {
    // console.log(2);
    let resp = await fetch("https://react-backend101.herokuapp.com/genres");
    let jsonGenres = await resp.json();
    this.setState({
        genres: [...this.state.genres, ...jsonGenres.genres]
    });
}

  render() {
      let {genres,searchText,limit, currentPage,currGenre} = this.state;
      let {movies,handleDelete} =this.props;
      let filterArr=movies;
      if(currGenre!=="All Genres"){
        filterArr=filterArr.filter((movieObj)=>{
            return movieObj.genre.name == currGenre;     
        })
      }
      
    //   taki genre vali sprting se ye effect ma ho
      if(searchText!==""){
          filterArr=movies.filter((movie)=>{
        let title = movie.title.trim().toLowerCase();
        return title.includes(searchText.toLowerCase());
      })
      }

      
      // orignial array k according h ye formulae
      let numberOfPages=Math.ceil(filterArr.length/limit);
      let pageNumberArr=[];
      for(let i=0; i<numberOfPages; i++){
        pageNumberArr.push(i+1);
      }
      let si=(currentPage-1)*limit;

      // bina number use kre vo string ban jara tha
    let ei=Number(si)+Number(limit);
    filterArr=filterArr.slice(si,ei);
    
    return (
        
        <div>
            <div className="row">
                <div className="col-3">
                    <GenreElement
                    genres={genres}
                    changeGenre={this.changeGenre}
                    ></GenreElement>
                </div>
                
                <div className="col-9">
                    <button className="btn btn-primary">
                        <Link to="/New" className="text-light">New</Link>
                    </button>
                    <input className="search" value={this.state.searchText} onChange={this.handleSearch}></input>
                    <input type="number" className="col-1"
                        placeholder="no of elements/page"
                        value={limit}
                        onChange={this.changelimit}
                    />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Genre</th>
                                <th scope="col">
                                    <i class="fas fa-sort-up" onClick={this.sortRating}></i>
                                        Rating
                                    <i class="fas fa-sort-down" onClick={this.sortRating}></i>
                                </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                                {
                                    filterArr.map((movie)=>{
                                        return (
                                            <tr scope="row">
                                                <td>{movie.title}</td>
                                                <td>{movie.genre.name}</td>
                                                <td>{movie.dailyRentalRate}</td>
                                                <td><button className="btn btn-danger" onClick={()=>{handleDelete(movie._id)}}>Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>

                    </table>
                    <Pagination
                    pageNumberArr ={pageNumberArr} 
                    changeCurrentPage={this.changeCurrentPage}
                    currentPage={currentPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    )
  }
}

