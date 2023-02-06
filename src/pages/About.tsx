// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import dynamic from "next/dynamic";




const Login = dynamic(() => import("./TestLogin"), {
    ssr: false,
  });

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderRight: ``
    }
  }))


   // ** logo
   const Img = styled('img')(({ }) => ({
  
}))

const About = () => {
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h3' sx={{ marginBottom: 3.5 }}>
             TinyTales
            </Typography>
            <Typography variant='h6'>
            A kid safe learning platform
            </Typography>
            <Typography variant='body1'>
            platform leverages Filecoin Ecosystem
            </Typography>
           
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
           
            <Typography variant='body2'>
            TinyTales represents a new and innovative approach to kids safe content, leveraging the latest in blockchain technology to provide a secure and trustworthy environment for children to learn, grow, and connect with others.
            TinyTales provides a safe and secure environment for children to explore and learn, free from exposure to harmful or inappropriate content.
            </Typography>
          
              <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <Login/>
                  </Box>
                </StyledBox>
              </Grid>
              
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent

          >
            <Box>
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingButtom:'4' }}>
              <Img  alt='TT Logo' src='/images/misc/zappic1.png' />
              </Box>
             
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default About
