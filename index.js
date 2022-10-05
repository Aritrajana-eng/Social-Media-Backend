const express = require('express')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const router = require('./routes/user.routes')
const db = require('./models/index')
const multer = require('multer');
const upload = multer();

const app = express()

const PORT = 8000

app.use(cors())
app.use(express.json())
app.use(router)
app.use(upload.array()); 
app.use(express.static('public'));

const swaggerOptions = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Social Media Backend API',
            version: '1.0.0',
            description: 'Social Media Backend',
            contact:{
                name: 'Aritra Jana',
                url:'https://aritra.com',
                email:'aritrajana069@gmail.com'
            },
            servers: ['http://localhost:8000']
        }
    },
    apis:["./routes/*.js"]
}


const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})