import { Interaction } from 'discord.js';
import { DaikClient } from '../client/DaikClient.js';
import { DaikCommand } from '../command/DaikCommand.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../typings/daik_command.js';
import { DaikPluginModule } from '../typings/daik_plugin.js';
import { Async } from '../typings/util.js';

export abstract class DaikPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> {
	protected abstract readonly registrableModules: DaikPluginModule[];
	protected readonly client: DaikClient<RA, R, P>;

	constructor(client: DaikClient<RA, R, P>) {
		this.client = client;
	}

	public getRegistrableModules(): readonly DaikPluginModule[] {
		return this.registrableModules;
	}

	public preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction, args: RA): Async<RA> {
		return args;
	}

	public postCommand(command: DaikCommand<RA, R, P>, interaction: Interaction, args: RA, result: R): Async<R> {
		return result;
	}

	public preCommandRegister(command: DaikCommand<RA, R, P>): Async<DaikCommand<RA, R, P>> {
		return command;
	}

	public postPluginRegister(): Async<void> {

	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onError(error: unknown): Async<void> {

	}
}