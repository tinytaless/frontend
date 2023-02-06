// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useRouter } from 'next/router'
import PlyrComponent from './videoPlayer'
  
const DisplayCourse = () => {
  const router = useRouter();

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <Typography variant='h5'>{router.query.courseName}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 5 }}>
          <Divider
              textAlign='left'
              sx={{
              m: 0,
              width: '100%',
              lineHeight: 'normal',
              textTransform: 'uppercase',
              '&:before, &:after': { top: 7, transform: 'none' },
              '& .MuiDivider-wrapper': { px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px' }
              }}
            />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <PlyrComponent url={router.query.courseURL as string} />
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 10, paddingBottom: 10, textAlign:'center' }}>
          <Button variant='contained' onClick={() => router.push({
                  pathname: '/assessment',
                  query: { courseID: router.query.courseID, 
                            courseBounty: router.query.courseBounty}}, '/assessment')}>
            Start Assessment
          </Button>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default DisplayCourse
