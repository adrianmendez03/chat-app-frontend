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
            return (
                <input 
                    key={index}
                    type="text" 
                    name={objKey} 
                    value={formVals[objKey]} 
                    onChange={e => handleChange(e)}
                />
            )
        })
    }

    return (
        <form onSubmit={() => handleSubmit(form)}>
            {renderInputs()}
            <input type="submit"/>
        </form>
    )
}

export default Form