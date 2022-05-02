
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CopyRight from '../dashboard/CopyRight'



const StickyFooter = () => {
    return (
        <Box sx={
            {
                display: "flex",
                flexDirection: "column"
            }
        }>

            <Box
                component="footer"
                sx={{
                    px: 2,
                    py: 3,
                    mt: 'auto',
                    background: (tema) => tema.palette.mode === 'light' ? tema.palette.grey[200] : tema.palette.grey[800]
                }}

            >
                <Container maxWidth="sm">
                    <CopyRight
                        sx={{
                            pt: 4
                        }}
                    />
                </Container>
            </Box>

        </Box>

    )
}

export default StickyFooter