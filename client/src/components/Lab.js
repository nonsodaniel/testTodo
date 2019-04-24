import React, { Component } from 'react'
// import ViewNews from '../news/ViewNews';
import Datatable from 'react-bs-datatable'; // Import this package
import moment from 'moment'; // Example for onSort prop
import bootstrap from 'bootstrap';
import popper from 'popper.js'
import { Preloader, Placeholder } from 'react-preloading-screen';
import swal from 'sweetalert';



const header = [
    { title: 'User_Id', prop: 'userId', sortable: true, filterable: true },
    { title: 'Id', prop: 'id', sortable: true },
    { title: 'Title', prop: 'title' },
    { title: ' Body', prop: 'body', sortable: true },
    { title: ' Edit'},
    { title: ' Delete', },
  ];
  

  const onSortFunction = {
    date(columnValue) {
      // Convert the string date format to UTC timestamp
      // So the table could sort it by date instead of sort it by string
      return moment(columnValue, 'Do MMMM YYYY').valueOf();
    },
  };
  



 class ViewNews extends Component {
    state = {fakedata: ""}
    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/posts`).then((res)=>{
            return res.json();
          }).then((data)=>{
              console.log("fakedata", data); 
              this.setState({fakedata: data})
          })

        //   swal ( "Oops" ,  "Something went wrong!" ,  "error" )

    }

    componentWillMount(){
        
    }

     state = { email: "", password: "", isLoading: false}

   
  render() {
          console.log(this.state.fakedata)
          let myData = this.state.fakedata
         
    return (
        <Preloader fadeDuration="100">
      <div className="main-content-container container-fluid px-4" style={{height:"auto"}}>
            {/* <!-- Page Header --> */}
            <Datatable
                tableHeader={header}
                tableBody={myData}
                keyName="userTable"
                tableClass="striped hover responsive"
                rowsPerPage={10} //number of rows per page
                rowsPerPageOption={[5, 10, 15, 20]}
                initialSort={{prop: "id", isAscending: true}}
                onSort={onSortFunction}
            />

          </div>
          <Placeholder>
                    <span>Loading please wait...</span>
                </Placeholder>
        </Preloader>
    )
  }
}


export default ViewNews