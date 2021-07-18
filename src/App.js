import logo from "./logo.svg";
import "./App.css";
import MoviesPage from "./components/MoviesPage";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import New from "./components/New";
import React,{ Component} from "react"

export default class App extends Component {
  state = {
    movies: [],
  }

  handleDelete = (id) => {
    let arr=this.state.movies.filter((movie)=>{
        return movie._id !== id;
    })
    this.setState({
        movies : arr,
    })
  }

  async componentDidMount() {
    let response = await fetch("https://react-backend101.herokuapp.com/movies");
    let jsonMovies = await response.json();
    this.setState({
      movies: jsonMovies.movies,
    });

  }

  addMovie = (obj) =>{
    let {title,genre,stock,rate} = obj;

    let genreObj = [{ _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" }
    ];

    for(let i=0; i<genreObj.length; i++){
      if(genreObj[i].name==genre){
        genre=genreObj[i];
      }
    }
    
    let movie = {
      _id:Date.now(),
      title,
      genre,
      dailyRentalRate:rate,
      numberInStock:stock
    }
console.log(movie);
    let copyOfActualMovies= [...this.state.movies,movie];

    this.setState({
      movies:copyOfActualMovies
    })
  }
  render() {
    return (
      <>
        <Navbar></Navbar>
        <Switch>
          <Route path="/new" render={
            (props)=>{
              return (
                <New {...props}
                addMovie={this.addMovie}
                >
                </New>
              )
            }
          }></Route>
          <Route path="/login" component={Login}></Route>
          {/* <Route path="/" exact component={MoviesPage}></Route> */}
          <Route path="/" render={(props)=>{
            return (
              <MoviesPage {...props}
              handleDelete={this.handleDelete}
              movies={this.state.movies}
              ></MoviesPage>
            )
          }}></Route>
        </Switch>
      </>
    );
  }
}
