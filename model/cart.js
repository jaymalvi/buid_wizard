const db = require('../database.js');

module.exports = class Cart {
    static async addToCart(cart) {
        const parsedCart = JSON.parse(cart.cart);

        const productQuery = 'INSERT INTO product (isBuild, Motherboard_idMotherboard, Cooling_System_idCooling_System, Cpu_idCpu, Graphic_Card_idGraphic_Card, Cabinet_idCabinet, Power_Supply_idPower_Supply) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const productValues = [1, parsedCart['Mother'], parsedCart['Cooling'], parsedCart['Cpu'], parsedCart['Gpu'], parsedCart['Case'], parsedCart['Power']];
        const [productResult] = await db.query(productQuery, productValues);
        const productId = productResult.insertId;

        const RamQuery = 'INSERT INTO Builds_has_Ram values(?,?)';
        const RamValues = [productId, parseInt(parsedCart['Ram'])];
        const [RamResult] = await db.query(RamQuery, RamValues);

        const StorageQuery = 'INSERT INTO Build_has_Storage values(?,?)';
        const StorageValues = [productId, parseInt(parsedCart['Storage'])];
        const [StorageResult] = await db.query(StorageQuery, StorageValues);

        const cartQuery = 'INSERT INTO cart (User_idUser) VALUES (?)';
        const cartValues = [1];
        const [cartResult] = await db.query(cartQuery, cartValues);
        const cartId = cartResult.insertId;

        const cartProductQuery = 'INSERT INTO cart_has_product (Cart_idCart, Product_idBuilds) VALUES (?, ?)';
        const cartProductValues = [cartId, productId];
        await db.query(cartProductQuery, cartProductValues);

        if (parsedCart['Monitor'] !== null) {
            const monitorQuery = 'INSERT INTO cart_has_peripheral (Cart_idCart, Peripheral_idPeripheral) VALUES (?, ?)';
            const monitorValues = [cartId, parsedCart['Monitor']];
            await db.query(monitorQuery, monitorValues);
        }

        if (parsedCart['Mouse'] !== null) {
            const mouseQuery = 'INSERT INTO cart_has_peripheral (Cart_idCart, Peripheral_idPeripheral) VALUES (?, ?)';
            const mouseValues = [cartId, parsedCart['Mouse']];
            await db.query(mouseQuery, mouseValues);
        }

        if (parsedCart['Keyboard'] !== null) {
            const keyboardQuery = 'INSERT INTO cart_has_peripheral (Cart_idCart, Peripheral_idPeripheral) VALUES (?, ?)';
            const keyboardValues = [cartId, parsedCart['Keyboard']];
            await db.query(keyboardQuery, keyboardValues);
        }
    };

    static getCart(uid) {
        // return db.query('select idCart from cart where User_idUser=?', [uid]).then(([cid]) => {
        //     if (cid.length >= 1) {
        //         cid = cid[0]['idCart'];
        //         console.log("CART ID: ", cid);
        //         return db.query('select Product_idBuilds from cart_has_product where Cart_idCart=?', [cid]).then(([pid]) => {
        //             if (pid.length >= 1) {
        //                 pid = pid[0]['Product_idBuilds'];
        //                 console.log("PRODUCT ID: ", pid);
        //                 return db.query('select * from product where idBuilds=?', [pid]);
        //             } else {
        //                 return [];
        //             }
        //         });
        //     } else {
        //         return [];
        //     }
        // });

        return db.query('SELECT Product.idBuilds, Motherboard.Name as MName, Motherboard.Price as MPrice,cabinet.Name as CName,cabinet.Price as CPrice,cabinet.ImageURL as CImageURL,cpu.Name as CPUName,cpu.Price as CPUPrice,graphic_card.Name as GPUName,graphic_card.Price as GPUPrice, cooling_system.Name as CLName,cooling_system.Price as CLPrice, power_supply.Name as PName,power_supply.Price as PPrice, Ram.Name as RName,Ram.Price as RPrice, Storage.Name as SName, Storage.Price as SPrice from user JOIN Cart ON User.idUser=cart.User_idUser JOIN cart_has_Product ON cart.idCart = cart_has_product.Cart_idCart JOIN Product ON cart_has_product.Product_idBuilds = Product.idBuilds LEFT JOIN motherboard ON Product.Motherboard_idMotherboard=Motherboard.idMotherboard LEFT JOIN Cabinet ON Product.Cabinet_idCabinet=Cabinet.idCabinet LEFT JOIN CPU ON Product.Cpu_idCpu = cpu.idCpu LEFT JOIN graphic_card ON Product.graphic_card_idGraphic_Card=graphic_card.idGraphic_Card LEFT JOIN Cooling_System ON Product.Cooling_System_idCooling_System=Cooling_System.idCooling_System LEFT JOIN Power_Supply ON Product.Power_Supply_idPower_Supply=Power_Supply.idPower_Supply LEFT JOIN builds_has_ram ON product.idBuilds=builds_has_ram.Builds_idBuilds LEFT JOIN Ram ON builds_has_ram.Ram_idRam=Ram.idRam LEFT JOIN build_has_storage ON product.idBuilds=build_has_storage.Builds_idBuilds LEFT JOIN Storage ON build_has_Storage.Storage_idStorage=Storage.idStorage where User.idUser=1');
    }


    // static getCartt() {
    //     return db.query('SELECT Motherboard.name AS motherboard, Cpu.name AS cpu, Gpu.name AS gpu, Cooling_System.name AS cooling_system, Ram.name AS ram, Storage.name AS storage, Power_Supply.name AS power_supply' +
    //         'FROM Cart_has_Product' +
    //         'JOIN cart ON cart.idCart = Cart_has_Product.Cart_idCart' +
    //         'JOIN product ON product.idBuilds = Cart_has_Product.Product_idBuilds' +
    //         'JOIN motherboard as m ON m.idMotherboard = product.Motherboard_idMotherboard' +
    //         'JOIN cpu as c ON c.idCpu = product.Cpu_idCpu' +
    //         'JOIN gpu as g ON g.idGraphic_Card = product.Graphic_Card_idGraphic_Card' +
    //         'JOIN cooling_system as cs ON cs.idCooling_System = product.Cooling_System_idCooling_System' +
    //         'JOIN ram as r ON r.idRAM = product.RAM_idRAM' +
    //         'JOIN storage as s ON s.idStorage = product.Storage_idStorage' +
    //         'JOIN power_supply as ps ON ps.idPower_Supply = product.Power_Supply_idPower_Supply' +
    //         'WHERE c.User_idUser = 1;');
    // }
}



