const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Register

router.post('/register',async(req, res)=>{
    try{
        const { email,password,role } = req.body;
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "User Exist"});
        user = new User({email,password,role});
        await user.save();

        const payload = {user: { id: user.id,role:user.role } };
        jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '1h'}, (err,token) =>{
            if(err) throw err;
            res.json({token});
        });
        }catch(err){
            res.status(500).send('Server error');
        }
    });


    //Login

    router.post('/login',async(req, res)=>{
        const { email,password,role } = req.body;
        try{
            
            let user = await User.findOne({ email });

            if(!user) return res.status(400).json({msg: 'Invalid Credentials'});
          
            const isMatch =await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});
    
            const payload = {user: { id: user.id,role:user.role } };
            jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: '1h'}, (err,token) =>{
                if(err) throw err;
                res.json({token});
            });
            }catch(err){
                res.status(500).send('Server error');
            }
    });
    module.exports =router;