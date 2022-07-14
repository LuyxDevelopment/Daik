import { ButtonInteraction, CommandInteraction, SelectMenuInteraction, ModalSubmitInteraction, MessageComponentInteraction, ContextMenuInteraction, MessageOptions } from 'discord.js';

export type Repliable = ButtonInteraction | CommandInteraction | SelectMenuInteraction | ModalSubmitInteraction | MessageComponentInteraction | ContextMenuInteraction;

export type ResponseOptions = Omit<MessageOptions, 'flags'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Response = (...args: any[]) => ResponseOptions;

export interface Responses {
	[key: string]: Response;
}
