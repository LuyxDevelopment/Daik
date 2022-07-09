import { DaikPlugin } from '../plugin/DaikPlugin.js';

export type DaikPluginModule = Exclude<keyof DaikPlugin<never, never, never>, 'registrableModules' | 'getRegistrableModules'>;