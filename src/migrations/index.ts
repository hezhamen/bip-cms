import * as migration_20260722_222139_initial from './20260722_222139_initial';

export const migrations = [
  {
    up: migration_20260722_222139_initial.up,
    down: migration_20260722_222139_initial.down,
    name: '20260722_222139_initial'
  },
];
