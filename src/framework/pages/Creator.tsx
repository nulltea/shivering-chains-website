import { Box, Grid } from "@mui/material";
import MintTxForm from "../components/nft/MintTxForm";
import NFTCard from "../components/nft/NftCard";

export default function CreatorPage(params: any) {
    return (
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-around' }}>
            <MintTxForm />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 1, maxWidth: 800}}>
                <Grid item xs={6}>
                    <NFTCard name="cool" hash="0800fc577294c34e0b28ad2839435945" price={200.0} contentUri=""/>
                </Grid>
            </Grid>
        </Box>
    )
}