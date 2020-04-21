import React, { Component } from 'react';
import Firebase from './Firebase/firebase';
import "bootstrap/dist/css/bootstrap.min.css";


export default class MenuList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // inputname: '',
            selectedValue: '',
            items: []
        };

        this.selectOption = this.selectOption.bind(this);
        this.change = this.change.bind(this);

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

    change(e) {
        let selected = e.target.value;
        let snack = '1';
        let cake = '2';
        let jelly = '3';


        if (selected === snack) {

            let itemRef = Firebase.database().ref('bakery').orderByChild("type").equalTo(snack);
            itemRef.on('value', snapshot => {

                let newState = [];
                let items = snapshot.val()



                //get all the data from the db
                for (let item in items) {

                    // console.log(item)
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


            });

        }

        else if (selected === cake) {

            let itemRef = Firebase.database().ref('bakery').orderByChild("type").equalTo(cake);
            itemRef.on('value', snapshot => {

                let newState = [];
                let items = snapshot.val()



                //get all the data from the db
                for (let item in items) {

                    // console.log(item)
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


            });

        }
        else if (selected === jelly) {

            let itemRef = Firebase.database().ref('bakery').orderByChild("type").equalTo(jelly);
            itemRef.on('value', snapshot => {

                let newState = [];
                let items = snapshot.val()



                //get all the data from the db
                for (let item in items) {

                    // console.log(item)
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


            });

        }
        else {
            let itemRef = Firebase.database().ref('bakery')
            itemRef.on('value', snapshot => {

                let newState = [];
                let items = snapshot.val()



                //get all the data from the db
                for (let item in items) {

                    // console.log(item)
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


            });
        }








        this.setState({
            selectedValue: e.target.value,
        });
    }





    render() {
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2">
                        <select required className="custom-select"
                            onChange={this.change}
                            value={this.state.selectedValue}  >
                            <option value="" disabled selected >Filter</option>
                            <option value="1">Snacks</option>
                            <option value="2">Cake</option>
                            <option value="3">Jelly</option>
                            <option value="4">All</option>

                        </select>

                    </div>
                </div>
                <br />

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