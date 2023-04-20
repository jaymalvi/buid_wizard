module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      idUser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      fname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adharcard_no: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      aadharCardImageURL: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "aadharCardImageURL",
      },
      userImageURL: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "userImageURL",
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.TINYINT,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pincode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "user",
      timestamps: false,
    }
  );
  return user;
};
