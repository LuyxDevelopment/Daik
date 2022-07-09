import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9.js';
import { Awaitable, CommandInteraction, Interaction, PermissionString, UserContextMenuInteraction } from 'discord.js';
import { DaikClient } from '../client/DaikClient.js';
import { DaikCommand } from '../command/DaikCommand.js';
import { DaikSlashCommand } from '../command/DaikSlashCommand.js';
import { DaikUserCommand } from '../command/DaikUserCommand.js';

export interface DaikCommandRunArgs {
	allowedToRun: boolean;
	runAsDev: boolean;
	runAsAdmin: boolean;
}

export interface DaikCommandResult {
	success: boolean;
}

export interface DaikCommandProps {
	[key: string]: unknown;
}

export interface DaikCommandOptions<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> {
	name: string;
	permissions: PermissionString[];
	props: P;
	data: RESTPostAPIApplicationCommandsJSONBody;
}

export type DaikCommandRunFunc<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps, C extends DaikCommand<RA, R, P>, I extends Interaction> = (this: C, interaction: I, client: DaikClient<RA, R, P>, args: RA) => Awaitable<R>;

export interface DaikRunnableCommandOptions<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps, C extends DaikCommand<RA, R, P>, I extends Interaction> extends DaikCommandOptions<RA, R, P> {
	run: DaikCommandRunFunc<RA, R, P, C, I>;
}

// Slash

export type DaikSlashCommandRunFunc<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> = DaikCommandRunFunc<RA, R, P, DaikSlashCommand<RA, R, P>, CommandInteraction>;

export type DaikSlashCommandOptions<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> = DaikRunnableCommandOptions<RA, R, P, DaikSlashCommand<RA, R, P>, CommandInteraction>;

// User

export type DaikUserCommandRunFunc<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> = DaikCommandRunFunc<RA, R, P, DaikUserCommand<RA, R, P>, UserContextMenuInteraction>;

export type DaikUserCommandOptions<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> = DaikRunnableCommandOptions<RA, R, P, DaikUserCommand<RA, R, P>, UserContextMenuInteraction>;

