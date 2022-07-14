import { Interaction } from 'discord.js';
import { DaikCommand } from '../../index.js';
import { DaikCommandRunArgs, DaikCommandResult, DaikCommandProps } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { DaikPlugin } from '../DaikPlugin.js';

export class DaikErrorLogPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = ['onError'];

	public onError(command: DaikCommand<RA, R, P>, interaction: Interaction, error: unknown): void {
		console.error(error);
	}
}