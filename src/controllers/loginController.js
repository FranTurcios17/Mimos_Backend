const db = require('../../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_dev_secret';

const loginUser = async (req, res) =>{

    const {email, password} = req.body;

    const reqMail = email;
    try {
        const user = await db.User.findOne({
            where: {
              email: reqMail,
            },
            attributes: ['id', 'email', 'password', 'role_id'],
          });
          
        
        if(user)
        {
            
            if(user.password === password)
            {
                const token = jwt.sign({id: user.id, role_id: user.role_id}, JWT_SECRET, {expiresIn: '24h'});
                res.status(201).json({token});
            }
            else
            {
                res.status(401).json({error: 'Contraseña Incorrecta'});
            }
        }
        else
        {
            res.status(404).json({error: 'user not exist'});
        }
    } catch (error) {
        res.status(500).send('el error es: '+error);
    }

}

module.exports = {loginUser};