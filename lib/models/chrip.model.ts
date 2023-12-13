import mongoose from 'mongoose';

const chripSchema = new mongoose.Schema({
	text: { type: String, require: true },
	user: {
		require: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	parentId: {
		type: String,
	},
	children: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chrip',
		},
	],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const Chrip = mongoose.models.Chrip || mongoose.model('Chrip', chripSchema);
export default Chrip;
