import { SlashCommandBuilder } from '@discordjs/builders';
import { DaikSlashCommand } from '../command/DaikSlashCommand.js';
import { DaikCommandResult } from '../typings/daik_command.js';

export default new DaikSlashCommand({
	name: 'ping',
	permissions: [],
	props: {},
	data: new SlashCommandBuilder().setName('ping').setDescription('You really need this?').toJSON(),
	run: (interaction, client, args): DaikCommandResult => {
		interaction.reply('hi');

		return {
			success: true,
		};
	},
});