const mongoose = require('mongoose');
const z = require('zod');
require('dotenv').config({path: '../.env'});

mongoose.connect(process.env.MONGODB_CONN_URL);

const ZodUserSchema = z.object({
    firstname: z.string().min(1).max(10),
    lastname: z.string().min(1).max(10),
    username: z.string().min(1).max(10),
    email: z.string().email(),
});

const ZodNoteSchema = z.object({
    title: z.string().min(1).max(20),
    content: z.string().min(1).max(200)
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
        unique: true,
        maxLength: 10
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', UserSchema);
const NoteModel = mongoose.model('note', NoteSchema);

module.exports = {
    ZodUserSchema,
    ZodNoteSchema,
    UserModel,
    NoteModel
};