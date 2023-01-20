const Admin = require('../model/Admin')
const bcrypt = require("bcrypt")
const login = async(email, password) => {
    let response = {}
    try {

        let comparing = false
        console.log(email, password)
        const data = await Admin.find({ email })

        if (data[0] != null) {
            comparing = await bcrypt.compare(password, data[0].password);
        }

        if (comparing) {
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


const signup = async (email, password, name) => {
    let response = {}
    try {

        const hashpass = await bcrypt.hash(password, 10);

        const admin = await new Admin({ email, password: hashpass, name })
        const data = await admin.save()

        if (data) {
            console.log("data", data)
            response.status = 200,
            response.data = { msg: "Success", data: data }
            return response
        }
        else {
            console.log("Error 400")
            response.status = 400,
            response.data = { msg: "Failure" }
            return response

        }
    } catch (error) {
        console.log(error)
        response.status = 500,
        response.data = { msg: error }
        return response

    }
}


module.exports = { login, signup }