import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs, DaikUserCommandOptions, DaikUserCommandRunFunc } from '../typings/daik_command.js';
import { DaikCommand } from './DaikCommand.js';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { ContextMenuCommandBuilder } from '@discordjs/builders';

export class DaikUserCommand<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikCommand<RA, R, P> {
	public readonly run: DaikUserCommandRunFunc<RA, R, P>;

	constructor(options: Omit<DaikUserCommandOptions<RA, R, P>, 'data'>) {
		super({
			...options,
			data: new ContextMenuCommandBuilder().setName(options.name).setType(ApplicationCommandType.User).toJSON(),
		});

		this.run = options.run.bind(this);
	}
}