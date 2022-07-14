import { Interaction, CacheType, Snowflake } from 'discord.js';
import { DaikClient } from '../../client/DaikClient.js';
import { DaikCommand } from '../../command/DaikCommand.js';
import { DaikCommandRunArgs, DaikCommandResult, DaikCommandProps } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { Async } from '../../typings/util.js';
import { DaikPlugin } from '../DaikPlugin.js';

export class DaikRunAsDevPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = ['preCommand'];
	private readonly devs: Set<Snowflake>;

	constructor(client: DaikClient<RA, R, P>, devs: Snowflake[]) {
		super(client);

		this.devs = new Set(devs);
	}

	public preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA): Async<RA> {
		if (this.devs.has(interaction.user.id)) args.runAsDev = true;

		return args;
	}
}