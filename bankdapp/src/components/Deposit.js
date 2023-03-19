import React from 'react'
import { useFormik } from 'formik'
import HomeBar from './HomeBar'
import {ethers} from 'ethers'
import { AccountsABI } from './ContractsServices/resources'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactLoading from 'react-loading'

const Deposit = () => {
    const [isLoading, setIsLoading] = useState(false)

    const user = useSelector((state)=> state.auth.user)

    async function Deposit(){
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
        const address = process.env.REACT_APP_ACCOUNTS_ADDRESS
        const accounts = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", AccountsABI, provider)

        //signer
        const accountsSigner = provider.getSigner()
        const accountsContract = accounts.connect(accountsSigner)

        //deposit
        const depositTransaction = await accountsContract.deposit(1, values.password, values.amount)
        await depositTransaction.wait(1)

        console.log(depositTransaction)

    }
    const onSubmit = () =>{
        setIsLoading(true)
        Deposit().then((response)=>{
            console.log(response)
            setIsLoading(false)
        }).catch((error)=>{
            console.error(error)
            setIsLoading(false)
        })
    }
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
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
                <br/>
                <br/>
                <br/>
                <h4 className="display-4" style={{marginLeft: "10px"}}>
                    <b style={{color: "white"}}>Transfer</b>
                </h4>

                <div className="col d-flex justify-content-center">
                    <div className="card col-11 homeBox p-1 p-md-2 m-md-3 mx-auto">
                        <div className="card-body" style={{textAlign: 'left', color: 'white'}}>
                            <h5 className="card-title">Account Number</h5>
                            <br/>
                            <h5 className='display-5'> 1238917828</h5>
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
                            <h5 className='display-5'>$123891</h5>
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
                                type='number'
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
                                {isLoading ? <ReactLoading type="spin" color="white" height={30} width={30} />: "Send"}
                            </button>
                            </div>
                        </form>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default Deposit;