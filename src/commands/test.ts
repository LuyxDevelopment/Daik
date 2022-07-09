import { DaikUserCommand } from '../command/DaikUserCommand.js';
import { DaikCommandResult } from '../typings/daik_command.js';

export default new DaikUserCommand({
	name: 'test',
	permissions: [],
	props: {},
	run: (interaction, client, args): DaikCommandResult => {
		interaction.reply('yaaaah');

		return {
			success: true,
		};
	},
});