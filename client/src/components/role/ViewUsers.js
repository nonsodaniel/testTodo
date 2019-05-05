import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import '../style/datatable.css'
import swal from 'sweetalert';
import moment from 'moment'


const $ = require('jquery');
$.DataTable = require("datatables.net")

class ViewUsers extends Component {

    state = { user: [], isLoading: false, isEdit: false }

   async  componentDidMount() {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "http://acada.herokuapp.com/api"

       await fetch(`${base_url}/user/`).then((response) => {
            return response.json()
        }).then((userData) => {
            console.log("yes", userData.data)
            this.setState({ user: userData.data.length ? userData.data : [] });
            $("#example").DataTable()
        })





    }

    handleEdit = (e) => {
        console.log(e.target.id)
        this.setState({ isEdit: true })
        this.props.history.push(`/edit-user/${e.target.id}`)
    }

    handleDelete = (e) => {
        console.log(e.target.id)
        let id = e.target.id;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to retrieve",
            icon: "warning",
            buttons: true,
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:4000/user/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-type': "application/json"
                        }
                    }).then((res) => {
                        res.json()
                    }).then((data) => {
                        console.log("data", data)
                        swal("File successfully deleted", {
                            icon: "success"
                        });
                    })

                }
            })
    }

    render() {
        if (this.state.isEdit) {

        }
        console.log("render", this.state)
        const mydata = this.state.user;
        console.log("tunde", mydata)

        let userList = mydata.length ? (
            mydata.map((o, i) => {
                console.log("my data", o);
                return (
                    <tr key={o.id}>
                        <td>{i + 1}</td>
                        <td>{o.firstname}</td>
                        <td>{o.othernames}</td>
                        <td>{o.email}</td>
                        <td>{o.phone}</td>
                        <td>{o.school}</td>
                        <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o.id}><i className="material-icons" id={o.id} style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
                        <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o.id}><i className="material-icons" id={o.id} style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
                    </tr>
                )
            })
        ) : (
                <div>No data to show</div>
            )
        return (
            <Preloader>
                <Placeholder>
                    <span fadeDuration={10000}>Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
                    <div className="card-body" style={{ background: "white" }}>
                        <table id="example" class="table table-striped table-bordered table-hover" width="100%" >
                            <thead>
                                <tr>
                                    <th>S/n</th>
                                    <th>FirstName</th>
                                    <th>OtherNames</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>School</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Preloader>
        )
    }
}


export default ViewUsers