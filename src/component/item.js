import React, { Component } from 'react';
import Firebase from './Firebase/firebase';

// import { FaUser } from 'react-icons/fa';


export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            selectedCheck: false,
            radioCheck: false,
            radioButton: '',
            newData: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.change = this.change.bind(this);

    }


    componentWillMount() {
        const { data } = this.props.location

        /* Create reference to messages in Firebase Database */
        let itemRef = Firebase.database().ref('bakery').orderByChild("name").equalTo(data);;//.orderByKey().limitToLast(100);
        itemRef.on('child_added', snapshot => {
            var item = {
                id: snapshot.key,
                value: snapshot.val()
            }
            console.log(item.value);
            // alert(data);

            let name = item.value.name;
            let image = item.value.image;
            let ingredient = item.value.ingredient;
            let newState = [];
            newState.push(
                {
                    name: name,
                    image: image,
                    ingredient: ingredient

                }
            );

            // set the state with data
            this.setState({ newData: newState });

        })
    }// end retrieve data from firebase


    handleChange(e) {
        this.setState({
            selectedValue: e.target.value,
            selectedCheck: true
        });

        console.log(e.target.value);

    }
    change(e) {
        this.setState({
            radioButton: e.target.value,
            radioCheck: true
        });

        console.log(e.target.value);

    }




    handleSubmit(e) {
        e.preventDefault(); // prevent form submit from reloading the page
        const isLoggedin = localStorage.getItem('isLoggedin') === 'true';


        var { data } = this.props.location;
        let quantity = this.state.selectedValue;
        let radCheck = this.state.radioCheck;
        let selCheck = this.state.selectedCheck;
        let radButton = this.state.radioButton;
        let price = 0;
        // // https://stackoverflow.com/questions/13743292/how-to-store-a-dictionary-object-in-javascript-localstorage
        // localStorage.setItem('dict', JSON.stringify(dict));

        // this.props.history.push('/');

        //if logged in
        if (isLoggedin) {
            // if all the options are selected
            if (radCheck && selCheck) {
                const email = isLoggedin ? localStorage.getItem('email') : '';

                //add in db
                const itemRef = Firebase.database().ref('order');


                if(radButton === "S")
                {
                    price = 10.99;
                }
                if (radButton === "M") 
                {
                    price = 12.99;
                } 
                else 
                {
                    price = 14.99;
                }


                const item =
                {
                    email: email,
                    name: data,
                    quantity: quantity,
                    size: radButton,
                    price: price
                }

                /* Send the message to Firebase */
                itemRef.push(item);

                // clear the input
                this.setState(
                    {
                        data: '',
                        selectedValue: ''

                    }
                )
                this.props.history.push('/');
            }
            else {
                alert("please select the options before you preoceed");
            }

        }
        else {
            // //add in db
            // const itemRef = Firebase.database().ref('order');

            // const item =
            // {
            //     name: data,
            //     quantity: quantity
            // }

            // /* Send the message to Firebase */
            // itemRef.push(item);

            // // clear the input
            // this.setState(
            //     {
            //         data: '',
            //         selectedValue: ''

            //     }
            // )

            alert("please login before you preoceed");
            this.props.history.push('/login');


        }
    }



    render() {

        return (
            <div className="jumbotron">

                {this.state.newData.map((i) => {
                    return (
                        <div className="container">

                            <h2>{i.name}</h2>
                            <img id="itemimage" src={i.image} alt="card" />

                            <h5>ingredient: {i.ingredient}</h5>
                            <br />
                            <form >
                                <h5>Size: </h5>
                                {/* https://stackoverflow.com/questions/27784212/how-to-use-radio-buttons-in-reactjs */}
                                <div className="radio" onChange={this.change} >
                                    <label><input type="radio" name="price" value="S" />Small &euro;10.99</label>
                                    <br />
                                    <label><input type="radio" name="price" value="M" />Medium &euro;12.99</label>
                                    <br />
                                    <label><input type="radio" name="price" value="L" />Large &euro;14.99</label>
                                </div>



                                {/* https://stackoverflow.com/questions/29108779/how-to-get-selected-value-of-a-dropdown-menu-in-reactjs */}
                                <select required className="custom-select"
                                    onChange={this.handleChange}
                                    value={this.state.selectedValue}  >
                                    <option value="" disabled >Quantity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <button onClick={this.handleSubmit} className="btn btn-primary btn-lg btn-block">Add</button>
                            </form>
                        </div>

                    );
                })}




            </div>
        )
    }
}