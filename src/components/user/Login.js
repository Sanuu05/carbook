
import { Col, Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { app } from '../../firebase'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth'
import { loguser, userSign } from '../../action/user'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [data, setdata] = useState({
        name: "", email: "", password: "", cpassword: ""
    })
    //    const history = useHistory()
    const err = useSelector((state) => state.error.msg)
    const succ = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    const auth = getAuth(app)
    const [signup, setsignup] = useState(false)
    const navigate = useNavigate()
    // const auth =''
    const postData = () => {
        if (data?.email && data?.password) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(userCredential.user?.emailVerified)
                    if (userCredential?.user?.emailVerified) {
                        dispatch(loguser({ email: userCredential.user.email }))


                    } else {
                        toast.error("Email is not verified")
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(error?.message)
                });

        } else {
            toast.error('Enter all the field')
        }
    }
    const submit = ()=>{
        if(data.email && data.name && data.cpassword && data.password){
            if (data.password === data.cpassword) {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        sendEmailVerification(user)
                        dispatch(userSign({email:data.email.toLowerCase(),name:data.name}))
                        toast.success("Account created sucessfully, email verification link send to your email id")
                        setsignup(false)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        alert(error?.message)
                        toast.error('Email already in use')
                    });
    
            }
            else{
                alert('Enter same password')
            }
        }else{
            alert('Fill All field')
        }

    }
    useEffect(() => {

        if (succ) {
            toast.success('Login Sucessfully')
            setsignup(false)
               return navigate('/')
            
        }
        if (err) {
            toast.error(err)

        }
    }, [err, succ])
    return (
        <Container style={{ minHeight: '100vh', display: 'flex' }}>
            <Row>
                <Col sm={12} md={6} xl={6}>
                    <img src="https://starpng.com/public/uploads/preview/car-transparent-background-png-101577011666b0xvgdmw9a.png" className='img-fluid' />
                </Col>
                <Col sm={12} md={6} xl={6} style={{ minHeight: '60%' }}>
                    <div className="mycard">
                        <div className="card auth_card ">
                            <h2 style={{ fontSize: 50 }}>{signup ? "SignUp" : 'Login'} </h2>
                            {
                                signup ?


                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setdata({ ...data, name: e.target.value })}
                                    /> : null}

                            <input
                                type="text"
                                placeholder="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setdata({ ...data, email: e.target.value })}

                            />
                            <input
                                type="password"
                                placeholder="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setdata({ ...data, password: e.target.value })}

                            />
                            {
                                signup ?

                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        name="cpassword"
                                        value={data.cpassword}
                                        onChange={(e) => setdata({ ...data, cpassword: e.target.value })}


                                    /> : null}



                            {
                                signup ? <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={submit}>Signup
                                </button > :
                                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={postData}>Login
                                    </button >
                            }


                            {
                                signup ?
                                    <p>Have an acount ? <span style={{ cursor: 'pointer' }} onClick={() => setsignup(false)}>Login</span></p> :
                                    <p>Dont have an acount ? <span style={{ cursor: 'pointer' }} onClick={() => setsignup(true)}>SignUp</span></p>

                            }



                        </div>
                    </div>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    )
}

export default Login