import User from "../models/user.model.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
import generateTokenAndSetCookie from "../utils/generateJWT.js";

const saltRounds = 10;
export const signup = async(req, res) => {
    // res.send("efgerg");
    // const {uname , password , email }
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            res.status(400).json({
                msg: "password doesnt match with confirm password"
            });

        }

        const user = await User.findOne({
            username: username
        })
        console.log(user);
        if (user) {

            return res.status(400).json({
                error: "username already exists"
            });
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

        // const salt=await bcrypt.genSalt(10);
        // const hashPassword=bcrypt.hash()
        // let hashedPassword = "";


        const hashedPassword = await bcrypt.hash(password, saltRounds);


        const newUser = new User({
            fullname,
            username,
            gender,
            password: hashedPassword,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            await generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();


            res.status(201).json({
                msg: `user created successfully named : ${username}`,
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({
                err: "Invalid useer data "
            })
        }



    } catch (error) {
        console.log("error in signup ");
        console.log(error.message);
        res.status(500).json({
            err: "internal server error"
        });

    }
}
export const login = async(req, res) => {
    // res.send("efeqrfrf")
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({
            username
        });
        if (!userExists) {
            res.status(400).json({
                msg: "no such user in the db"
            });
        }

        const result = await bcrypt.compare(password, userExists.password || "");
        if (result) {
            await generateTokenAndSetCookie(userExists._id, res);

            res.json({
                msg: "login successfull"
            });

        } else {
            res.status(400).json({
                msg: "password is incorrect"
            })
        }

    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            error: "user k sath lol haoi "
        })
    }

}
export const logout = (req, res) => {
    // res.send("asdfasdfasdf");
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "internal server error"
        });

    }


}



// ti1T1Wnk9VWuEBgN