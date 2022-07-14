import { ButtonInteraction, MessageOptions, CacheType, InteractionResponseFields } from 'discord.js';

export type Repliable = ButtonInteraction<CacheType> & InteractionResponseFields<CacheType>;

export type ResponseOptions = Omit<MessageOptions, 'flags'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response = (...args: any[]) => ResponseOptions;

export interface Responses {
	[key: string]: Response;
}
