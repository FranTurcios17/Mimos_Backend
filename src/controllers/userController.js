const db = require('../../models');
const services = require('../services/services');


const {processUserData,processMultipleUsers} = services;

const createRole = async(req, res) =>
{
    const {rol_name} = req.body;
    try {
        const role = await db.Role.create({rol_name});

        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({error: 'no se pudo crear el rol'});
    }
}





const getUsers = async (req, res) =>
{
    
    try {
        const users = await db.User.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}, include : [
            {model: db.Costumer, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}}, 
            {model: db.BCostumer, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}}, 
            {model: db.Admin, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}},            
        ]});
        if(users)
        {
            const proUsers = processMultipleUsers(users);
            res.status(200).json(proUsers);
        }
        else
        {
            res.status(404).json({error: 'no hay usuarios registrados'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error al buscar los usuarios'});
    }
};



const getOneUser = async(req, res) =>
    {
        const id = req.params.id;

        try {
            const user = await db.User.findByPk(id, {attributes: {exclude: ['createdAt', 'updatedAt']}, include : [
                {model: db.Costumer, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}}, 
                {model: db.BCostumer, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}}, 
                {model: db.Admin, attributes: {exclude: ['id','createdAt', 'updatedAt','id_user']}},            
            ]});
        if(user)
            {
                const proUser = processUserData(user);
                res.status(200).json(proUser);
            }
            else
            {
                res.status(404).json({error: "usuario no encontrado"})
            }
        } catch (error) {
            res.status(500).json({error: "error al buscar el usuario"});   
        }
    }

const createUser = async (req, res) =>{
    const {email, password, role_id, user_info} = req.body;
    const trs = await db.sequelize.transaction();
    try {
        //comprobamos si ya existe
        const reqMail = email;
        const existingUser = await db.User.findOne({where: {email: reqMail }});
        
        if(existingUser)
        {
            return res.status(400).json({error: 'email already registred'});
        }
       
        const user = await db.User.create({email, password, role_id}, {transaction: trs});

        if(user_info && role_id == 1){
           await db.Costumer.create({...user_info, id_user: user.id}, {transaction: trs});
        }

        if(user_info && role_id == 2){
            await db.BCostumer.create({...user_info, id_user: user.id}, {transaction: trs});
        }
        if(user_info && role_id == 3)
        {
            await db.Admin.create({...user_info, id_user: user.id}, {transaction: trs});
        }

            await trs.commit();
        res.status(201).json(user);
            
    } catch (error) {
        await trs.rollback();
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al crear el usuario'});  
    }
};

const updateUser = async(req, res) => {
    const {email, password, user_info} = req.body;
    const id = req.params.id;
    const trs = await db.sequelize.transaction();

    try {
        const user = await db.User.findByPk(id, {transaction: trs});

        if(!user)
            {
                await trs.rollback();
                return res.status(404).json({error: 'no se pudo encontrar el usuario'});
            }

            await user.update({email, password}, {transaction: trs});

        if(user_info && user.role_id == 1)
        {
            await db.Costumer.update(user_info,{where: {id_user: user.id}, transaction: trs});
        }
        else if(user_info && user.role_id == 2)
        {
            await db.BCostumer.update(user_info,{where: {id_user: user.id}, transaction: trs});
        }
        else if(user_info && user.role_id == 3)
        {
            await db.Admin.update(user_info,{where: {id_user: user.id}, transaction: trs});
        }

        await trs.commit();
        res.status(203).json(user);        
        
    } catch (error) {
        await trs.rollback();
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al actualizar'});  
    }
}

const deleteUser = async(req, res) => {
    
    const id = req.params.id;
    const trs = await db.sequelize.transaction();

    try {

        await db.Costumer.destroy({where: {id_user: id}}, {transaction: trs});
        await db.BCostumer.destroy({where: {id_user: id}}, {transaction: trs});
        await db.Admin.destroy({where: {id_user: id}}, {transaction: trs});

        await db.User.destroy({where : {id: id}}, {transaction: trs});

        await trs.commit();
        res.status(204).json();
        
    } catch (error) {
        await trs.rollback();
        console.log("el error es: ", error);
        res.status(500).json({error: 'error al eliminar el usuario'});  
    }
}

module.exports = {getUsers, getOneUser, createUser, updateUser, deleteUser, createRole};