import * as migration_20261104_050338_init from './20261104_050338_init';

export const migrations = [
  {
    up: migration_20261104_050338_init.up,
    down: migration_20261104_050338_init.down,
    name: '20261104_050338_init'
  },
];
