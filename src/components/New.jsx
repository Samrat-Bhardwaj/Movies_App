import React, { Component } from "react";


export default class New extends Component {
    state = {
        data: {
          title: "",
          genre: "",
          stock: "",
          rate: "",
        },
      };
      
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.addMovie(this.state.data);
      };
      
      handleChange = (e) => {
          let id=e.currentTarget.id;
          let value=e.target.value;
      
          let oldObj={...this.state.data};
          oldObj[id]=value;
      
          this.setState({
              data:oldObj,
          })
      };
  render() {
    let { title, genre, stock, rate } = this.state.data;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Title:
            <input id="title" type="text" value={title} onChange={this.handleChange}></input>
          </label>
          <label htmlFor="genre">
            Genre:
            <select id="genre" value={genre} onChange={this.handleChange}>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
            </select>
          </label>
          <label htmlFor="stock">
            Stock:
            <input id="stock" type="number" value={stock} onChange={this.handleChange}></input>
          </label>
          <label htmlFor="rate">
            Rate:
            <input type="number" id="rate" value={rate} onChange={this.handleChange}></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}
