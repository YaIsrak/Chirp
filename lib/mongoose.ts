/* eslint-disable no-console */
import mongoose from 'mongoose';

let isConnected = false; // variable to check the connection

export const ConnectToDb = async () => {
	if (!process.env.MONGODB_URL) return console.log('Mongodb url not found');

	try {
		await mongoose.connect(process.env.MONGODB_URL);
		isConnected = true;

		console.log('🟢 Connected to MongoDB');
	} catch (error) {
		console.log(error);
	}
};
