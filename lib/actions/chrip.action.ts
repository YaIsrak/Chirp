'use server';

import Chrip from '../models/chrip.model';
import User from '../models/user.model';
import { ConnectToDb } from '../mongoose';

interface Params {
	text: string;
	user: string;
	email: string;
}

export async function CreateChrip({ text, user, email }: Params) {
	try {
		ConnectToDb();
		const createChrip = await Chrip.create({ text, user });

		await User.findOneAndUpdate(
			{ email: email },
			{
				$push: { Chrips: createChrip._id },
			}
		);
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function fetchAllChrip() {
	try {
		ConnectToDb();
		const data = await Chrip.find()
			.sort({ createdAt: 'desc' })
			.populate({
				path: 'user',
				model: User,
			})
			.populate({
				path: 'children',
				populate: {
					path: 'user',
					model: User,
				},
			})
			.populate({
				path: 'likes',
				model: User,
			});

		return { data, revalidate: 60 };
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function fetchSingleChrip(id: string) {
	try {
		ConnectToDb();
		return await Chrip.findById(id)
			.populate({
				path: 'user',
				model: User,
			})
			.populate({
				path: 'children',
				populate: {
					path: 'user',
					model: User,
				},
			})
			.populate({
				path: 'likes',
				model: User,
			});
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function DeleteChrip(id: string) {
	try {
		ConnectToDb();
		return await Chrip.findByIdAndDelete(id);
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function LikeCrip(id: string, userid: string) {
	try {
		ConnectToDb();
		await Chrip.findByIdAndUpdate(id, {
			$push: { likes: userid },
		});
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}

export async function RemoveLike(id: string, userid: string) {
	try {
		ConnectToDb();
		await Chrip.findByIdAndUpdate(id, {
			$pull: { likes: userid },
		});
	} catch (error: any) {
		throw new Error(`Failed to create Update user: ${error.message}`);
	}
}
