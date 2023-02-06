// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports

import AccountConvert from 'mdi-material-ui/AccountConvert'

const Feature3 = () => {
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
          <AccountConvert sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
        Age-appropriate content:
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
        The platform curates and approves content to ensure that it is age-appropriate and suitable for children, providing parents with peace of mind.
        </Typography>
        <Button variant='outlined' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

export default Feature3
