import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req, res) => {
    // console.log("message sent ");
    // res.json({
    //     msg: "Message sent successfully"
    // })
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });

        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message

        });
        if (newMessage) {

            conversation.messages.push(newMessage._id);
            // await newMessage.save();
            // await conversation.save(); // THIs will run one after one 
            await Promise.all([newMessage.save(), conversation.save()]); // will run parallely both processes





        }
        // await newMessage.save();
        res.json({
            newMessage,
            conversation
        })



    } catch (err) {
        console.log("err in send message ", err.message);
        res.status(400).json({
            err: "internal server error"
        });

    }

}

// export const getMessages = async(req, res) => {
//     try {
//         const senderId = req.user.userId;
//         const userToChat = req.params;

//         const conversations = await Conversation.findOne({
//             participants: { $all: [senderId, userToChat] }
//         });
//         if (!conversations) {
//             res.status(400).json({
//                 msg: "conversation not found"
//             })
//         }

//         console.log(conversations);
//         // let allMessages = [];
//         // for (let i = 0; i < allMessagesId.length; i++) {
//         //     let message = await Message.find({ senderId, receiverId: userToChat });
//         //     allMessages.push(message);

//         // } // innefficient code 


//         const allMessages = await Message.find({
//             _id: { $in: conversations.messages }
//         });

//         res.json({
//             allMessages
//         })


//         if (!conversation) {
//             return res.status(400).json({
//                 msg: "Conversation not found"
//             });
//         };




//     } catch (err) {
//         console.log("this erro is in get messages ", err.message);
//         res.status(400).json({
//             err: "internal server error"
//         });

//     }
// }
export const getMessages = async(req, res) => {
    try {
        const senderId = req.user._id; // Sender (logged-in user)
        const { id: userToChat } = req.params; // Receiver's ID from route params
        console.log(senderId);

        // Find the conversation between the two users
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] },
        });

        if (!conversation) {
            return res.status(400).json({
                msg: "Conversation not found",
            });
        }

        // Retrieve all messages in the conversation
        const allMessages = await Message.find({
            _id: { $in: conversation.messages },
        });

        res.json({ allMessages });
    } catch (err) {
        console.log("Error in getMessages:", err.message);
        res.status(500).json({
            err: "Internal server error",
        });
    }
};