const Component = require("../model/BuildComponent");
const Cart = require("../model/Cart");
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const expValidator = require('express-validator/');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));



exports.getFilterPage = (req, res) => {
    console.log("HOME");
    res.render('customer/filter.ejs', {
        title: 'Home',
        path: '/',
        role: 'Cust',
        chipset: ''
    });
}

exports.getHome = (req, res) => {
    res.render('customer/home.ejs', {

    });
}

exports.getLogin = (req, res) => {
    res.render('customer/login.ejs', {

    })
}

exports.getSignup = (req, res) => {
    res.render('customer/signup.ejs'), {

    }
}

exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log("E: ", email);

    User.getIdByEmail(email).then(([user, fieldData]) => {
        if (user.length <= 0) {

            // res.send("Username or Password Incorrect!!");
            console.log("Username doesn't exist");
            res.status(422).render('customer/login', {
                title: "Login",
                path: 'customer/login',
                errorMessage: "Username doesn't exist",
                oldInput: { email: email, password: password },
                role: 'learner',
                validationErrors: [{ param: 'email' }]
            });

        } else {
            User.getPasswordByEmail(email).then(([Upassword, fieldData]) => {
                bcrypt.compare(password, Upassword[0].password).then(isMatch => {
                    if (!isMatch) {
                        console.log('Username or Password Incorrect!!');
                        // return res.send("Username or password Incorrect");

                        return res.status(422).render('learner/login', {
                            title: "Login",
                            path: '/login',
                            errorMessage: "Username or Password Incorrect!!",
                            oldInput: { email: email, password: password },
                            role: 'learner',
                            validationErrors: [{ param: 'email', param: 'password' }],
                        });

                    } else {
                        console.log('Success Login');

                        req.session.isLoggedIn = true;
                        req.session.loggedInId = user[0].idUser;
                        var first = new String(user[0].fname).charAt(0);
                        var second = new String(user[0].lname).charAt(0);
                        req.session.nameLogo = first + second;
                        res.redirect('/');
                        /*req.session.save(err => {
                            if (err) throw err;
                            res.redirect('/admin/admin');
                        });*/
                    }
                });
            });
        }
    });
}



exports.postSignup = (req, res) => {
    console.log("Sigup");
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let mobile = req.body.mobile;

    User.getIdByEmail(email).then(([user, fieldData]) => {
        if (user.length > 0) {
            // return res.send("That Email is already Taken!!");
            return res.status(422).render('learner/signup', {
                title: "Signup",
                path: '/admin/',
                errorMessage: "That Email is already Taken!!",
                oldInput: { email: email, password: password, cpassword: cpassword, fname: fname, lname: lname, phone_no: mobile },
                role: 'learner',
                categories: categories,
                validationErrors: [{ param: 'email' }]
            });
        } else if (password != cpassword) {
            return res.send('password does not Match!!');
        } else {
            bcrypt.hash(password, 8)
                .then(hashedpassword => {

                    User.add(email, hashedpassword, fname, lname, mobile).then(() => {
                        return res.redirect('/login');
                    })

                });
        }
    });
}

exports.getCart = (req, res) => {
    const uid = 1;

    Cart.getCart(uid).then(([prods]) => {
        console.log(prods);
        res.render('customer/cart.ejs', {
            builds: prods,
            errorMessage: '',
            total: '',
            peripherals: ''
        });
    });
}

exports.postCart = (req, res) => {


}

exports.getPayment = (req, res) => {

}

exports.postPayment = (req, res) => {

}

exports.selectCabinet = (req, res) => {
    Component.getCabinet().then(([cabinets]) => {
        console.log(cabinets);
        res.send(cabinets);
    });
}

exports.selectCooling = (req, res) => {
    Component.getCooling().then(([Coolings]) => {
        res.send(Coolings);
    })
}

exports.selectMother = (req, res) => {
    Component.getMother().then(([Mothers]) => {
        res.send(Mothers);
    })
}

exports.selectGpu = (req, res) => {
    Component.getGpu().then(([Gpus]) => {
        res.send(Gpus);
    })
}

exports.selectCpu = (req, res) => {
    Component.getCpu().then(([Cpus]) => {
        res.send(Cpus);
    })
}

exports.selectPower = (req, res) => {
    Component.getPower().then(([Powers]) => {
        res.send(Powers);
    })
}

exports.selectRam = (req, res) => {
    Component.getRam().then(([Rams]) => {
        res.send(Rams);
    })
}

exports.selectStorage = (req, res) => {
    Component.getStorage().then(([Storages]) => {
        res.send(Storages);
    })
}

exports.postChipset = (req, res) => {
    console.log("option: ", req.body);
    const selectedChipset = req.body.chipset;
    console.log("option: ", selectedChipset);

    Component.postChipset(selectedChipset).then(() => {
        console.log("Form Submitted");
        res.redirect('/filter?modal=hidden&chipset=' + selectedChipset);
    });
}

exports.selectChipset = (req, res) => {
    chipsets = [{
        idChipset: 1,
        Name: 'AMD',
        ImageURL: '/img/v1_139.png'
    },
    {
        idChipset: 1,
        Name: 'INTEL',
        ImageURL: '/img/blackCabinet.png'
    }];
    res.send(chipsets);
}

exports.addComponentToBuild = (req, res) => {

}

exports.addPeripheralToCart = (req, res) => {

}

exports.getPeripherals = (req, res) => {
    Component.getPeripherals().then(([peripheral]) => {
        res.send(peripheral);
    })
}

exports.addToCart = (req, res) => {
    var cart = req.body;

    Cart.addToCart(cart).then(() => {
        res.redirect('/filter?modal=hidden&chipset=amd');
    });
    console.log("Cart: ", cart);
}

exports.getCheckout = (req, res) => {
    User.getByID(1).then(([user]) => {
        res.render('customer/checkout.ejs', {
            user: user[0]
        });
    })


}

