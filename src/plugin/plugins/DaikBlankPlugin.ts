import { Interaction, CacheType } from 'discord.js';
import { DaikCommand } from '../../command/DaikCommand.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { DaikPlugin } from '../DaikPlugin.js';

export class DaikBlankPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = [];

	public preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA): RA {
		return args;
	}

	public postCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA, result: R): R {
		return result;
	}

	public preCommandRegister(command: DaikCommand<RA, R, P>): DaikCommand<RA, R, P> {
		return command;
	}

	public postPluginRegister(): void { }


	public onError(error: unknown): void { } // eslint-disable-line @typescript-eslint/no-unused-vars
}