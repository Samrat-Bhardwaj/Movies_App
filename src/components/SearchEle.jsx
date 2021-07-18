import React, { Component } from 'react'

export default class SearchEle extends Component {
    render() {
        let {searchText,handleSearch} = this.props;
        return (
            <input className="search" value={searchText} onChange={handleSearch}></input>
        )
    }
}
