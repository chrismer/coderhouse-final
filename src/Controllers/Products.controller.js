import ProductModel from '../Models/Products.model.js'
import fs from 'fs'


//trae todos los productos 
function  getAllProducts(req, res){
    ProductModel.find()
            .then((product) => {res.status(200).json({products: product});})
            .catch((e) => res.status(500).json({msg:e.message}));
}

//trae productos por id

function getProductsByID(req, res) {
    ProductModel.findOne({ _id: req.params.id })
    .then((product) => {res.status(200).json({products:product}) })
    .catch((e) => res.status(500).json({msg:e.message}))
}


//crea productos
async function postProducts (req, res){
    let {name, description, image, price} = req.body
    try {
        await fs.promises.access(`src/Uploads/${image}`)
        image = `src/Uploads/${image}`
    } catch (error) {
        image = `src/Uploads/producto.png`
    }
    try {
        if(!name || !description || !price || !image)throw new Error('Faltan campos por completar')
        const prod= {name: name , description:description, price:price, image: image}
        const productExist = await ProductModel.findOne({name:name})
        if(productExist)throw new Error("Producto existente")
        ProductModel.create(prod)
        .then((p) => {
            res.status(201).json({msg: "se agrego producto", product: p})
        })
    .catch((e) => res.json({msg:e.message}));
    } catch (error) {
        res.json({msg:error.message})
    }
}

//modifica Productos por id
function putProducts(req, res){
    const _id = req.params.id
    const {name, description,  image, price} = req.body
    try {
        if(!name || !description || !price || !image ) throw new Error('Faltan campos para modificar')
        ProductModel.update(
            { _id: _id },
            {
            $set: {
                name: name,
                description: description,
                price: price,
                image: image,
            },
            })
            .then((_p) => {res.status(200).json({msg:"se modifico producto"});})
            .catch((e) => res.json({msg:e.message}));
    }catch(error){
        res.json({msg:error.message})
    }
}

//elimino productos por id
function deleteProducts(req, res) {
    const _id = req.params.id
    ProductModel.deleteOne({ _id: _id })
    .then((_p) => {res.status(200).json({msg:"Borrado con exito"})})
    .catch((e) => res.json({msg: e.message}));
    
}


export{
    getAllProducts,
    getProductsByID,
    postProducts,
    putProducts,
    deleteProducts
}