const db = require('../database');

module.exports = class User {
    /* constructor(fname, lname, email, password) {
         this.fname = fname;
         this.lname = lname
         this.email = email;
         this.password = password;
     }*/

    static getIdByEmail(email) {
        console.log("Email: ", email);
        return db.execute('SELECT idUser FROM user WHERE email="' + email + '"');
    }

    static getPasswordByEmail(email) {
        return db.execute('SELECT password FROM user WHERE email="' + email + '"');
    }

    static add(email, hashedpassword, fname, lname, mobile) {
        return db.query('INSERT INTO user SET ?', { email: email, password: hashedpassword, fname: fname, lname: lname, phone_no: mobile, role: 'Customer' });
    }

    static getByID(uid){
        return db.query('select * from User where idUser=?',[uid]);
    }
}