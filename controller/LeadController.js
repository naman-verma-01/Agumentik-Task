const express = require("express");
const router = express.Router();
const { leadUpdate, leadPdf } = require("../service/LeadService")
const fs = require('fs')
router.post("/leadUpdate", async (req, res) => {
    try {
        const response = await leadUpdate(req.body.name, req.body.contact_number, req.body.email, req.body.interest)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get("/leadPdf", async (req, res) => {
    try {
        const response = await leadPdf()
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get("/leadPdfDownload", async (req, res) => {
    
        const filePath = "./output.pdf"; // or any file format
    
        // Check if file specified by the filePath exists
        fs.exists(filePath, function (exists) {
            if (exists) {
                // Content-type is very interesting part that guarantee that
                // Web browser will handle response in an appropriate manner.
                res.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Disposition": "attachment; filename=" + "output.pdf"
                });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("ERROR File does not exist");
        });
})



module.exports = router;