import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const userSchema = new Schema({
	fullname: {
		type: String,
		trim: true,
		required: [true, 'Must provide fullname']
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'Must have email'],
		lowercase: true,
	},
    phone: {
		type: String,
		trim: true,
		required: [true, 'Must provide phone number']
	},
    username: {
		type: String,
		trim: true,
		required: [true, 'Must provide username']
	},
	password: {
		type: String,
		required: [true, 'Please enter password'],
		minLength: 8,
		select: false,
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