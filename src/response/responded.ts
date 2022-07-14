import { Replyable, Responses } from './typings/response.js';
import { Responder } from './responder.js';

export class Responded<R extends Responses> {
	private readonly responder: Responder<R>;
	private readonly interaction: Replyable;

	constructor(responder: Responder<R>, interaction: Replyable) {
		this.responder = responder;
		this.interaction = interaction;
	}

	public deleteAfter(time: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(async () => {
				await this.interaction.deleteReply().catch(() => { });
				resolve();
			}, time);
		});
	}

	public deleteOnResolve<T>(promise: Promise<T>): Promise<T> {
		promise.then(() => this.interaction.deleteReply().catch(() => { }));

		return promise;
	}

	public editAfter<K extends keyof R>(time: number, key: K, ...args: Parameters<R[K]>): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(async () => {
				await this.interaction.editReply(this.responder.create(key, ...args)).catch(() => { });
				resolve();
			}, time);
		});
	}

	public editOnResolve<T, K extends keyof R>(promise: Promise<T>, key: K, ...args: Parameters<R[K]>): Promise<T> {
		promise.then(() => this.interaction.editReply(this.responder.create(key, ...args)).catch(() => { }));

		return promise;
	}
}