import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
    phone: {
		type: String,
		required: true
	},
    username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatarUrl: {
		type: String
	},
	imageTag: {
		type: String
	}
},

    {
    timestamps: true
  }
);

//Document middleware for encrpting password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  next();
	}
  
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
  });
  
  userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

//Adding the Soft Delete Plugin
userSchema.plugin(softDeletePlugin);

const User = model('User', userSchema)

export default User;