import Axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL,  GET_ERROR} from './types'

const port = "https://carbook.onrender.com"
// https://carbook.onrender.com/
export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LOADING });
        const token = getState().user.token;
        const { data } = await Axios.get(`${port}/user/getuser`, { headers: { "x-auth-token": token } })
        console.log('tok', data)
        dispatch({ type: USER_LOADED, payload: data })
        // "https://messengerm.herokuapp.com"


    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}
export const online = () =>async(dispatch,getState)=>{

    try {
        console.log('online send')
        // alert('online')
        const token = getState().user.token;
        const { data } = await Axios.patch("https://messengerm.herokuapp.com/user/online", "hello",{ headers: { "x-auth-token": token } })
        
    } catch (error) {
        
    }

}
export const offline = () =>async(dispatch,getState)=>{

    try {
        console.log('online send')
        alert('offline')
        const token = getState().user.token;
        const { data } = await Axios.patch("https://messengerm.herokuapp.com/user/offline", "hello",{ headers: { "x-auth-token": token } })
        
    } catch (error) {
        
    }

}
export const loadmsg = (userid) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log('idd',userid)
        const token = getState().user.token;
        // console.log('tok',userid)
        const data  = await Axios.get(`https://messengerm.herokuapp.com/user/oneuser/${userid}`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        console.log("daa",data)
        // console.log(data)
        dispatch({ type: "USERMSG", payload: data })



    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}
export const senddata = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
       
        const token = getState().user.token;
        const dataa  = await Axios.post(`${port}/main/upload`,data, { headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        console.log("daa",data)
        dispatch({ type: "POSTMSG", payload: dataa })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const order = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.post(`${port}/main/order`,data, { headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        // console.log("daa",data)
        dispatch({ type: "ORDERSUCC", payload: dataa })
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const delcar = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.delete(`${port}/main/car/${data}`, { headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        // console.log("daa",data)
        // dispatch({ type: "ORDERSUCC", payload: dataa })
        window.location.reload()
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const myorder = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/mybooking`,{ headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        console.log("daa",dataa)
        dispatch({ type: "MYBOOK", payload: dataa })
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const carorder = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/carorder`,{ headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        // console.log("daa",dataa)
        dispatch({ type: "MYBOOK", payload: dataa })
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const mycars = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/mycars`,{ headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        console.log("daa",dataa)
        dispatch({ type: "MYCARS", payload: dataa })
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}

export const allorders = (data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log(data)
       
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/allorders`)
        // // console.log('tok', data)
        console.log("daa",dataa)
        dispatch({ type: "ALLORDERS", payload: dataa })
        // alert('order')



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const delmsg = (id) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log('idd',userid)
        // alert(id)
        const token = getState().user.token;
        const data  = await Axios.put("https://messengerm.herokuapp.com/user/delmsg",{id:id}, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        // console.log("daa",data)
        // dispatch({ type: "POSTMSG", payload: data })
        dispatch({ type: "DELEMSG", payload: data })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const userSign = (signdata) => async (dispatch) => {

    try {
        console.log('cvcv',signdata)
        const { data } = await Axios.post(`${port}/user/signup`, signdata)
        dispatch({ type: REGISTER_SUCCESS, payload: data })
        
    } catch (error) {

        dispatch({ type: REGISTER_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const loguser = (dat) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${port}/user/login`, dat)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {

        dispatch({ type: LOGIN_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const editprofilepic = (dat) => async (dispatch,getState) => {
    try {
        const token = getState().user.token;
        const { data } = await Axios.post("https://messengerm.herokuapp.com/user/editpic", dat,{ headers: { "x-auth-token": token } })
        // alert(data)
        dispatch({ type: "UPDATE_PIC", payload: data })
        alert("Profile Pic updated sucessfully")
    } catch (error) {

        // dispatch({ type: LOGIN_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const getallcars = ()=> async(dispatch)=>{
    try {
        const user = await Axios.get(`${port}/main/cars`)
        dispatch({type: "GETALLCARS", payload: user})
    } catch (error) {
        console.log(error)
    }
}
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS })

}
// export const userprofile =(id)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         const { data } = await Axios.get(`http://localhost:1998/user/userone/${id}`, { headers: { "x-auth-token": token } })
//         // console.log('tok', data)
//         dispatch({ type: USER_PROFILE, payload: data })
        
//     } catch (error) {
//         dispatch({ type: LOGIN_FAIL })
        
//     }
// }
// export const follow = (postId)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/user/follow`,{followId:postId},{ headers: { "x-auth-token": token } } )
//         console.log(updateData)
//         // dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const unfollow = (postId)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/user/unfollow`,{unfollowId:postId},{ headers: { "x-auth-token": token } } )
//         console.log(updateData)
//         // dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const updatepic = (photo)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/user/picupdate`,photo,{ headers: { "x-auth-token": token } } )
//         // console.log(updateData)
//         dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const clear = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERROR })
// }