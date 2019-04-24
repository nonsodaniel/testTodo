import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
// import '../style/datatable.css'
const $ = require('jquery');
$.DataTable = require("datatables.net")

class Table extends Component {

    state = { news: [], isLoading: false }

    componentDidMount() {


        fetch(`http://localhost:4000/news/`).then((response) => {
            return response.json()
        }).then((newsData) => {
            console.log("yes", newsData.data)
            this.setState({ news: newsData.data.length ? newsData.data : null })
        })
        $('#example').DataTable();


    }

    render() {


        return (
            <Preloader>
                <Placeholder>
                    <span fadeDuration={10000}>Loading...</span>
                </Placeholder>
                <div className="main-content-container container-fluid px-4" style={{ background: "white" }}>
                    <table id="example" class="display" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tiger Nixon</td>
                                <td>System Architect</td>
                                <td>Edinburgh</td>
                                <td>61</td>
                                <td>2011/04/25</td>
                                <td>$320,800</td>
                            </tr>
                            <tr>
                                <td>Garrett Winters</td>
                                <td>Accountant</td>
                                <td>Tokyo</td>
                                <td>63</td>
                                <td>2011/07/25</td>
                                <td>$170,750</td>
                            </tr>


                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Preloader>
        )
    }
}


export default Table