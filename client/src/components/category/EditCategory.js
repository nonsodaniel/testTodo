


import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { updateCategory } from '../store/actions/projectActions'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
// import '../style/signIn.css';
import swal from 'sweetalert'

class EditCategory extends Component {

    state = { category: [], isLoading: false, name: "", code: "", isUpdated: false }

    componentDidMount() {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "www.acadatrends.com/api"

        let id = this.props.match.params.id;
        fetch(`${base_url}/category/${id}`).then((response) => {
            return response.json()
        }).then((categoryData) => {
            console.log(this.props)
            let data = categoryData.data
            console.log("yes", categoryData.data)
            this.setState({ code: data.code, name: data.name })

        })
        console.log()
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    handleSubmit = (e) => {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "www.acadatrends.com/api"

        e.preventDefault()
        let id = this.props.match.params.id;
        let name = document.getElementById("name").value, code = document.getElementById("code").value;

        let obj = { name, code };
        console.log("obj", obj);

        fetch(`${base_url}/category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(localStorage.getItem("admin")).token
            },
            body: JSON.stringify(obj)
        }).then((res) => {
            res.json().then((response) => {
                console.log("Update response", response)
                if (response.statuscode === 200) {
                    swal("Response", "Successfully updated Category", "success");
                    setTimeout(this.props.history.push('/view-category'), 2000)

                } else {
                    return swal("Response", "Update Failed", "failed")
                }

            })
        })

    }

    render() {
        let state = this.state;
        console.log("this state", state)

        return (
            <Preloader>
                <Placeholder>
                    <span >Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "" }}>
                    {/* <!-- Page Header --> */}
                    <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                            {/* <h6 className="page-title">Admin category</h6> */}
                        </div>
                    </div>

                    <div className="container" style={{ background: "white", height: "400px" }}><br /><br />
                        <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Edit  category</p><br />
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-2">Category Code : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={state ? state.code : ""} id="code" placeholder="category Code" onChange={this.handleChange} />
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2">Category Name : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" value={state ? state.name : ""} ref="content" id="name" placeholder="category Name" onChange={this.handleChange} />
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2"> </div>
                                <div className="col-md-8">
                                    <button className={this.state.isLoading ? "mb-2 btn btn-primary mr-2 col-md-12 disabled" : "mb-2 btn btn-primary mr-2 col-md-12"} >
                                        {this.state.isLoading ? "Updating category..." : "Update category"}
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </Preloader>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updatecategory: (category) => dispatch(updatecategory(category))
//     }
// }


export default EditCategory

