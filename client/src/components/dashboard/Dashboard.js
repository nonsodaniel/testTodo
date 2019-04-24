import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'




class Dashboard extends Component {
  state = {
    admin: [], news: [], user: [], category: [], fakedata: []
  }
  componentDidMount() {
    let isDev = /localhost/.test(window.location.origin);
    let base_url = isDev ? "http://acada.herokuapp.com/api" : "http://localhost:4000/api"

    fetch(`${base_url}/admin/`).then((res) => {
      return res.json();
    }).then((data) => {
      console.log("admins", data); this.setState({ admin: data })

      fetch(`${base_url}/news/`).then((res) => {
        return res.json();
      }).then((data) => {
        console.log("News", data); this.setState({ news: data });

        fetch(`${base_url}/category/`).then((res) => {
          return res.json();
        }).then((data) => {
          console.log("Category", data); this.setState({ category: data })
        })

        fetch(`${base_url}/user/`).then((res) => {
          return res.json();
        }).then((data) => {
          console.log("Users", data); this.setState({ user: data })
        })


      })

    })
  }


  render() {
    console.log("Render state", this.state);
    // let token = localStorage.getItem("Admin");
    // if(!token) return <Redirect to = '/login' />
    let adminData = this.state.admin, newsData = this.state.news, userData = this.state.user, categoryData = this.state.category;

    let adminLength = adminData.data ? adminData.data.length : 0;
    let newsLength = newsData.data ? newsData.data.length : 0;
    let userLength = userData.data ? userData.data.length : 0;
    let categoryLength = categoryData.data ? categoryData.data.length : 0;
    console.log("Admindata", adminData.data)

    let adminList = adminData.data ? (
      adminData.data.map((o, i) => {
        console.log("my data", o);
        return (
          <tr key={o.id}>
            {/* <td><img src={url + o.admin_dp} style={{ height: "25px", width: " 26px", borderRadius: "50px" }} /></td> */}
            <td>{o.othernames}</td>
            <td>{o.email}</td>
            <td>{o.phone}</td>
            <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )

    let userList = userData.data ? (
      userData.data.map((o, i) => {
        console.log("my userdata", o);
        return (
          <tr key={o.id}>
            <td><img src={o.user_dp} style={{ height: "25px", width: " 26px", borderRadius: "50px" }} /></td>
            <td>{o.firstname + " " + o.othernames}</td>
            <td>{o.email}</td>
            <td>{o.phone}</td>
            <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )
    console.log("tolu", newsData.data)
    let newsList = newsData.data ? (
      newsData.data.slice(0, 5).map((o, i) => {
        console.log("my newsdata", o);
        return (
          <tr key={o.id}>
            <td>{o.title}</td>
            <td>{o.category}</td>
            <td>{o.content}</td>
            <td>{o.author}</td>
            <td>{o.date_created ? new Date(o.date_created).toLocaleDateString() : null}</td>
            <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show</div>
      )

    let categoryList = categoryData.data ? (
      categoryData.data.slice(0, 5).map((o, i) => {
        return (
          <tr key={o.id}>
            <td>{i + 1}</td>
            <td>{o.code}</td>
            <td>{o.name}</td>
            <td>{o.date ? new Date(o.date).toLocaleDateString() : null}</td>
            <td><button class="btn btn-primary btn-xs" style={{ borderRadius: "50px", width: "10px" }} onClick={this.handleEdit} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>mode_edit</i></button></td>
            <td><button class="btn btn-danger btn-xs" style={{ borderRadius: "50px", width: "10px", width: "10px" }} onClick={this.handleDelete} id={o.id}><i className="material-icons" style={{ left: "-6px", fontSize: "13px" }}>delete_sweep</i></button></td>
          </tr>
        )
      })
    ) : (
        <div>No data to show </div>
      )
    // console.log("adminlist", adminList)

    return (
      <div className="main-content-container container-fluid px-4">
        {/* <!-- Page Header --> */}
        <div className="page-header row no-gutters py-4">
          <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
            <span className="text-uppercase page-subtitle">Dashboard</span>
            <h3 className="page-title">Blog Overview</h3>
          </div>
        </div>
        {/* <!-- End Page Header -->
            <!-- Small Stats Blocks --> */}
        <div className="row">

          <div className="col-lg col-md-6 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">

                <div className="d-flex flex-column m-auto">
                  <NavLink to="/login" style={{ cursor: "pointer" }}>
                    <div className="stats-small__data text-center">
                      <span className="stats-small__label text-uppercase">News</span>
                      <h6 className="stats-small__value count my-3">{newsLength}</h6>
                    </div>
                    <div className="stats-small__data">
                      <span className="stats-small__percentage stats-small__percentage--increase">4.7%</span>
                    </div>
                  </NavLink>
                </div>

                <canvas height="120" className="blog-overview-stats-small-1"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-6 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <NavLink to='/register'>
                    <div className="stats-small__data text-center">
                      <span className="stats-small__label text-uppercase">Admins</span>
                      <h6 className="stats-small__value count my-3">{adminLength}</h6>
                    </div>
                    <div className="stats-small__data">
                      <span className="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                    </div>
                  </NavLink>
                </div>
                <canvas height="120" className="blog-overview-stats-small-2"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-4 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Users</span>
                    <h6 className="stats-small__value count my-3">{userLength}</h6>
                  </div>
                  <div className="stats-small__data">
                    <span className="stats-small__percentage stats-small__percentage--decrease">3.8%</span>
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-3"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-4 col-sm-6 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Categories</span>
                    <h6 className="stats-small__value count my-3">{categoryLength}</h6>
                  </div>
                  <div className="stats-small__data">
                    <span className="stats-small__percentage stats-small__percentage--increase">12.4%</span>
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-4"></canvas>
              </div>
            </div>
          </div>
          <div className="col-lg col-md-4 col-sm-12 mb-4">
            <div className="stats-small stats-small--1 card card-small">
              <div className="card-body p-0 d-flex">
                <div className="d-flex flex-column m-auto">
                  <div className="stats-small__data text-center">
                    <span className="stats-small__label text-uppercase">Visitors</span>
                    <h6 className="stats-small__value count my-3">0</h6>
                  </div>
                  <div className="stats-small__data">
                    <span className="stats-small__percentage stats-small__percentage--decrease">2.4%</span>
                  </div>
                </div>
                <canvas height="120" className="blog-overview-stats-small-5"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Small Stats Blocks --> */}
        <div className="row">
          {/* <!-- Users Stats --> */}

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Top 5 Recent Admin</h6></div>
                  <div className="col-md-6">
                    <Link to="/view-admins">
                      <button className="btn btn-primary" style={{ float: "right", height: "25px", borderRadius: "50px", backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);" }}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="dtBasicExample" class="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </thead>
                  <tbody>

                    {adminList}



                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Top 5 Recent Users</h6></div>
                  <div className="col-md-6">
                    <Link to="/view-users">
                      <button className="btn btn-primary" style={{ float: "right", height: "25px", borderRadius: "50px", backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);" }}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="" class="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* end row */}
        </div>



        <div className="row">
          {/* <!-- Users Stats --> */}

          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Top 5 Recent Categories</h6></div>
                  <div className="col-md-6">
                    <Link to="/view-category">
                      <button className="btn btn-primary" style={{ float: "right", height: "25px", borderRadius: "50px", backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);" }}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>
                <table id="" class="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category Code</th>
                      <th>Category Name</th>
                      <th>Date Created</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>#</th>
                      <th>Category Name</th>
                      <th>Category Code</th>
                      <th>Date Created</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>


          <div className="col-lg-6 col-md-6 col-sm-6 mb-4">
            <div className="card card-small">
              <div className="card-header border-bottom">
                <div className="row" >
                  <div className="col-md-6"><h6 className="m-0">Top 5 Recent Categories</h6></div>
                  <div className="col-md-6">
                    <Link to="/view-category">
                      <button className="btn btn-primary" style={{ float: "right", height: "25px", borderRadius: "50px", backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);" }}>
                        <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>

              </div>
            </div>
          </div>

          {/* end row */}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
          <div className="card card-small">
            <div className="card-header border-bottom">
              <div className="row" >
                <div className="col-md-6"><h6 className="m-0">Top 5 Recent News</h6></div>
                <div className="col-md-6">
                  <Link to="/view-news">
                    <button className="btn btn-primary" style={{ float: "right", height: "25px", borderRadius: "50px", backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);" }}>
                      <i className="material-icons" style={{ top: "-4px", fontSize: "15px" }}>visibility</i>
                    </button>
                  </Link>
                </div>
                <hr />
              </div>
              <table id="" className="table table-striped table-bordered" cellspacing="0" width="100%">
                <thead>
                  <tr>
                    <th class="th-sm">Title</th>
                    <th class="th-sm">Category</th>
                    <th class="th-sm">Content</th>
                    <th class="th-sm">Author</th>
                    <th class="th-sm">Date</th>
                    <th class="th-sm">Edit</th>
                    <th class="th-sm">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList}
                </tbody>
                <tfoot>
                  <tr>
                    <th class="th-sm">Title</th>
                    <th class="th-sm">Category</th>
                    <th class="th-sm">Content</th>
                    <th class="th-sm">Author</th>
                    <th class="th-sm">Date</th>
                    <th class="th-sm">Edit</th>
                    <th class="th-sm">Delete</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>



      </div >
      // {/* <!-- End Top Referrals Component --> */ }

    )
  }
}



export default Dashboard
