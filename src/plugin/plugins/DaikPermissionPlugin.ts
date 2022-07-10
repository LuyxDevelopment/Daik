import { Interaction, CacheType, PermissionString } from 'discord.js';
import { DaikCommand } from '../../command/DaikCommand.js';
import { DaikCommandRunArgs, DaikCommandResult, DaikCommandProps } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { Async } from '../../typings/util.js';
import { DaikPlugin } from '../DaikPlugin.js';

export interface DaikPermissionPluginCommandRunArgs extends DaikCommandRunArgs {
	hasPermission: boolean;
	missingPermissions: PermissionString[];
}

export interface DaikPermissionPluginCommandProps extends DaikCommandProps {
	permissions: PermissionString[];
}

export class DaikPermissionPlugin<RA extends DaikPermissionPluginCommandRunArgs, R extends DaikCommandResult, P extends DaikPermissionPluginCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = ['preCommand'];

	public preCommand(command: DaikCommand<RA, R, P>, interaction: Interaction<CacheType>, args: RA): Async<RA> {
		if (command.props.permissions.length === 0) {
			args.hasPermission = true;
		} else if (!interaction.inCachedGuild()) {
			args.hasPermission = false;
			args.allowedToRun = false;
		} else {
			args.hasPermission = true;

			for (const permission of command.props.permissions) {
				if (!interaction.memberPermissions.has(permission)) {
					args.hasPermission = false;
					args.missingPermissions.push(permission);
					args.allowedToRun = false;
				}
			}
		}

		return args;
	}
}