import { config } from 'dotenv';
import { DaikClient } from './client/DaikClient.js';
import { DaikBlankPlugin } from './plugin/plugins/DaikBlankPlugin.js';
import { DaikCommandProps, DaikCommandResult, DaikCommandRunArgs } from './typings/daik_command.js';

config();

const client = new DaikClient<DaikCommandRunArgs, DaikCommandResult, DaikCommandProps>({
	intents: ['GUILD_MEMBERS'],
	createDefaultArgs(): DaikCommandRunArgs {
		return {
			allowedToRun: true,
			runAsAdmin: false,
			runAsDev: false,
		};
	},
});

client.registerPlugin(new DaikBlankPlugin(client));

client.loadCommandDirectory('./build/commands');

client.login(process.env.DISCORD_TOKEN);

client.init();
