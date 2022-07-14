import { Replyable, Responses } from './typings/response.js';
import { Responded } from './responded.js';

export class Responder<R extends Responses> {
	private responses: R;

	constructor(responses: R) {
		this.responses = responses;
	}

	public create<K extends keyof R>(key: K, ...args: Parameters<R[K]>): ReturnType<R[K]> {
		return this.responses[key]!(...args) as ReturnType<R[K]>;
	}

	public async send<K extends keyof R>(interaction: Replyable, key: K, ...args: Parameters<R[K]>): Promise<Responded<R>> {
		const reply = this.create(key, ...args);

		if (interaction.deferred) {
			await interaction.editReply(reply);
		} else {
			await interaction.reply(reply);
		}

		return new Responded(this, interaction);
	}
}