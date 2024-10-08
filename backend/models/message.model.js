import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    }

}, {
    Timestamps: true // createdAt and updatedAt: true 
});

const Message = mongoose.model("Message", messageSchema);

export default Message;