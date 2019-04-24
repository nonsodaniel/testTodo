import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sidebar from './components/layouts/Sidebar'
import Footer from './components/layouts/Footer'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/layouts/Navbar'
import AddNews from './components/news/AddNews'
import ViewNews from './components/news/ViewNews'
import AddCategory from './components/category/AddCategory'
import ViewCategory from './components/category/ViewCategory'
import EditCategory from './components/category/EditCategory'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Lab from './components/Lab';
import Test from './components/test'
import Tbl from './Tbl'
import Table from '../src/components/table'
import EditNews from '../src/components/news/EditNews'
import AdminProfile from '../src/components/auth/AdminProfile'
import SignedInLink from '../src/components/auth/links/SignedInLinks'
import OTP from '../src/components/otp'
import AddUser from './components/role/AddUser';
import AddAdmin from './components/role/AddAdmin';
import ViewUsers from './components/role/ViewUsers';
import Forgotpassword from './components/auth/ForgotPassword'
import ViewAdmins from './components/role/ViewAdmins';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          {/* <div className="container-fluid">
        <div className="row"> */}

          <Sidebar />
          <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/add-news' component={AddNews} />
              <Route exact path='/view-news' component={ViewNews} />
              <Route exact path='/view-users' component={ViewUsers} />
              <Route exact path='/add-category' component={AddCategory} />
              <Route exact path='/view-category' component={ViewCategory} />
              <Route exact path='/edit-category/:id' component={EditCategory} />
              <Route exact path='/login' component={SignIn} />
              <Route exact path='/register' component={SignUp} />
              <Route exact path='/navbar' component={Navbar} />
              <Route exact path='/lab' component={Lab} />
              <Route exact path='/test' component={Test} />
              <Route exact path='/tbl' component={Tbl} />
              <Route exact path='/table' component={Table} />
              <Route exact path='/edit-news/:id' component={EditNews} />
              <Route exact path='/admin-profile/' component={AdminProfile} />
              <Route exact path='/' component={AdminProfile} />
              <Route exact path='/add-admin' component={AddAdmin} />
              <Route exact path='/view-admins' component={ViewAdmins} />
              <Route exact path='/my=profile' component={AddUser} />
              <Route exact path='/views-users' component={ViewUsers} />
              <Route exact path="/forgot-password" component={Forgotpassword} />
              <Route exact path='/otp' component={OTP} />
            </Switch>
            <Footer />
          </main>
        </div>
        {/* </div>       
        </div> */}
      </BrowserRouter>
    );
  }
}

export default App;
