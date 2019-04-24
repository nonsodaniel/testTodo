import React, { Component } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen';
// import '../src/components/style/jquery.dataTables.min.css';


class OTP extends Component {
    state = {
        showProfileDrp: false
    }

    componentDidMount() {


    }
    handleSend = () => {
        let data = {
            "caller_id": "017006120",
            "id": "1283877",
            "to": ["2349096548615", "2348093184378"],
            "body": "Thank you form making a transaction with us. Your OTp is 738482"
        }
        data = JSON.stringify(data)
        console.log(data)
        fetch(`https://konnect.kirusa.com/api/v1/Accounts/ca8TJ714JCh24AGFjTUGIQ==/Messages`, {
            method: "POST",
            cache: "no-cache",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "PHVCoOfuH9devK4QOnoX2H53nEhlamxL3pI1W+wRpDw="
            },
            body: data,
        })
            .then(function (response) {
                return response.json()
            }).then(function (data) {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })



    }

    handleVerify = () => {

    }

    render() {

        return (
            <div>
                <div style={{ border: " 2px solid red", height: "300px", textAlign: "center", fontFamily: "roboto" }}>
                    <p>We have sent you one Time Password to your phone</p>
                    <b style={{ color: "red" }}>Please enter OTP</b>
                    <br /><br />

                    <div class="" style={{ textAlign: "center" }}>
                        <button className="btn btn-primary" onClick={this.handleSend}>Resend OTP</button>
                        <button className="btn btn-danger" onClick={this.handleVerify}>Verify OTP</button>
                    </div>
                </div>
            </div>
        )

    }


}

export default OTP
