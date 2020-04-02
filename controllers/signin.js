const handleSignin = (db , bcrypt) => (req , res) => {
    const { email , password } = req.body;
    if(!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    db.select('EMAIL' , 'HASH').from('LOGIN')
    .where('EMAIL' , '=' , email)
    .then(data => {
        const isValid = bcrypt.compareSync(password , data[0].HASH);
        if (isValid) {
            return db.select('*').from('USERS')
                .where('EMAIL' , '=' , email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('Unable to get user'))
        }else {
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
	handleSignin: handleSignin
}