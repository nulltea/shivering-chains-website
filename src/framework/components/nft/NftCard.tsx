import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AssetNFT } from './AssetNFT';

export default function NFTCard ({
  hash,
  name,
  contentUri,
  initialPrice
}: AssetNFT) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1A1D29' }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://ipfs.io/ipfs/${contentUri}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#04AFD3' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hash}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">Transfer</Button>
        <Button variant="contained" size="small" color="warning">Burn</Button>
      </CardActions>
    </Card>
  );
}
