import React from 'react'
import { useFormik } from 'formik'
import HomeBar from './HomeBar'
import { useState } from 'react'
import {ethers} from 'ethers'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../Slices/auth'
import { AccountsABI } from './ContractsServices/resources'
import ReactLoading from 'react-loading'
import Toast from './Toaster'
import toast from 'react-hot-toast'

const Withdraw = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    if(!isAuthenticated){
        navigate("/login")
    }
    const user = useSelector((state)=>state.auth.user)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    async function withdraw(){
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        const address = process.env.REACT_APP_ACCOUNTS_ADDRESS
        const accounts = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", AccountsABI, provider)

        //signer
        const accountsSigner = provider.getSigner()
        const accountsContract = accounts.connect(accountsSigner)

        //deposit
        const withdrawTransaction = await accountsContract.withdraw(user.account_number, values.password, values.amount)
        await withdrawTransaction.wait(1)

        //update user local balance
        const hexBalance = await accountsContract.getBalance(user.account_number, values.password)
        const userNewBalance = hexBalance.toNumber()
        console.log(userNewBalance)
        dispatch(setUser({...user, balance: userNewBalance}))
    }
    const onSubmit = () =>{
        setIsLoading(true)
        withdraw().then((response)=>{
            console.log(response)
            toast.success(`Successfully withdrawn  $${values.amount}`, {
                position: 'bottom-left',
                duration: 5000
            })
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error)
            toast.error("An error occured")
            setIsLoading(false)
        })
    }
    const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            amount: '',
            password: ''
        },
        onSubmit
    })

    return(
        <>
            <div style={{textAlign: 'justified',  backgroundImage: 'linear-gradient(#091d3e, #114c6c)'}}>
                <HomeBar/>
                <Toast/>
                <br/>
                <br/>
                <br/>
                <h4 className="display-4" style={{marginLeft: "10px"}}>
                    <b style={{color: "white"}}>Withdraw</b>
                </h4>

                <div className="col d-flex justify-content-center">
                    <div className="card col-11 homeBox p-1 p-md-2 m-md-3 mx-auto">
                        <div className="card-body" style={{textAlign: 'left', color: 'white'}}>
                            <h5 className="card-title">Account Number</h5>
                            <br/>
                            <h5 className='display-5'>{user.account_number}</h5>
                            <br/>
                            <br/>
                            <p>Welcome IAN</p>
                            <i>#simple and Transparent</i>
                            
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card col-11 p-md-2 m-md-3 balance-section">
                        <div className="" style={{textAlign: 'left', color: 'white'}}>
                            <h5 className="card-title">Your Money:</h5>
                            <h5 className='display-5'>${user.balance}</h5>
                        </div>
                    </div>
                </div>


                <div className="mx-auto d-flex row justify-content-around align-items-center p-3 pageContentSection">
                <div className="content-section content col-md-7">
                        <br/>
                    <form method="POST" className='row g-3 d-flex align-items-center justify-content-center' style={{textAlign: 'center'}}>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Amount</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name='amount'
                                value={values.amount}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                            />
                            <br/>
                        </div>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Password</label>
                            <input
                                type='password'
                                className='form-control custom-inputs'
                                name='password'
                                value={values.password}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                            />
                            <br/>
                        </div>
                            <div className="form-group">
                            <button className="btn btn-outline-info" type="submit" disabled={isLoading} onClick={handleSubmit}>
                                {isLoading ? <ReactLoading type="spin" color="white" height={20} width={20} />: "Withdraw"}
                            </button>
                            </div>
                        </form>
                        
                    </div>
                </div>

            </div>
        </>
    )
    
}

export default Withdraw;