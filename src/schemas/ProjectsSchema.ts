import mongoose from 'mongoose';

export default new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    generalInfo: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        githubLink: {
            type: String,
            required: true
        },
        projectLink: {
            type: String,
            required: false
        }
    },
    stackInfo: {
        stack: {
            type: mongoose.SchemaTypes.Mixed,
            required: true
        },
        icons: {
            type: mongoose.SchemaTypes.Mixed,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date
});