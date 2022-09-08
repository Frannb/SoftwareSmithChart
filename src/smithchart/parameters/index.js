export function getUpdatedParameter(parameter, newTextValue) {
    let value, textValue, errorMessage
    try {
        value = parameter.parseFunction(newTextValue)
        textValue = parameter.displayFunction(value)
        errorMessage = ''
    } catch (error) {
        value = parameter.value
        textValue = newTextValue
        errorMessage = 'Invalid input'
    }
    return { ...parameter, value, textValue, errorMessage }
}


export function newParameter(parameter) {
    return getUpdatedParameter(parameter, parameter.textValue)
}
