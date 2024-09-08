import User from "../models/user.model.js";

export const getUserSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({
            _id: {
                $ne: loggedInUserId
            }
        }).select("-password");

        res.json({
            filteredUsers
        });


    } catch (err) {
        console.log("error in getUserSideBar func  ", err.message);


        res.status(400).json({
            err: "internal server error"
        });
    }
}