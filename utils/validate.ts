// validate phone number
export const validatePhoneNumber = (text:string) => {
    const regexPhone = new RegExp(/^0(6|8|9)[0-9]{8}$/ );
    const regexOffice = new RegExp(/^0(2|3)[0-9]{7}$/ );
    let testString = ''
    // remove -
    if(
        text.length === 11 || // xxx-xxxxxxx, xx-xxx-xxxx
        text.length === 12 || // xxx-xxx-xxxx
        text.length === 10    // xx-xxxxxxx
    )
        testString = text.replaceAll('-', '')
    // phone number is 10 digits of number
    return regexPhone.test(testString) || regexOffice.test(testString)
}
