import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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
