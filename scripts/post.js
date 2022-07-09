import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import { config } from 'dotenv';
import { DaikClient } from '../build/client/DaikClient.js';
import { DaikBlankPlugin } from '../build/plugin/plugins/DaikBlankPlugin.js';
config();

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

const client = new DaikClient({
	intents: ['GUILD_MEMBERS'],
	createDefaultArgs() {
		return {
			allowedToRun: true,
			runAsAdmin: false,
			runAsDev: false,
		};
	},
});

client.registerPlugin(new DaikBlankPlugin());

await client.loadCommandDirectory('./build/commands');

console.log(client.getAllCommandData());

try {
	console.log('Started updating commands globally');

	await rest.put(
		Routes.applicationGuildCommands('995121013245349908', '990983082276438137'),
		{
			body: client.getAllCommandData(),
		},
	);

	console.log('Finished updating commands globally');
} catch (err) {
	console.warning('Failed to update commands globally');
}