import * as migration_20260705_023446_initial from './20260705_023446_initial';
import * as migration_20260705_024404_media_plugins from './20260705_024404_media_plugins';
import * as migration_20260705_033500_p14_collections from './20260705_033500_p14_collections';
import * as migration_20260705_042418_p14_globals_shell from './20260705_042418_p14_globals_shell';
import * as migration_20260705_044720_p14_globals_about_testimonios from './20260705_044720_p14_globals_about_testimonios';
import * as migration_20260705_045406_p14_global_reto from './20260705_045406_p14_global_reto';
import * as migration_20260705_050208_p14_global_home from './20260705_050208_p14_global_home';

export const migrations = [
  {
    up: migration_20260705_023446_initial.up,
    down: migration_20260705_023446_initial.down,
    name: '20260705_023446_initial',
  },
  {
    up: migration_20260705_024404_media_plugins.up,
    down: migration_20260705_024404_media_plugins.down,
    name: '20260705_024404_media_plugins',
  },
  {
    up: migration_20260705_033500_p14_collections.up,
    down: migration_20260705_033500_p14_collections.down,
    name: '20260705_033500_p14_collections',
  },
  {
    up: migration_20260705_042418_p14_globals_shell.up,
    down: migration_20260705_042418_p14_globals_shell.down,
    name: '20260705_042418_p14_globals_shell',
  },
  {
    up: migration_20260705_044720_p14_globals_about_testimonios.up,
    down: migration_20260705_044720_p14_globals_about_testimonios.down,
    name: '20260705_044720_p14_globals_about_testimonios',
  },
  {
    up: migration_20260705_045406_p14_global_reto.up,
    down: migration_20260705_045406_p14_global_reto.down,
    name: '20260705_045406_p14_global_reto',
  },
  {
    up: migration_20260705_050208_p14_global_home.up,
    down: migration_20260705_050208_p14_global_home.down,
    name: '20260705_050208_p14_global_home'
  },
];
