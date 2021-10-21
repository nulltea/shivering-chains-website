import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSubstrate } from '../../../infrastructure/substrate';
import NFTCard from './NftCard';
import { AssetNFT } from './AssetNFT';

type AssetHashPair = [hash: any, asset: {
  name: any,
  contentUri: any,
  initialPrice: any,
}];

export default function NFTsGrid (props: any) {
  const { api } = useSubstrate();
  const [assets, setAssets] = useState<AssetNFT[]>([]);

  useEffect(() => {
    let unsubscribe: Function;
    (async () => {
      unsubscribe = await api.query.nft.assetsByAccount(props.accountPair.address, (pairs: AssetHashPair[]) => {
        setAssets(pairs.map(([hash, asset]: AssetHashPair): AssetNFT => ({
          hash: hash.toString(),
          name: asset.name.toHuman(),
          contentUri: asset.contentUri.toHuman(),
          initialPrice: asset.initialPrice.toHuman()
        })) || []);
      });
    })();

    return () => unsubscribe && unsubscribe();
  }, [api.query.nft, props.accountPair.address]);

  console.log(assets);

  return <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ m: 1, maxWidth: 800 }}>
    {assets.map((asset) => {
      return <Grid item xs={6} key={asset.hash}>
        <NFTCard name={asset.name} hash={asset.hash}
                 initialPrice={asset.initialPrice}
                 contentUri={asset.contentUri}/>
      </Grid>;
    })}
  </Grid>;
}
