const db = require('../../models');

const getProducts = async (req, res) =>
{
    
    try {
        const products = await db.Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'error al buscar los productos'});
    }
};

const getProductsWithSpecials = async (req, res) =>{
    const id = req.params.id;
    try {
        const products = await db.products.findAll({
            include: [
                {
                    model: db.SpecialPrice,
                    where: {id_client: id}
                }
            ]
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'error al buscar los productos'});      
    }
};

const getOneProduct = async(req, res) =>
    {
        const id = req.params.id;

        try {
            const product = await db.Product.findByPk(id);
        if(product)
            {
                res.status(200).json(product);
            }
            else
            {
                res.status(404).json({error: "no se pudo encontrar el producto"})
            }
        } catch (error) {
            res.status(500).json({error: "error al buscar el producto"});   
        }
    }

const createProduct = async (req, res) =>{
    const {code, description,url_image, price, tax} = req.body;
    try {
        const product = await db.Product.create({code, description,url_image,price, tax});
        res.status(201).json(product);
    } catch (error) {
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al crear el producto'});  
    }
};

const updateProduct = async(req, res) => {
    const {code, description,url_image, price, tax} = req.body;
    const id = req.params.id;
    try {
        const product = await db.Product.update({code, description,url_image,price, tax}, {where : {id: id}});
        if(product)
            {
                res.status(203).json(product);
            }
            else
            {
                res.status(404).json({error: 'no se pudo actualizar el producto'}); 
            }
        
    } catch (error) {
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al actualizar'});  
    }
}

const deleteProduct = async(req, res) => {
    
    const id = req.params.id;
    try {
        const product = await db.Product.destroy({where : {id: id}});
        res.status(204).json();
        
    } catch (error) {
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al eliminar el producto'});  
    }
}

module.exports = {createProduct, getOneProduct, getProducts, updateProduct, deleteProduct};