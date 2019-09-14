import axios from 'axios'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

    


export const onLoginUser = (USERNAME, PASSWORD) => {
    

    return (dispatch) => {

        axios.get(
            "http://localhost:1996/users",
            {
                params: {
                    username: USERNAME,
                    password: PASSWORD
                }
            }
        ).then(res => {
            if (res.data.length === 0) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'User tidak ditemukan',
                    footer: '<p>Silahkan coba lagi</p>'
                  })
                
            }
            else {
                let {id, username} = res.data[0]
               
                localStorage.setItem(
                    "userData", 
                    JSON.stringify({id, username})

                )
                dispatch(
                    {
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            id, username
                        }
                    }
                )
                
                
                
            }
        })
        
    }


}

export const onLogoutUser = () => {

    localStorage.removeItem("userData")

    return {
        type: "LOGOUT_SUCCESS"
    }
}

