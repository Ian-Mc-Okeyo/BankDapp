import React from 'react'
import HomeBar from './HomeBar'
import { useFormik } from 'formik'

const Login = () =>{
    const onSubmit = () => {

    }
    const {values, errors,  handleBlur, touched, isSubmitting, handleChange, handleSubmit} = useFormik({
        initialValues: {
            account_number: '',
            password:'',
        },
        onSubmit
    })
    return (
        <>
            <HomeBar/>
            <div className='container' style={{texAlign: 'center'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3 style={{color: 'white', textAlign: 'center'}}>Login</h3>
            <div className="content-section row d-flex flex-column align-items-center justify-content-center" style={{border: 'none'}}>
                <div className="content-section content col-md-6">
                    <br/>
                    <form method="POST" style={{textAlign: 'center'}}>
                                <label className='form-control-md' style={{color:'#e9e7e7', textAlign:'left'}}>Account Number</label>
                                <input
                                    type='text'
                                    className='form-control custom-inputs'
                                    name = 'account_number'
                                    value={values.account_number}
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                />
                                <br/>
                                <label className='form-control-md' style={{color:'#e9e7e7'}}>Password</label>
                                <input
                                    type='password'
                                    className='form-control custom-inputs'
                                    name = 'password'
                                    value={values.password}
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                />
                        <br/>
                        <div className="form-group">
                        <button className="btn btn-outline-info" type="submit"> Login</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Login