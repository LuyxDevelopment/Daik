import { ClientOptions } from 'discord.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from './daik_command.js';

export interface DaikClientOptions<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends ClientOptions {
	createDefaultArgs(): RA;
}