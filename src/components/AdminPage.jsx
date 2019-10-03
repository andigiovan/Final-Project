import React, { Component } from 'react'
import axios from "axios"

const URL_API = 'http://localhost:4500/'

export class AdminPage extends Component {

    state = {
        subscribe:[]
    }

    

    getData= () => {
        axios.get(
            URL_API + "getdata"
        ).then(res => {
            console.log(res.data);
            
            this.setState({subscribe:res.data})
        }).catch(err => {
           console.log(err);
            
        })
    }

    componentDidMount() {
        this.getData()
    }

    renderApproval = () => {

        return this.state.subscribe.map((val) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.subs_name}</td>
                    <td><img src={URL_API + 'files/' + val.subs_image} width="100" alt={val.id}/></td>
                    <td>{val.id_user}</td>
                </tr>
            )    
        

        })

    }
    render() {
        return (
            <div className="container">
                <div className="row mt-5">
                    <h3 className="mb-4">Approval</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Deskripsi</th>
                                <th>Bukti Transfer</th>
                                <th>ID_User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderApproval()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminPage
