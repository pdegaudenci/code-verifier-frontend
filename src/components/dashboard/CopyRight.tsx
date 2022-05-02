import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'


const CopyRight = (props: any) => {
    return (
        <Typography variant='body2' color="text.secondary" align="center" {...props}>

            {'Copyright '}
            <Link color="inherit" href="https://github.com/pdegaudenci/code-verifier-frontend.git">
                pdegaudenci Repo
            </Link>
            {new Date().getFullYear()}
        </Typography>


    )
}

export default CopyRight