# Daik
discord.js command handler library

Docs might be added later, but for now, here's a quick start:

###### index.ts
```ts
import { DaikClient, DaikPermissionPlugin, DaikPermissionPluginCommandRunArgs, DaikPermissionPluginCommandProps, DaikCommandResult } from 'daik';

/*
Create a new client. The generic arguments provide an easy way to add extra functionality to Daik without the need to extend all the classes.
The first generic argument the type of an args object passed to the command run function. This can be used to specify .
The second generic argument is the return type of the command run function. this can be used to generate metrics are to report errors that occur during command execution to the user.
The third generic argument the type of any additional props on commands. This can be used in conjunction with plugins to add extra functionality to commands.
*/
const client = new DaikClient<DaikPermissionPluginCommandRunArgs, DaikCommandResult, DaikPermissionPluginCommandProps>({
	createDefaultArgs(): DaikPermissionPluginCommandRunArgs {
		return {
			isAllowedToRun: true,
			missingPermissions: [], 
		};
	}
});

client.registerPlugin(new DaikPermissionPlugin());

