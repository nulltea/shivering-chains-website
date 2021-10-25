import { create } from 'ipfs-http-client';

export const client = create({
  url: 'http://localhost:5001/api/v0'
});
