import { ButtonInteraction, CommandInteraction, SelectMenuInteraction, ModalSubmitInteraction, MessageComponentInteraction, ContextMenuInteraction, MessageOptions } from 'discord.js';

export type Replyable = ButtonInteraction | CommandInteraction | SelectMenuInteraction | ModalSubmitInteraction | MessageComponentInteraction | ContextMenuInteraction;

export interface Responses {
	[key: string]: (...args: unknown[]) => Omit<MessageOptions, 'flags'>;
}
