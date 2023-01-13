const express = require("express");
const router = express.Router();
const { addTopSlide, addBottomSlide, updateDetail, getall } = require("../service/PageDataService")
const upload = require("../Multer/")
const fs = require("fs")
router.post("/addTopSlide", upload.single('file'), async (req, res) => {
    try {
        
        const response = await addTopSlide(req.body.name, req.file.originalname)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.post("/addBottomSlide",upload.single('file'), async (req, res) => {
    try {
        const response = await addBottomSlide(req.body.name, req.file.originalname)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get("/getImage", async (req, res) => {
    const filePath = "./public/" + req.query.image; // or any file format

    // Check if file specified by the filePath exists
    fs.exists(filePath, function (exists) {
        if (exists) {
            // Content-type is very interesting part that guarantee that
            // Web browser will handle response in an appropriate manner.
            res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment; filename=" + req.query.image
            });
            fs.createReadStream(filePath).pipe(res);
            return;
        }
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("ERROR File does not exist");
    });
})



router.put("/updateDetail", async (req, res) => {
    try {
        const response = await updateDetail(req.body)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.get("/getall", async (req, res) => {
    try {
        const response = await getall()
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;