import { Interaction, CacheType } from 'discord.js';
import { DaikCommand } from '../../command/DaikCommand.js';
import { DaikCommandRunArgs, DaikCommandResult, DaikCommandProps } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { DaikPlugin } from '../DaikPlugin.js';

export interface DaikAutoDeferCommandProps extends DaikCommandProps {
	ephemeral: boolean;
}

export class DaikAutoDeferPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikAutoDeferCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = ['preCommand'];

	public async preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA): Promise<RA> {
		if (interaction.isRepliable()) {
			await interaction.deferReply({
				ephemeral: command.props.ephemeral,
			});
		}

		return args;
	}
}