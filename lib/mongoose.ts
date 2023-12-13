import mongoose from 'mongoose';

let isConnected = false; // variable to check the connection

export const ConnectToDb = async () => {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) return console.log('Mongodb url not found');

	if (isConnected) return console.log('Already connected');
	await mongoose.connect(process.env.MONGODB_URL);
	isConnected = true;

	console.log('Connected to MongoDB');

	try {
	} catch (error) {
		console.log(error);
	}
};
