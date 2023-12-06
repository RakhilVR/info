const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    hashedPassword: {
        type: String
    },
    accountType: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("user", userSchema, "user")