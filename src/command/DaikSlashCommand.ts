import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs, DaikSlashCommandOptions, DaikSlashCommandRunFunc } from '../typings/daik_command.js';
import { DaikCommand } from './DaikCommand.js';

export class DaikSlashCommand<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikCommand<RA, R, P> {
	public readonly run: DaikSlashCommandRunFunc<RA, R, P>;

	constructor(options: DaikSlashCommandOptions<RA, R, P>) {
		super({ ...options, name: options.data.name });

		this.run = options.run.bind(this);
	}
}