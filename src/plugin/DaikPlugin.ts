import { Interaction } from 'discord.js';
import { DaikClient } from '../client/DaikClient.js';
import { DaikCommand } from '../command/DaikCommand.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../typings/daik_command.js';
import { DaikPluginModule } from '../typings/daik_plugin.js';

export abstract class DaikPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> {
	protected abstract readonly registrableModules: DaikPluginModule[];
	protected readonly client: DaikClient<RA, R, P>;

	constructor(client: DaikClient<RA, R, P>) {
		this.client = client;
	}

	public getRegistrableModules(): readonly DaikPluginModule[] {
		return this.registrableModules;
	}

	public abstract preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction, args: RA): RA;

	public abstract postCommand(command: DaikCommand<RA, R, P>, interaction: Interaction, args: RA, result: R): R;

	public abstract preCommandRegister(command: DaikCommand<RA, R, P>): DaikCommand<RA, R, P>;

	public abstract postPluginRegister(): void;

	public abstract onError(error: unknown): void;
}