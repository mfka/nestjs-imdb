import { getConnection } from 'typeorm';

export const resetDatabase = () => {
  return getConnection().synchronize(true);
};
