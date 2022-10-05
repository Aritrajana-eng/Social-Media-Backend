const dbconfig = require('../config/database')
const {Sequelize, DataTypes} = require('sequelize')


const sequelize = new Sequelize(
  dbconfig.DB,
  dbconfig.USER,
  dbconfig.PASSWORD,
  {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    logging: true,
    pool: {
      max: dbconfig.pool.max,
      min: dbconfig.pool.min,
      acquire: dbconfig.pool.acquire,
      idle: dbconfig.pool.idle
    }
  }
)

try {
    sequelize.authenticate().then(function () {
        console.log('Database Connection has been established successfully')
    })
} catch (e) {
    console.error('Unable to connect to the database', e)
}

const db = {}

db.Sequelize = sequelize
db.sequelize = sequelize

// db.User = require('./user')(sequelize, DataTypes)
db.user_credential = require('./user_credential')(sequelize, DataTypes)
db.user_detail = require('./user_detail')(sequelize, DataTypes)
db.user_education = require('./user_education')(sequelize, DataTypes)
db.user_job = require('./user_job')(sequelize, DataTypes)
db.user_relationship = require('./user_relationship')(sequelize, DataTypes)
db.friendship = require('./friendship')(sequelize, DataTypes)

db.user_credential.hasOne(db.user_detail, { foreignKey: 'user_id' })
db.user_credential.hasMany(db.user_education, { foreignKey: 'user_id' })
db.user_credential.hasMany(db.user_job, { foreignKey: 'user_id' })
db.user_credential.hasOne(db.user_relationship, { foreignKey: 'user_id' })
db.user_credential.hasMany(db.friendship, { foreignKey: 'user_id' })
db.friendship.hasOne(db.user_detail, { foreignKey: "user_id" })
db.user_detail.hasOne(db.friendship, { foreignKey: 'user_id' })

db.sequelize.sync({ force: false })
.then(() => {
  console.log('Yes re-sync done')
})

module.exports = db
