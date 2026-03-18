import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
    {
        news: {
            create: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
            publish: { type: Boolean, default: false },
        },
        category: {
            create: { type: Boolean, default: false },
            edit: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
        },
        comment: {
            approve: { type: Boolean, default: false },
            delete: { type: Boolean, default: false },
        },
        user: {
            changeRole: { type: Boolean, default: false },
            managePermissions: { type: Boolean, default: false },
        },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["USER", "EDITOR", "ADMIN"],
            default: "USER",
            index: true,
        },
        permissions: {
            type: permissionSchema,
            default: () => ({}),
        }

        ,
        isActive: {
            type: Boolean,
            default: true,
        },

        bio: {
            type: String,
            default: "",
            maxlength: 500,
        },

        avatarUrl: {
            url: { type: String },
            publicId: { type: String },
        },

        preferredCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],


        socialLinks: {
            twitter: { type: String, default: "" },
            linkedin: { type: String, default: "" },
            facebook: { type: String, default: "" },
            instagram: { type: String, default: "" },
        },

        lastLogin: {
            type: Date,
        },

        loginAttempts: {
            type: Number,
            default: 0,
        },

        resetPasswordToken: {
            type: String,
        },

        resetPasswordExpires: {
            type: Date,
        },

        tokenVersion: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
            select: false,
        },

    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
