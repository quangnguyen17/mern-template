const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: [true, "First Name is required"],
        minlength: [2, "First Name must at least be 2 characters."]
    },
    lastName: {
        type: String,
        require: [true, "Last Name is required"],
        minlength: [2, "Last Name must at least be 2 characters."]
    },
    email: {
        type: String,
        require: [true, "Email is required"],
        validate: {
            validator: v => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    }
}, { timestamps: true });

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("Failed to hash password. Please try again. :(", err);
            next();
        });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;