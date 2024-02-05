const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const catchAsync = require('../helpers/catchAsync');
const create = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const user = await User.create(req.body);
    res.send(user);
});

const getAll = catchAsync(async (req, res) => {
    const users = await User.find(req.query);
    res.send(users);
});

const getByID = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const updateByID = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    console.log("req.params = ", req.params);
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const deleteByID = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
        console.log("user delete = ", user);
        res.send(user);
    } else {
        res.status(404).send('Not Found');
    }
});

const login = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'L\'email ou le mot de passe est incorrect.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'L\'email ou le mot de passe est incorrect.' });
    }
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '14d' });
    res.json({ token });
});


const register = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const {firstname, lastname, email,phone, password,confirmpassword} = req.body;
    if (!email || !password || !confirmpassword || !firstname || !lastname || !phone) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    if(password !== confirmpassword) {
        return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
    }

    if (!checkName(firstname) || !checkName(lastname)) {
        return res.status(400).json({ error: 'Il y a une erreur dans le prénom ou le nom.' });
    }

    if (!checkPhone(phone)) {
        return res.status(400).json({ error: 'Il y a une erreur dans le numéro de téléphone.' });
    }

    if (!checkPassword(password)) {
        return res.status(400).json({ error: 'Il y a une erreur dans le mot de passe.' });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        return res.status(400).json({ error: 'Un utilisateur avec cet email existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        firstname:firstname.toLowerCase(),
        lastname:lastname.toLowerCase(),
        email:email.toLowerCase(),
        phone,
        password: hashedPassword,
    });
    res.send(newUser);
});

const checkName = (name) => {
    return !(name.length < 2 || name.length > 20 || name.match(/[^a-zA-Z\\'-]/) !== null);
}

const checkPhone = (phone) => {
    return !(phone.length !== 10 || phone.match(/[^0-9]/) !== null || phone.match(/^0/) === null);
}

const checkPassword = (password) => {
    return !(password.length < 8 || password.length > 32 || password.match(/[0-9]/) === null || password.match(/[A-Z]/) === null || password.match(/[a-z]/) === null || password.match(/[=_.!@#$%^&\\+]/) === null);
}

module.exports = {
    create,
    getAll,
    getByID,
    updateByID,
    deleteByID,
    login,
    register,
}