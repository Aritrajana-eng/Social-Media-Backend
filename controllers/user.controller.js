const {
    user_credential,
    user_detail,
    user_education,
    user_job,
    user_relationship,
    friendship
} = require('../models/index')

const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { where,sequelize } = require('sequelize');
const Sequelize = require('sequelize'); 
const op = Sequelize.Op;

dotenv.config({path: '.env'})

module.exports = {
    createUser,
    userLogin,
    userDetails,
    notification
}

async function createUser (req, res) {
    try {
        const rb = req.body
        // console.log(rb);
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(rb.password, salt)
        let result = await user_credential.create({
            email: rb.email,
            password: password,
            contact_number: rb.contact_number
        })
        // console.log(result);
        if (result) {
            const userDetails = {
                first_name: rb.first_name,
                middle_name: rb.middle_name || null,
                last_name: rb.last_name,
                user_id: result.id,
                date_of_birth: rb.date_of_birth ,
                bio: rb.bio || null,
                address: rb.address || null
            }
            await user_detail.create(userDetails)
            
            const userEducationDetails = rb.education.map(item => {
                return {
                    user_id: result.id,
                    from_year: item.from_year,
                    to_year: item.to_year,
                    degree_name: item.degree_name
                }
            })
            // console.log(userEducationDetails);

            await user_education.bulkCreate(userEducationDetails)

            const userJobDetails = rb.job.map(item => {
                return {
                    user_id: result.id,
                    from_year: item.from_year,
                    to_year: item.to_year,
                    job_designation: item.job_designation,
                    company_name: item.company_name,
                    company_address: item.company_address
                }
            })

            await user_job.bulkCreate(userJobDetails)

            await user_relationship.create({
                user_id: result.id,
                related_user_id: rb.related_user_id || null,
                relationship_status: rb.relationship_status ? rb.relationship_status : "Single"
            })
            return res.status(200).send('User Created Successfully')
        }
    } catch (error) {
        console.log(error);
    }
}

async function userLogin(req, res) {
    try {
       const rb = req.body
       let user
       if (rb.contact_number) {
        user = await user_credential.findOne({
            where: {
                contact_number: rb.contact_number
            }
        })
       } else if (rb.email) {
         user = await user_credential.findOne({
            where: {
                email: rb.email
            }
        })
       }
       if (user) {
        const password_valid = await bcrypt.compare(rb.password, user.password)
        if (password_valid) {
            const token = jwt.sign({
                "id": user.id
            }, process.env.SECRET)
            return res.status(200).json({
                "id": user.id,
                "token": token
            })
        } else {
            return res.status(400).send('Password Invalid try again')
        }
       } else {
        return res.status(404).send('User not found')
       } 
    } catch (error) {
        console.log(error);
    }
}


async function userDetails(req, res) {
    try {
        // console.log(req.user);
        const user = await user_credential.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','email','contact_number'],
            include:[
                {
                    model: user_detail,
                    attributes: ['first_name', 'middle_name', 'last_name', 'date_of_birth', 'bio', 'address', 'profile_pic']
                },
                {
                    model: user_education,
                    attributes: ['from_year','to_year','degree_name']
                },
                {
                    model: user_job,
                    attributes: ['from_year', 'to_year', 'job_designation', 'company_name', 'company_address']
                },
                {
                    model: user_relationship,
                    attributes: ['related_user_id', 'relationship_status']
                }
            ]
        })
        return res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
}

async function notification(req, res) {
    try {
        const user = req.user
        
        const notificationDetails = await friendship.findAll({
            where: {
                request_user_id: user,
                accepted: false
            },
            attributes:["user_id","accepted"],
            // include: [
            //     {
            //         model: user_detail,
            //         attributes: ["first_name", "middle_name", "last_name"],
            //         where: {
            //             user_id: { [op.col]: 'friendship.user_id' }
            //         }
            //     }
            // ]
        })

        if (notificationDetails.length) {
            return res.status(200).send(notificationDetails)
        } else {
            return res.status(200).send("No Notification Found")
        }
    } catch (error) {
        console.log(error);
    }
}
