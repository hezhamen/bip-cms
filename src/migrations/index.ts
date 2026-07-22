import * as migration_20260722_222139_initial from './20260722_222139_initial';
import * as migration_20260723_translations_json from './20260723_translations_json';

export const migrations = [
  {
    up: migration_20260722_222139_initial.up,
    down: migration_20260722_222139_initial.down,
    name: '20260722_222139_initial',
  },
  {
    up: migration_20260723_translations_json.up,
    down: migration_20260723_translations_json.down,
    name: '20260723_translations_json',
  },
];
