const handleRegister = (db , bcrypt) => (req , res) => {
    const { email , password , name } = req.body;
    if(!email || !password || !name) {
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            HASH: hash,
            EMAIL: email
        })
        .into('LOGIN')
        .returning('EMAIL')
        .then(loginEmail => {
            return trx('USERS')
            .returning('*')
            .insert({
                NAME: name,
                EMAIL: loginEmail[0],
                JOINED: new Date()  
            })
            .then(data => {
                res.json(data[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to Register'))
}

module.exports = {
	handleRegister: handleRegister
}