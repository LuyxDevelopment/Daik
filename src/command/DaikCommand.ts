import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9.js';
import { PermissionString } from 'discord.js';
import { DaikCommandOptions, DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../typings/daik_command.js';

export class DaikCommand<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> {
	public readonly name: string;
	public readonly permissions: PermissionString[];
	public readonly props: P;
	public readonly data: RESTPostAPIApplicationCommandsJSONBody;

	constructor(options: DaikCommandOptions<RA, R, P>) {
		this.name = options.name;
		this.permissions = options.permissions;
		this.props = options.props;
		this.data = options.data;
	}
}