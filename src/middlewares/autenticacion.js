const express = require('express');

function verifyKey(req, res, next)
{
    const key = req.headers['auth-key'];

    if(key === 'grupo#4')
        {
            next();
        }
        else
        {
            res.status(401).json({message: 'acesso denegado, clave de acceso invalida'});
        }
}

module.exports = verifyKey;