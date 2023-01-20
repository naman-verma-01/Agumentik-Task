const Lead = require('../model/Lead')
const { sendMail } = require('../emailer/LeadMail')
const {converter} = require('../LeadPdf/engine')
const leadUpdate = async(name, contact_number, email, interest) => {
    let response = {}
    try {

        const lead = await new Lead({name, contact_number, email, interest})
        const data = await lead.save()
        
        sendMail(email, name, interest)

        if (data) {
            console.log("data", data)
            response.status = 200,
            response.data = { msg: "Success", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
        response.data = { msg: error }
        return response

    }
}

const converterCallback = (res) =>{
    console.log("converterCallback", res)
}
const leadPdf = async() => {
    let response = {}
    try {

        const data = await Lead.find({})
        
        converter(data, converterCallback)
        
        if (data) {
            console.log("data", data)
            response.status = 200,
            response.data = { msg: "Success", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Failed" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
        response.data = { msg: error }
        return response

    }
}

module.exports = { leadUpdate,leadPdf }