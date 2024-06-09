function processUserData(user)
{
    const userData = {
        id: user.id,
        email: user.email,
        password: user.password,
        role_id: user.role_id,
        user_info: null
    }
    
    switch(user.role_id)
    {
        case 1:
            userData.user_info = {...user.Costumer.dataValues};
            break;

        case 2:
            userData.user_info = {...user.BCostumer.dataValues};
            break;    
        case 3:
        userData.user_info = {...user.Admin.dataValues}
        break;
    }

    return userData;
}

function processMultipleUsers(users)
{
    return users.map(user => processUserData(user));
}

module.exports = {processMultipleUsers,processUserData};