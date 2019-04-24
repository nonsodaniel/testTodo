import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { signUp } from '../store/actions/authActions'
import swal from 'sweetalert'
import '../style/signIn.css'

class AddAdmin extends Component {
    componentDidMount() {
    }
    state = {
        firstname: "",
        othernames: "",
        email: "",
        phone: "",
        password: "",
        image: "",
        isLoading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Isloading", this.state.isLoading)
        this.setState({ isLoading: true });
        let regDetails = this.state;
        let firstname = regDetails.firstname, othernames = regDetails.othernames,
            email = regDetails.email, phone = regDetails.phone,
            image = regDetails.image, password = regDetails.password;


        let obj = { firstname, othernames, email, phone, image, password };
        console.log("Objects", obj)
        this.props.createAdmin(obj)


    }

    previewFile = () => {
        var preview = document.getElementById("image-box");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();

        reader.addEventListener("load", () => {
            preview.src = reader.result;
            let imgStr = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
            this.setState({ image: imgStr })
            console.log("My file result", imgStr)
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {

        // let props = this.props; console.log(props.status)
        // if (props.status === "Success") {
        //     setTimeout(() => {
        //         swal("Response", "Login Successful...", "success")
        //         this.props.history.push("/");
        //     }, 2500)
        // }

        // if (props.status === "error") {
        //     setTimeout(() => {
        //         return swal("Response", "Login failed...", "error")
        //     }, 2500)
        //     this.setState({ isLoading: false })
        // }

        return (
            <div className="main-content-container container-fluid px-4" style={{ background: "" }}>
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h6 className="page-title">Admin Registration</h6>
                    </div>
                </div><br />

                <div className="container" style={{ background: "white", height: "auto" }}><br />
                    <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Register</p>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-2">First Name : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="firstname" placeholder="First Name" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Other Names : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="othernames" placeholder="Other Names" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Email : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="email" placeholder="name@email.com" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Phone Number : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="phone" placeholder="phone" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">School : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="school" placeholder="School" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Date of Birth : </div>
                            <div className="col-md-8">
                                <input type="date" className="form-control" id="dob" placeholder="Date of Birth" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />
                        <div className="row">
                            <div className="col-md-2">Password : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="password" placeholder="*************" onChange={this.handleChange} />
                            </div>
                        </div><br /><br />

                        <img src="" height="200" id="image-box" alt="img" />

                        <div className="row">
                            <img src="" height="200" id="image-box" alt="" />
                            <div className="col-md-2">Upload Image : </div>
                            <div className="col-md-8">
                                <input type="file" className="form-control" id="images" placeholder="City" onChange={this.previewFile} />
                            </div>
                        </div><br /><br />

                        <div className="row">
                            <div className="col-md-2"> </div>
                            <div className="col-md-8">
                                <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star" disabled={this.state.isLoading ? true : false}>
                                    {this.state.isLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Registering User...</span> : "Register"}
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { authMessage, registerData, status } = state.auth;
    return {
        authMessage,
        registerData,
        status
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (admin) => dispatch(signUp(admin))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin)