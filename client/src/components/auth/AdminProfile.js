


import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
// import { updateNews } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import pic from '../style/images/admin_dp.png'
// import '../style/signIn.css';
import swal from 'sweetalert'

class AdminProfile extends Component {

    state = { isLoading: false }

    componentDidMount() {
        let id = JSON.parse(localStorage.getItem("admin")).admin._id; console.log("my data", id)
        fetch(`http://localhost:4000/admin/${id}`).then((res) => {
            return res.json();
        }).then((data) => {
            console.log("admins", data); this.setState({ admin: data })

        })

        // this.setState({ adminProfile: newsData.data.length ? newsData.data : null })
    }

    render() {


        return (
            <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}

                <br />
                <div className="row">
                    {/* <!-- Users Stats --> */}

                    <div className="col-lg-8 col-md-8 col-sm-8 mb-4">
                        <div className="card card-small" style={{ marginTop: "79px", height: "372px" }}>
                            <div className="col-md-6"><h6 className="m-0">Edit your Profile</h6></div>
                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                            </div><br />

                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                            </div><br />

                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                            </div><br />

                            <div className="row">
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value="Hello world" />
                                </div>
                            </div> <br />
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4 mb-4">
                        <div className="card card-small" style={{ height: "400px", marginTop: "79px" }}>
                            <div className="d-flex justify-content-center" style={{ height: "158px", marginTop: "-77px", width: "52%", marginLeft: "77px" }}>
                                <img src={pic} className="rounded-circle" alt="hello" style={{ width: "159px", height: "159px" }} />
                            </div><br />
                            <h5 style={{ fontWeight: "600", textAlign: "center", fontSize: "20px" }}>Ihedioha Chinosno</h5>
                            <p style={{ fontFamily: "Roboto,sans-serif", fontSize: "15px", textAlign: "center", fontWeight: "300" }}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                 sed do eiusmod tempor incididunt ut labore et dolore magna
                                  aliqua. Ut enim ad minim veniam, quis nostrud
                                   exercitation ullamco laboris nisi ut aliquip consequat.
                            </p>
                        </div>
                    </div>

                    {/* end row */}
                </div>








            </div >

        )
    }
}





export default AdminProfile

