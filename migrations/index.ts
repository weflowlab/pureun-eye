import * as migration_20261104_050338_init from './20261104_050338_init';
import * as migration_20261104_051822_media_objectkey from './20261104_051822_media_objectkey';

export const migrations = [
  {
    up: migration_20261104_050338_init.up,
    down: migration_20261104_050338_init.down,
    name: '20261104_050338_init',
  },
  {
    up: migration_20261104_051822_media_objectkey.up,
    down: migration_20261104_051822_media_objectkey.down,
    name: '20261104_051822_media_objectkey'
  },
];
