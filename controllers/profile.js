const handleProfile = (req , res , db) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('USERS').where({ID: id}).then(user => {
        if(user.length) {
            return res.json(user);
        }else {
            res.status(400).json('not found');
        }
    }).catch(err => res.status(400).json('Error getting user'))
}

const getAllUsers = (req , res , db) => {
	db.select('*').from('USERS').then(users => {
		if(users.length) {
			res.json(users);
		}else {
			res.status(400).then('Dose not Users Exist');
		}
	})
}

module.exports = {
	handleProfile: handleProfile,
	getAllUsers: getAllUsers
}