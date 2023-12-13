'use server';

import Chrip from '../models/chrip.model';
import User from '../models/user.model';
import { ConnectToDb } from '../mongoose';
import { generateString } from '../utils';

interface Params {
	userid?: string;
	name: string;
	username: string;
	image: string;
	bio: string;
	email: string;
}

export async function UpdateUser({
	userid,
	name,
	username,
	image,
	bio,
	email,
}: Params): Promise<void> {
	ConnectToDb();

	try {
		await User.findOneAndUpdate(
			{ email: email },
			{
				id: userid || generateString(10),
				name,
				username,
				image,
				bio,
				email,
				onboarded: true,
			},
			{ upsert: true }
		);
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function fetchUser(username: string) {
	try {
		ConnectToDb();
		return User.findOne({ username: username }).populate({
			path: 'Chrips',
			model: Chrip,
			populate: {
				path: 'user',
				model: User,
			},
		});
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function fetchUserByEmail(email: string) {
	try {
		ConnectToDb();
		return User.findOne({ email: email });
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function fetchAllUser() {
	try {
		ConnectToDb();
		return User.find();
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}
