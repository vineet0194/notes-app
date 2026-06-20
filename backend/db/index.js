const mongoose = require('mongoose');
const z = require('zod');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN_URL);

const jwtSecret = ''

const ZodUserSchema = z.object({
    firstName: z.string().max(10),
    lastName: z.string().max(10),
    username: z.string().max(10),
    email: z.email()
});


const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 10
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 10
    },
    username: {
        type: String,
        required: true,
        maxLength: 10
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
});

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20
    },
    content: {
        type: String,
        required: true,
        maxLength: 200
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', UserSchema);
const NoteModel = mongoose.model('note', NoteSchema);

module.exports = {
    ZodUserSchema,
    UserModel,
    NoteModel,
    jwtSecret
};