
const express = require('express');
const router = express();
const userCollection = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'kkeeyy';


module.exports = {

    doUserRegistration: async (req, res) => {
        try {
            const { name, email, password, accountType } = req.body;

         
            if (!name)
                return res.status(400).json({
                    error: "You must enter your name"
                });
            if (!email)
                return res.status(400).json({
                    error: "You must enter your email"
                });
            if (!password)
                return res.status(400).json({
                    error: "You must enter your password"
                })

            if (!accountType)
                return res.status(400).json({
                    error: "You must enter your AccountType"
                })



            const existingUser = await userCollection.findOne({ email });

            // console.log(existingUser);

            if (existingUser) {
                return res.status(400).json({
                    error: "Email address is already in exist use different one"
                })
            }


            const saltRounds = 10;
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) return reject(err);

                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) return reject(err);

                        resolve(hash);
                    });
                });
            });

            if (name && email && password !== null) {
                const userDetails = new userCollection({
                    name, email, hashedPassword, accountType
                });

                const userDetailsSave = await userDetails.save();

                if (userDetailsSave) {
                    res.status(200).json({
                        success: true,
                        messege: "signup successfully completed",
                        userDetails: { name: userDetailsSave.name, email: userDetailsSave.email }
                    })
                } else {
                    return res.status(500).json({
                        error: "Failed. Please try again later."
                    });
                }

            }

            // console.log(req.body);
        } catch (err) {

            console.log(err);
            res.status(400).json({
                error: err
            })

        }
    },


    doLogin: async (req, res) => {
        try {
            const { email, password } = req.body;


            if (!email) {
                return res.status(400).json({
                    error: "You must enter email"
                })
            }

            if (!password) {
                return res.status(400).json({
                    error: "You must enter password"
                })
            }


            const userExist = await userCollection.findOne({ email });

            if (!userExist) {
                return res.status(400).json({
                    err: 'User not found or invalid credentials',
                });
            }

            const passwordsMatch = await bcrypt.compare(password, userExist.hashedPassword);

            if (!passwordsMatch) {
                return res.status(400).json({
                    err: 'Wrong Password',
                });
            }


            const token = jwt.sign({ userId: userExist._id, email: userExist.email }, secretKey, {
                expiresIn: '1h',
            });


            res.status(200).json({
                success: "true",
                token,
                user: {
                    userId: userExist._id,
                    email: userExist.email,

                },
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    }

}