import * as migration_20260705_023446_initial from './20260705_023446_initial';

export const migrations = [
  {
    up: migration_20260705_023446_initial.up,
    down: migration_20260705_023446_initial.down,
    name: '20260705_023446_initial'
  },
];
