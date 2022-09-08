import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

import { getUpdatedParameter } from 'parameters'


export default function InputParameter({ parameter, setParameter }) {
    const inputRef = React.useRef(null)

    React.useEffect(() => {
        inputRef.current.value = parameter.textValue
    })

    function changeValue(newTextValue) {
        setParameter(oldParameter => getUpdatedParameter(oldParameter, newTextValue))
    }

    return (
        <TextField
            inputRef={inputRef}
            label={parameter.label}
            InputProps={{
                endAdornment: <InputAdornment position="end">{parameter.unit}</InputAdornment>
            }}
            defaultValue={parameter.textValue}
            helperText={parameter.errorMessage}
            error={parameter.errorMessage != ''}
            onBlur={event => changeValue(event.target.value)}
        />
    )

}
