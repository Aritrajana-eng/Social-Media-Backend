const {
    user_credential,
    user_detail,
    user_education,
    user_job,
    user_relationship,
    friendship
} = require('../models/index')

const _ = require('lodash')
const dotenv = require('dotenv');
dotenv.config({path: '.env'})
const { arrayElements } = require('../helper/arrayElements')

module.exports = {
    sendFriendRequest,
    friendRequestUpdate,
    mutualFriendList
}

async function sendFriendRequest (req, res) {
    try {
        const user = req.user
        const rb = req.body
        // console.log(rb);
        const IsThereAnyFriendRequestFromFriendId = await friendship.findOne({
            where: {
                user_id: rb.friend_id
            }
        })
        if (IsThereAnyFriendRequestFromFriendId) {
            // console.log('here');
            return res.status(200).send('You Have Already Pending Friend Request')
        }
        // console.log(IsThereAnyFriendRequest);
        const IsFriendRequestSend = await friendship.findOne({
            where: {
                user_id: user,
                request_user_id: rb.friend_id
            },
            attributes: ["user_id", "request_user_id"]
        })
        // console.log(IsFriendRequestSend);
        if (IsFriendRequestSend === null) {
            await friendship.create({
                user_id: user,
                request_user_id: rb.friend_id,
                accepted: false
            })
            return res.status(200).send('Friend Request Send successfully')
        } else if (IsFriendRequestSend.request_user_id == rb.friend_id && IsFriendRequestSend.user_id === user) {
            return res.status(200).send('Friend Request Already Send successfully')
        }
    } catch (error) {
        console.log(error);
    }
}

async function friendRequestUpdate (req, res) {
    try {
        const rb = req.body
        const totalNumberFriendRequest = await friendship.findAndCountAll({
            where: {
                request_user_id: req.user
            },
            attributes: ["user_id", "request_user_id", "accepted"]
        })
        if (totalNumberFriendRequest.count > 0) {
            await friendship.update(
                {
                    accepted: rb.accepted
                },
                {
                    where: {
                        user_id: rb.user_id
                    }
                }
            )
            return res.status(200).send("Friend Request Updated successfully")
        } else {
            return res.status(200).send("You Have No Friend Request")
        }
    } catch (error) {
        console.log(error);
    }
}

async function mutualFriendList(req, res) {
    try {
        const user = req.user
        const rb = req.body
        
        const userFriendList = await friendship.findAll({
            where: {
                user_id: user,
                accepted: true
            },
            attributes: ["request_user_id", "accepted"]
        })
        const friendListOfAnotherUser = await friendship.findAll({
            where: {
                user_id: rb.user_id,
                accepted: true
            },
            attributes: ["request_user_id", "accepted"]
        })
        const commonFriend = userFriendList.filter(item => friendListOfAnotherUser.some(({request_user_id}) => item.request_user_id === request_user_id))
        // console.log(commonFriend);
        if (commonFriend.length) {
            var userInfo = []
            let result = commonFriend.map(item => {
                return item.request_user_id
            })
            let arrayValue = arrayElements(result)
            
            for (const value in arrayValue) {
                const nameOfTheUser =  await userDetailsUsingId(arrayValue[value])
                userInfo.push(nameOfTheUser)
            }
        }
        return res.status(200).json({
            "Number Of Mutual Friend": commonFriend.length,
            "Mutual Friend": userInfo,
        })
    } catch (error) {
        console.log(error);
    }
}

async function userDetailsUsingId(id) {
    try {
        const detail = await user_detail.findOne({
            where: {
                user_id: id
            },
            attributes: ["first_name", "middle_name", "last_name"]
        })
        return detail
    } catch (error) {
        console.log(error);
    }
}