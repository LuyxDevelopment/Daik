import { ButtonInteraction, CommandInteraction, SelectMenuInteraction, ModalSubmitInteraction, MessageComponentInteraction, ContextMenuInteraction, MessageOptions } from 'discord.js';

export type Replyable = ButtonInteraction | CommandInteraction | SelectMenuInteraction | ModalSubmitInteraction | MessageComponentInteraction | ContextMenuInteraction;

export type ResponseOptions = Omit<MessageOptions, 'flags'>;

export type Response = (...args: unknown[]) => Omit<ResponseOptions, 'flags'>;

export interface Responses {
	[key: string]: Response;
}
