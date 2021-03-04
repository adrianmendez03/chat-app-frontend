import React, { useState } from 'react'

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
    
    const renderInputs = () => {
        return Object.keys(formVals).map((objKey, index) => {
            if (objKey === 'password') {
                return (
                    <input 
                        key={index}
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
        <form onSubmit={e => submitForm(e)}>
            {renderInputs()}
            <input type="submit"/>
        </form>
    )
}

export default Form