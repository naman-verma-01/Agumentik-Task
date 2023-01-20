const PageData = require('../model/PageData')

const addTopSlide = async (name, image) => {
    let response = {}
    try {

        const check = await PageData.find({})
        let data;
        if (check[0] == null) {
            const pageData = await new PageData({ TopSlide: [{ name, image }], facebook: "null", instagram: "null" })
            data = await pageData.save()

        }

        else {
            data = await PageData.updateOne({ facebook: { $ne: null } }, {
                $push: {
                    TopSlide:
                        [{
                            name: name,
                            image: image
                        }]
                },
            })
        }


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
const addBottomSlide = async (name, image) => {
    let response = {}
    try {

        console.log("DATA",name,image)
        const check = await PageData.find({})
        let data;
        if (check[0] == null) {
            const pageData = await new PageData({ BottomSlide: [{ name, image }], facebook: "null", instagram: "null" })
            data = await pageData.save()

        }

        else {
            data = await PageData.updateOne({ facebook: { $ne: null } }, {
                $push: {
                    BottomSlide:
                        [{
                            name: name,
                            image: image
                        }]
                },
            })
        }

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
const updateDetail = async (data) => {
    let response = {}
    try {

        data = await PageData.updateOne({ facebook: { $ne: null } }, {
           ...data
        })

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

const getall = async () => {
    let response = {}
    try {

        const data = await PageData.find({})    

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



module.exports = { addTopSlide, addBottomSlide, updateDetail, getall }