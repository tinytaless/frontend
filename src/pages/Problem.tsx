// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

   // ** logo
   const Img = styled('img')(({ }) => ({
  
}))


const Problem = () => {
  return (
    <Card>
      <Grid container spacing={6}>
      <Grid
          item
          sm={5}
          xs={12}
          sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingRight: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent

          >
            <Box>
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingButtom:'4' }}>
              <Img  alt='TT Logo' src='/images/misc/pic2 copy.png' />
              </Box>
             
            </Box>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>

            
           
           
        
            <Typography variant='body2'>
            
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Typography variant='h6'>
            Problem
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Typography variant='body2'>
            <Typography variant = 'subtitle1'>Inappropriate content:</Typography> With the increasing availability of online content, there is a growing concern about children being exposed to harmful or inappropriate material, such as violence, hate speech, or adult content.<br /><br /><Typography variant = 'subtitle1'>Data privacy:</Typography> There are also growing concerns about the privacy and security of children's personal information and data when they engage with online content.<br /><br /><Typography variant = 'subtitle1'>Parental control:</Typography> Many parents struggle to monitor and control their children's online activities, leading to worries about their exposure to inappropriate content and privacy concerns.<br /><br /><Typography variant = 'subtitle1'>Lack of educational content:</Typography> While there is plenty of entertainment content available online, there is often a lack of educational content that is both engaging and safe for children.<br /><br /><Typography variant = 'subtitle1'>Need for trust:</Typography> With increasing concerns about the authenticity and origin of online content, there is a growing need for platforms that can provide a secure and trustworthy environment for children.
            </Typography>
        
            
    
            
          </CardContent>
        </Grid>
        
      </Grid>
    </Card>
  )
}

export default Problem
