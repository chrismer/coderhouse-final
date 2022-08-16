import multer from "multer";

const storage = multer.diskStorage({
    destination: function(_req, _file, cb) {
        cb(null, "src/Uploads")
    },
    filename: function(_req, file, cb){
        cb(null, file.originalname )
    }
})

let upload = multer({ storage:storage })

upload = upload.single("miFoto")
function uploadFile(req,res){
    const file = req.file
    res.send({data:"El Archivo se subio correctamente", url:`${file.destination}/${file.filename}`})
}
export{upload, uploadFile}