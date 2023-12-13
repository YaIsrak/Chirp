import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	id: { type: String, require: true },
	name: { type: String, require: true },
	username: { type: String, require: true, unique: true },
	email: String,
	image: String,
	bio: String,
	onboarded: {
		type: Boolean,
		default: false,
	},
	Chrips: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chrip',
		},
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
