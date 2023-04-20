const db = require('../database.js');

module.exports = class Component {
    static getCabinet(){
        return db.query('select * from cabinet');
    }

    static getCooling(){
        return db.query('select * from Cooling_System');
    }

    static getMother(){
        return db.query('select * from motherboard');
    }

    static getGpu(){
        return db.query('select * from Graphic_Card');
    }

    static getCpu(){
        return db.query('select * from cpu');
    }

    static getPower(){
        return db.query('select * from Power_Supply');
    }

    static getRam(){
        return db.query('select * from ram');
    }

    static getStorage(){
        return db.query('select * from storage');
    }

    static postChipset(chipset){
       //return db.query('insert into product (idBuilds, isBuild,chipset) values(?,1,?)',[5,chipset]);
        return db.query('select * from storage');
    }

    static getPeripherals(){
        return db.query('select * from peripheral');
    }
}