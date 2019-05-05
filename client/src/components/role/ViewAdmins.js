import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
import '../style/datatable.css'
import swal from 'sweetalert';
import moment from 'moment'


const $ = require('jquery');
$.DataTable = require("datatables.net")

class ViewAdmins extends Component {

    state = { admin: [], isLoading: false, isEdit: false }

    componentDidMount() {
        let isDev = /localhost/.test(window.location.origin);
        console.log("isdev", isDev)
        let base_url = isDev ? "http://localhost:4000/api" : "http://acada.herokuapp.com/api"

        fetch(`${base_url}/admin/`).then((response) => {
            return response.json()
        }).then((adminData) => {
            console.log("yes", adminData.data)
            this.setState({ admin: adminData.data.length ? adminData.data : null });
            $("#example").DataTable()
        })





    }

    handleEdit = (e) => {
       console.log("target",e.target.id) 
        this.setState({ isEdit: true })
        this.props.history.push(`/edit-admin/${e.target.id}`)
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
                    fetch(`http://localhost:4000/admin/${id}`, {
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
        const mydata = this.state.admin;
        console.log("tunde", mydata)

        let adminList = mydata.length ? (
            mydata.map((o, i) => {
                console.log("my data", o);
                return (
                    <tr key={o.id}>
                        <td>{i + 1}</td>
                        <td>{o.firstname}</td>
                        <td>{o.othernames}</td>
                        <td>{o.email}</td>
                        <td>{o.phone}</td>
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
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {adminList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Preloader>
        )
    }
}


export default ViewAdmins