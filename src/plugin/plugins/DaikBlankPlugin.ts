import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from '../../typings/daik_command.js';
import { DaikPluginModule } from '../../typings/daik_plugin.js';
import { DaikPlugin } from '../DaikPlugin.js';

export class DaikBlankPlugin<RA extends DaikCommandRunArgs, R extends DaikCommandResult, P extends DaikCommandProps> extends DaikPlugin<RA, R, P> {
	protected registrableModules: DaikPluginModule[] = [];
}