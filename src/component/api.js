import React, { Component } from 'react';


export default class api extends Component {
    constructor() {
        super();
        this.state = { data: [] };
    }


    async componentDidMount() {
        const response = await fetch(`https://bakeryfr-6c98c.firebaseio.com/order/-M5Mv5Tlfk5p0m-tsjNR.json`)
        const json = await response.json();    
        console.log(typeof(json)); 
        this.setState({ data: json });
         
    }


    render() {
        return (
            <div>
                    { this.state.data.map(el => 
                        (
                            <div>
                                <li>
                                    {el.name}
                                </li>
                            </div>

                        ))}
            </div>
        );
    }

}