import axios from "axios";
import React, { Components } from "react";

class MealPrint extends React.Component{
    state = {details : [], }

    componentDidMount(){
        let data;
        axios.get(
            'http://localhost:8000'
        )
        .then(
            res => {
                data=res.data;
                this.setState({
                    details:data
                });
            }
        )
        .catch(err => { })
    }

    render(){
        return(
            <div>
                <header>Data Generated from DJANGO</header>
                <hr></hr>
                {this.state.details.map((output, id) => (
                    <div key={id}>
                        <div>
                        <h2>{output.nazwa}</h2>
                        <h2>{output.opis}</h2>
                        <h2>{output.photo}</h2>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default MealPrint