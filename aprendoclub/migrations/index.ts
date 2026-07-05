import * as migration_20260705_023446_initial from './20260705_023446_initial';
import * as migration_20260705_024404_media_plugins from './20260705_024404_media_plugins';

export const migrations = [
  {
    up: migration_20260705_023446_initial.up,
    down: migration_20260705_023446_initial.down,
    name: '20260705_023446_initial',
  },
  {
    up: migration_20260705_024404_media_plugins.up,
    down: migration_20260705_024404_media_plugins.down,
    name: '20260705_024404_media_plugins'
  },
];
