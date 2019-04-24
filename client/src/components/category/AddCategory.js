import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { NavLink, Link } from 'react-router-dom';
import { createCategory } from '../store/actions/projectActions'
import swal from 'sweetalert';
import '../layouts/swal.css'

class AddCategory extends Component {
    state = { name: "", code: "", data: {}, isLoading: false }
    componentDidMount() {
        // if(local) return <Redirect to = '/' />
    }


    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        let state = this.state;
        this.setState({ isLoading: true });
        let catDetails = this.state;
        let name = catDetails.name, code = catDetails.code;

        let obj = { name, code };
        await this.props.createCategory(obj);
        console.log("handle", this.state)
        let props = this.props;
        if (props.status === "Success") {
            setTimeout(() => {
                // this.setState({ name: "", code: "", isLoading: false, category: props.status });
                swal("Response", "Category Created Successfully", "success");
                this.props.history.push('/')
            }, 2500)
        } else {
            setTimeout(() => {
                swal("Response", "Failed to create Category", "error");
                this.setState({ isLoading: false });
            }, 2500)
        }
    }
    render() {

        // console.log("Cate", this.props)
        // let props = this.props;
        // if (props.status === "Success") {
        //     setTimeout(() => {
        //         // this.setState({ name: "", code: "", isLoading: false, category: props.status });
        //         swal("Response", "Category Created Successfully", "success");
        //         this.props.history.push('/')
        //     }, 2500)
        // }

        // if (props.status === "error") {
        //     setTimeout(() => {
        //         swal("Response", "Failed to create Category", "error");
        //         this.setState({ isLoading: false });
        //     }, 2500)
        // }

        return (
            <div className="main-content-container container-fluid px-4" id="overlay" style={{ background: "" }}>
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        {/* <h6 className="page-title">Create Category</h6> */}
                    </div>
                </div>

                <div className="container" style={{ background: "white", height: "408px" }}><br /><br />
                    <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Create a Category</p><br /><br />
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-2">Category Name : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="name" placeholder="Category name" onChange={this.handleChange} disabled={this.state.isLoading ? true : false} />
                            </div>
                        </div><br /><br />


                        <div className="row">
                            <div className="col-md-2">Category Code : </div>
                            <div className="col-md-8">
                                <input type="text" className="form-control" id="code" placeholder="News code" onChange={this.handleChange} disabled={this.state.isLoading ? true : false} />
                            </div>
                        </div><br /><br />



                        <div className="row">
                            <div className="col-md-2"> </div>
                            <div className="col-md-8">
                                <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star" disabled={this.state.isLoading ? true : false}>
                                    {this.state.isLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Creating Category...</span> : "Create Category"}
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
    console.log("Map props", state)
    const { projectMessage, projectData, status } = state.project;
    return {
        projectMessage,
        projectData,
        status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCategory: (category) => {
            return new Promise((resolve) => {
                dispatch(createCategory(category, (res) => {
                    resolve(res);
                }))
            })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
