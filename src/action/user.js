import Axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL,  GET_ERROR} from './types'

const port = "https://cariva.onrender.com"
// https://carbook.onrender.com/
export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_LOADING });
        const token = getState().user.token;
        const { data } = await Axios.get(`${port}/user/getuser`, { headers: { "x-auth-token": token } })
        dispatch({ type: USER_LOADED, payload: data })
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
        const token = getState().user.token;
        const dataa  = await Axios.post(`${port}/main/order`,data, { headers: { "x-auth-token": token } })
        dispatch({ type: "ORDERSUCC", payload: dataa })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const delcar = (data) => async (dispatch, getState) => {
    try {

        const token = getState().user.token;
        // alert('del')
        const dataa  = await Axios.delete(`${port}/main/car/${data}`, { headers: { "x-auth-token": token } })

        window.location.reload()
    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const myorder = (data) => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        console.log('myo',token)
        const dataa  = await Axios.get(`${port}/main/mybooking`,{ headers: { "x-auth-token": token } })
        
        dispatch({ type: "MYBOOK", payload: dataa })

    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const carorder = (data) => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        console.log('tok',token)
        const dataa  = await Axios.get(`${port}/main/carorder`,{ headers: { "x-auth-token": token } })
        console.log('carorded',dataa)
        dispatch({ type: "MYBOOK", payload: dataa })




    } catch (error) {
        // dispatch({ type: AUTH_ERROR })
        console.log("error",error)

    }
}
export const mycars = (data) => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/mycars`,{ headers: { "x-auth-token": token } })
        console.log("daa",dataa)
        dispatch({ type: "MYCARS", payload: dataa })

    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}

export const allorders = (data) => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        const dataa  = await Axios.get(`${port}/main/allorders`)
        dispatch({ type: "ALLORDERS", payload: dataa })
    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}

export const userSign = (signdata) => async (dispatch) => {

    try {
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

export const getallcars = ()=> async(dispatch,getState)=>{
    try {
        const token = getState().user.token;
        const user = await Axios.get(`${port}/main/cars`,{ headers: { "x-auth-token": token } })
        // console.log('useraaa0',user)
        dispatch({type: "GETALLCARS", payload: user})
    } catch (error) {
        console.log(error)
    }
}
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS })

}
