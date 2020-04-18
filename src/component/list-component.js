import React, { Component } from 'react';
import Firebase from './Firebase/firebase';
import "bootstrap/dist/css/bootstrap.min.css";


export default class MenuList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // inputname: '',
            // inputquantity: '',
            items: []
        };

        this.selectOption = this.selectOption.bind(this);

    }

    componentWillMount() {
        /* Create reference to messages in Firebase Database */
        let itemRef = Firebase.database().ref('bakery');//.orderByKey().limitToLast(100);
        itemRef.on('value', snapshot => {
            let items = snapshot.val();
            let newState = [];


            //get all the data from the db
            for (let item in items) {
                newState.push(
                    {
                        id: item,
                        name: items[item].name,
                        image: items[item].image,
                        ingredient: items[item].ingredient

                    }
                );
            }//end for
            // set the data
            this.setState(
                { items: newState });
        })
    }// end retrieve data from firebase



    // https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react
    selectOption(e) {
        e.preventDefault(); // prevent form submit from reloading the page
        let name = e.target.value;

        // passing the id to another window
        this.props.history.push({
            pathname: '/item',
            data: name
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.items.map((item) => {
                    return (
                        <div className="card" key={item.id}>
                            <img className="card-img-top" src={item.image} alt="card" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.ingredient}</p>

                                <button href="#" className="btn btn-primary btn-lg btn-block"
                                    onClick={this.selectOption} value={item.name}>View</button>


                            </div>
                        </div>



                    )
                })}






                {/* <ul>
            {this.state.items.map((item) =>{
            return (
              <li key={item.id}>
                <h1>{item.name}</h1>
                <h2>{item.ingredient}</h2>
                <h3>{item.image}</h3>
              </li>
            )})}
          </ul> */}
            </div>
        )
    }



}