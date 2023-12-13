export interface UserData {
	_id: string;
	id: string;
	email: string;
	bio: string;
	name: string;
	image: string;
	onboarded: boolean;
	username: string;
	status: 'ban' | 'unban';
	Chrips: ChripType[];
}

export interface SessionType {
	user: {
		name: string;
		email: string;
		image: string;
	};
}

export type ChripType = {
	_id: string;
	text: string;
	user: UserData;
	createdAt: string;
	likes: UserData[];
};
