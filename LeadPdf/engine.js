var pdf = require("pdf-creator-node");
var fs = require("fs");




const converter = async (userdata, callback) => {

    // Read HTML Template
    var html = fs.readFileSync("./LeadPdf/table.html", "utf8");
    let htmlHeader = "<h4>User List</h4><br><br><br><div> Name &nbsp; Email &nbsp; Contact Number &nbsp;  Interest</div><br><br>"
    for (var i=0; i<userdata.length; i++){
        htmlHeader =  htmlHeader + `<div> ${userdata[i].name} &nbsp; ${userdata[i].email} &nbsp; ${userdata[i].contact_number} &nbsp;  ${userdata[i].interest}</div><br>`
    }
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents:  htmlHeader
        },
        body:{
        }
    };

    var document = {
        html: html,
        data: {
            userdata: userdata,
        },
        path: "./output.pdf",
        type: "",
    };

    console.log("USER DATA -=>", userdata)

    await pdf.create(document, options).then((res) => {
        console.log(res);
        callback(res)
    }).catch((error) => {
        console.error(error);
    });

}


module.exports = { converter }

