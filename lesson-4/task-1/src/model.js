import Sequelize from 'sequelize';

const sequelize = new Sequelize('HOSPITAL', 'root', 'dimozzz_4el', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
});

export const Resolution = sequelize.define('resolution', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize.sync({ force: true }).then((result) => {
    console.log(result);
})
    .catch((err) => console.log(err));

export const Patient = sequelize.define('patient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize.sync({ force: true }).then((result) => {
    console.log(result);
})
    .catch((err) => console.log(err));
