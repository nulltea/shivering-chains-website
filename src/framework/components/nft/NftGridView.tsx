import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSubstrate } from '../../../infrastructure/substrate';
import NFTCard from './NftCard';
import { AssetNFT } from './AssetNFT';

export default function NFTsGrid (props: any) {
  const { api } = useSubstrate();
  const [assets, setAssets] = useState<AssetNFT[]>([]);

  useEffect(() => {
    let unsubscribe: Function;
    api.query.nft.assetsByAccount(props.accountPair.address, (assets: AssetNFT[]) => {
      setAssets(assets || []);
    }).then((unsub: Function) => {
      unsubscribe = unsub;
    });

    return () => unsubscribe && unsubscribe();
  }, [api.query.nft, props.accountPair.address]);

  return <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ m: 1, maxWidth: 800 }}>
    <Grid item xs={6}>
      {assets.map((asset) => {
        return <NFTCard name={asset.name} hash={asset.hash} initialPrice={asset.initialPrice}
                        contentUri={asset.contentUri}/>;
      })}
    </Grid>
  </Grid>;
}
