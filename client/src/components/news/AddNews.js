import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { NavLink, Link } from 'react-router-dom';
import { createNews } from '../store/actions/projectActions'
import '../style/signIn.css';
import swal from 'sweetalert'
import Editor from "nib-core";

class AddNews extends Component {
    state = { title: "", category: "", content: "", author: "", image: "", data: "", isLoading: false }
    componentDidMount() {
        fetch('http://localhost:4000/category/').then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            this.setState({ data: data })
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        let newsDetails = this.state;
        // return console.log("state", this.state)
        let title = newsDetails.title, category = document.getElementById("category").value,
            content = newsDetails.content, author = document.getElementById("author").value, image = newsDetails.image;

        let obj = { title, category, content, author, image };
        console.log("my obj", obj)
        await this.props.createNews(obj);
        let props = this.props
        if (props.status === "Success") {
            swal("Response", "Login Successful...", "success")
            this.props.history.push("/view-news");
        }
        else {
            this.setState({ isLoading: false })
            return swal("Response", "Login failed...", "error");
        }



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
        const MyEditor = () => <Editor />
        let state = this.state, drpData = state.data; console.log("drp data", drpData.data);
        // drpData = drpData.data ? drpData.data.map(o => o.name) : null;

        let dropList = drpData.data ? (
            drpData.data.map((o, i) =>
                <option id={o.id} key={o.id}> {o.name} </option>
            )
        ) : (
                <option value="2">Select 2</option>
            )
        console.log("Dropdowns", drpData);
        let local = JSON.parse(localStorage.getItem("admin")).admin;
        let name = `${local.firstname} ${local.othernames}`;
        return (
            <Preloader>
                <Placeholder>
                    <span >Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "" }}>
                    {/* <!-- Page Header --> */}
                    <div className="page-header row no-gutters py-4" style={{ height: "0px" }}>
                        <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                            {/* <h6 className="page-title">Admin News</h6> */}
                        </div>
                    </div>

                    <div className="container" style={{ background: "white", height: "auto" }}><br /><br />
                        <p className="" style={{ textAlign: "center", fontSize: "25px" }}>Create  News</p><br />
                        <form className="form-group" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-2">News Title : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control" id="title" placeholder="News Title" onChange={this.handleChange} />

                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2"> News Category: </div>
                                <div className="col-md-8">
                                    {/* <input type="text" className="form-control" id="category" placeholder="News Caategory" onChange={this.handleChange} /> */}
                                    <select className="custom-select" id="category">
                                        <option  >Select Category</option>
                                        {dropList}
                                    </select>
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2">News Content : </div>
                                <div className="col-md-8">
                                    {/* <Editor className="form-control" id="content" style={{ minHeight: "100px" }} onChange={console.log("jjjj")} /> */}
                                    <input type="text" className="form-control" id="content" placeholder="News Content" onChange={this.handleChange} />
                                </div>
                            </div><br /><br />
                            <div className="row">
                                <div className="col-md-2">News Author : </div>
                                <div className="col-md-8">
                                    <input type="text" className="form-control " disabled={true} id="author" placeholder="News Author" value={name ? name : 'Loading...'} onChange={this.handleChange} />
                                </div>
                            </div><br /><br />

                            {/* <img src="" height="200" id="image-box" alt="Hello" /> */}

                            <div className="row">

                                <div className="col-md-2">Upload Image : </div>
                                <div className="col-md-8">
                                    <input type="file" className="form-control" id="images" placeholder="City" onChange={this.previewFile} />
                                    <img src="" height="200" id="image-box" alt="" />
                                </div>
                            </div><br /><br />

                            <div className="row">
                                <div className="col-md-2"> </div>
                                <div className="col-md-8">
                                    <button className="mb-2 btn btn-primary mr-2 col-md-12 glyphicons glyphicons-star" disabled={this.state.isLoading ? true : false}>
                                        {this.state.isLoading ? <span><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Creating News...</span> : "Create News"}
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
        createNews: (news) => {
            return new Promise((resolve) => {
                dispatch(createNews(news, (res) => {
                    resolve(res);
                }))
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNews)