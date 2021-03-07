import React, { useState } from 'react'
import '../styles/Form.css'

const Form = props => {

    const { handleSubmit, form } = props
    const [formVals, setFormVals] = useState(form)

    const handleChange = e => {
        const name = e.target.name
        setFormVals({
            ...formVals,
            [name]: e.target.value
        })
    }

    const createPlaceholder = (name) => {
        switch(name) {
            case 'email':
                return 'Email'
            case 'password':
                return 'Password'
            case 'username':
                return 'Username'
            default:
                break
        }
    }
    
    const renderInputs = () => {
        return Object.keys(formVals).map((objKey, index) => {
            if (objKey === 'password') {
                return (
                    <input 
                        key={index}
                        placeholder={createPlaceholder(objKey)}
                        type="password" 
                        name={objKey} 
                        value={formVals[objKey]} 
                        onChange={e => handleChange(e)}
                    />
                )
            } else {
                return (
                    <input 
                        key={index}
                        placeholder={createPlaceholder(objKey)}
                        type="text" 
                        name={objKey} 
                        value={formVals[objKey]} 
                        onChange={e => handleChange(e)}
                    />
                )
            }
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        handleSubmit(formVals)
    }

    return (
        <form className="form" autoComplete="off" onSubmit={e => submitForm(e)}>
            {renderInputs()}
            <input type="submit"/>
        </form>
    )
}

export default Form