const { fakerFR } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Order = require('../models/order.model');
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

const updateByID = catchAsync( async (req, res) => {
    const data = req.body;
    console.log("updatedUser = ", {
        firstname: data.firstname ? data.firstname : undefined,
        lastname: data.lastname ? data.lastname : undefined,
        email: data.email ? data.email : undefined,
        phone: data.phone ? data.phone : undefined,
        password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
        favorites: data.favorites ? JSON.parse(data.favorites) : undefined,
        role: data.role ? data.role : undefined,
        billingInfo: data.billingInfo ? JSON.parse(data.billingInfo) : undefined,
        deliveryInfo: data.deliveryInfo ? JSON.parse(data.deliveryInfo) : undefined,
    });

    const updated = await User.findByIdAndUpdate(req.params.id, {
        firstname: data.firstname ? data.firstname : undefined,
        lastname: data.lastname ? data.lastname : undefined,
        email: data.email ? data.email : undefined,
        phone: data.phone ? data.phone : undefined,
        password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
        favorites: data.favorites !== 'undefined' ? JSON.parse(data.favorites) : undefined,
        role: data.role ? data.role : undefined,
        billingInfo: data.billingInfo !== 'undefined' ? JSON.parse(data.billingInfo) : undefined,
        deliveryInfo: data.deliveryInfo !== 'undefined' ? JSON.parse(data.deliveryInfo) : undefined,
    });

    if (!updated) {
        return res.status(404).send('User not found');
    }

    res.status(200).send(updated);
});

const deleteByID = catchAsync(async (req, res) => {
    const order = await Order.deleteMany({user: req.params.id});
    const user = await User.findByIdAndDelete(req.params.id);
    if (user && order) {
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
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("user = ", user);
    if (user===null) {
        setTimeout(() => {
            res.status(401).json({ error: 'L\'email ou le mot de passe est incorrect.' });
        }, 2000);
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("passwordMatch = ", passwordMatch)
    if (!passwordMatch) {
        setTimeout(() => {
            res.status(401).json({ error: 'L\'email ou le mot de passe est incorrect.' });
        }, 2000);
        return
    }
    const token = jwt.sign({ userId: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, phone: user.phone, role: user.role }, 'your-secret-key', { expiresIn: '14d' });
    res.json({ token });
});


const register = catchAsync(async (req, res) => {
    console.log("req.body = ", req.body);
    const {firstname, lastname, email,phone, password,confirmPassword} = req.body;
    if (!email || !password || !confirmPassword || !firstname || !lastname || !phone) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    if(password !== confirmPassword) {
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
        deliveryInfo: {
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            email: email.toLowerCase(),
            phone,
        }
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

const fakeUser = catchAsync(async (req, res) => {
    const users = [];
    for (let i = 0; i < req.params.number; i++) {
        const user = {
            firstname: fakerFR.person.firstName(),
            lastname: fakerFR.person.lastName(),
            email: fakerFR.internet.email(),
            phone: fakerFR.phone.number("06########"),
            password: fakerFR.internet.password(),
        };
        console.log("user = ", user);
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user);
        users.push(user);
    }
    res.send(users);
});

module.exports = {
    create,
    getAll,
    getByID,
    updateByID,
    deleteByID,
    login,
    register,
    fakeUser,
}