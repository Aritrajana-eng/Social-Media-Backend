module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Aritra17@',
    DB: 'Social_media_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}