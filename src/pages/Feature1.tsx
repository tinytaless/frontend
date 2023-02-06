// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


// ** Icons Imports


import AccountCash from 'mdi-material-ui/AccountCash'

const Feature1 = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <AccountCash sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
        Blockchain technology
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
        By leveraging blockchain technology, TinyTales provides a secure and transparent system for verifying the authenticity and origin of content, ensuring that children are only exposed to safe and approved content
        </Typography>
        <Button variant='outlined' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
        Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

export default Feature1
