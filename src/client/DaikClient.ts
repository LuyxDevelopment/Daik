import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9.js';
import { Client, Interaction } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { DaikCommand } from '../command/DaikCommand.js';
import { DaikPlugin } from '../plugin/DaikPlugin.js';
import { DaikClientOptions } from '../typings/daik_client.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs, DaikCommandRunFunc } from '../typings/daik_command.js';

export class DaikClient<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends Client {
	private readonly commands: Map<string, DaikCommand<RA, R, P>> = new Map();
	private readonly createDefaultRunArgs: () => RA;
	private plugin?: DaikPlugin<RA, R, P>;

	constructor(options: DaikClientOptions<RA, R, P>) {
		super(options);

		this.createDefaultRunArgs = options.createDefaultArgs;
	}

	public registerPlugin(plugin: DaikPlugin<RA, R, P>): void {
		this.plugin = plugin;
	}

	public init(): void {
		this.checkPluginRegistered();

		this.on('interactionCreate', (interaction) => {
			if (!interaction.isCommand() && !interaction.isUserContextMenu()) return;

			const commandName = interaction.commandName;

			this.runCommand(commandName, interaction);
		});
	}

	public registerCommands(commands: DaikCommand<RA, R, P>[] | DaikCommand<RA, R, P>): void {
		this.checkPluginRegistered();

		if (!Array.isArray(commands)) commands = [commands];

		for (let command of commands) {
			command = this.plugin!.preCommandRegister(command);

			this.commands.set(command.name, command);
		}
	}

	public async loadCommandDirectory(directory: string): Promise<void> {
		const files = this.getFilesFromDirectory(directory);

		for (const file of files) {
			const command = (await import('../../' + file)).default;

			this.registerCommands(command);
		}
	}

	public getAllCommandData(): RESTPostAPIApplicationCommandsJSONBody[] {
		const commands = [];

		for (const command of this.commands.values())
			commands.push(command.data);

		return commands;
	}

	private async runCommand(commandName: string, interaction: Interaction): Promise<R | void> {
		const command = this.commands.get(commandName);
		if (!command) return;

		try {
			let args = this.createDefaultRunArgs();
			args = this.plugin!.preCommand(command, interaction, args);

			let result = await (command as unknown as DaikCommand<RA, R, P> & { run: DaikCommandRunFunc<RA, R, P, DaikCommand<RA, R, P>, Interaction> }).run(interaction, this, args);
			result = this.plugin!.postCommand(command, interaction, args, result);

			return result;
		} catch (err) {
			this.plugin!.onError(err);
		}
	}

	private getFilesFromDirectory(directory: string): string[] {
		const files = readdirSync(directory, { withFileTypes: true });
		const filePaths = [];

		for (const file of files) {
			if (file.isFile() && file.name.endsWith('.js')) filePaths.push(path.join(directory, file.name));
			else if (file.isDirectory()) filePaths.push(...this.getFilesFromDirectory(path.join(directory, file.name)));
		}

		return filePaths;
	}

	private checkPluginRegistered(): void {
		if (!this.plugin) throw new Error('[NO_PLUGIN]: No plugin has been registered. Daik requires a plugin to be registered, if you don\'t want to use a plugin, create an empty plugin.');
	}
}