import React, { Component } from 'react';
import Firebase from '../Firebase/firebase';
import "bootstrap/dist/css/bootstrap.min.css";




export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputemail: '',
            inputpass: '',
            items: []
        };



        //binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    // retrieve data if the email and password is right
    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.inputemail;
        const inputpass = this.state.inputpass;
        let isLoggedin = false;

        //https://stackoverflow.com/questions/35785197/react-firebase-filtering-firebase-fetched-items-by-user-uid-value
        /* get data in Firebase Database */
        let itemRef = Firebase.database().ref('user').orderByChild("email").equalTo(email);
        itemRef.on('child_added', snapshot => {
            var data = {
                id: snapshot.key,
                value: snapshot.val()
            }
            //check the password
            if (inputpass !== data.value.password) {
                alert("Passwords don't match");

            }
            else{
                isLoggedin = true;
                let username = data.value.username;
                let email = data.value.email;
                let password = data.value.password;
                
                // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
                // https://www.robinwieruch.de/local-storage-react
                // store the data in localstorage
                localStorage.setItem('isLoggedin', isLoggedin);
                localStorage.setItem('username', isLoggedin ? username : '');
                localStorage.setItem('email', isLoggedin ? email : '');
                localStorage.setItem('password', isLoggedin ? password : '');

                this.props.history.push('/account');

                console.log(snapshot.val());

            }
            // console.log(data);
            // console.log(data.value.username)
            // console.log(snapshot.val());


        
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        });
    }


    


      render(){
            return(

            <div id="box" className = "container" >
                    <h1>User Login</h1>
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-sm-2">
                                <label>Email: </label>
                            </div>
                            <div className="col">
                                <input type="email" className="form-control" name="inputemail"
                                    placeholder="Email Address" onChange={this.handleChange}
                                    value={this.state.inputemail} required />
                            </div>
                        </div>


                        <br />
                        <div className="row">
                            <div className="col-sm-2">
                                <label>Password: </label>
                            </div>
                            <div className="col">
                                <input type="password" className="form-control" name="inputpass"
                                    placeholder="Password" onChange={this.handleChange} 
                                    value={this.state.inputpass} required />
                            </div>
                        </div>

                        <br />

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

        </div>



        )
    }





}