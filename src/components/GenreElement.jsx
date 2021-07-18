import React, { Component } from 'react'

export default class GenreElement extends Component {
    render() {
        let {genres,changeGenre} = this.props;
        return (
            <ul class="list-group">
                        {
                            genres.map((cgObj)=>{
                                return (
                                    <li class="list-group-item" key={cgObj.id} onClick={()=>changeGenre(cgObj.name)}>{cgObj.name}</li>
                                )
                            })
                        }
                    </ul>
        )
    }
}