import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import { DaikCommandOptions, DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../typings/daik_command.js';

export class DaikCommand<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> {
	public readonly name: string;
	public readonly props: P;
	public readonly data: RESTPostAPIApplicationCommandsJSONBody;

	constructor(options: DaikCommandOptions<RA, R, P>) {
		this.name = options.name;
		this.props = options.props;
		this.data = options.data;
	}
}