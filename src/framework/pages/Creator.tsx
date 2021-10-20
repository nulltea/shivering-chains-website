import { Box, Grid } from "@mui/material";
import { MintTxForm, NftGridView } from "../components/nft";

export default function CreatorPage(props: any) {
    console.log(props.accountPair)
    return (
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'space-around' }}>
            <MintTxForm />
            <NftGridView accountPair={props.accountPair}/>
        </Box>
    )
}