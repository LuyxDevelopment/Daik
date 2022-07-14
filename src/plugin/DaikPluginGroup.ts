import { Interaction, CacheType } from 'discord.js';
import { DaikClient } from '../client/DaikClient.js';
import { DaikCommand } from '../command/DaikCommand.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../typings/daik_command.js';
import { DaikPluginModule } from '../typings/daik_plugin.js';
import { DaikPlugin } from './DaikPlugin.js';

export class DaikPluginGroup<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikPlugin<RA, R, P> {
	protected readonly registrableModules: DaikPluginModule[] = [];
	private readonly registeredModules: { [K in DaikPluginModule]: DaikPlugin<RA, R, P>[K][] };

	constructor(client: DaikClient<RA, R, P>) {
		super(client);

		this.registeredModules = {
			postCommand: [],
			postPluginRegister: [],
			preCommand: [],
			preCommandRegister: [],
			onError: [],
		};
	}

	public registerPlugin(plugin: DaikPlugin<RA, R, P>): void {
		for (const module of plugin.getRegistrableModules()) {
			this.registeredModules[module].push(plugin[module].bind(plugin) as never /* cast to never to avoid incorrect ts error */);

			if (!this.registrableModules.includes(module))
				this.registrableModules.push(module);
		}
	}

	public async preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA): Promise<RA> {
		for (const preCommand of this.registeredModules.preCommand)
			args = await preCommand(command, interaction, args);

		return args;
	}

	public async postCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA, result: R): Promise<R> {
		for (const postCommand of this.registeredModules.postCommand)
			result = await postCommand(command, interaction, args, result);

		return result;
	}

	public async preCommandRegister(command: DaikCommand<RA, R, P>): Promise<DaikCommand<RA, R, P>> {
		for (const preCommandRegister of this.registeredModules.preCommandRegister)
			command = await preCommandRegister(command);

		return command;
	}

	public async postPluginRegister(): Promise<void> {
		for (const postPluginRegister of this.registeredModules.postPluginRegister)
			await postPluginRegister();
	}

	public async onError(command: DaikCommand<RA, R, P>, interaction: Interaction, error: unknown): Promise<void> {
		for (const onError of this.registeredModules.onError)
			await onError(command, interaction, error);
	}
}