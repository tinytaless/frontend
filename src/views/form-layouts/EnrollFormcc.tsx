// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'src/services/store'

interface IProps {
    open: boolean;
    onClose: () => void;
  }

const EnrollFormcc: React.FC<IProps> = ({open, onClose}) => {
    const router = useRouter();

    const {
        state: { contract },
      } = useStore();
      
    const [name, setName] = useState("");
    const handleEmployerOnboard = async () => {
        console.log("Enroll contract: " + contract);
        await contract.createEmployer(name);
        onClose()
        router.push("/CCDashboard");
      };

  return (
   <>
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enroll Content Creator</DialogTitle>
        <DialogContent>
            <Card>
                <CardContent>
                    <form onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                        <TextField fullWidth label='Name' onChange={(value) => setName(value.currentTarget.value)} />
                        </Grid>
                        <Grid item xs={12}>
                        <Box
                            sx={{
                            gap: 5,
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                            }}
                        >
                            <Button type='submit' variant='contained' size='large' onClick={handleEmployerOnboard} disabled={!name}>
                                Submit
                            </Button>
                            <Button type='submit' variant='contained' size='large' onClick={onClose} >
                                Cancel
                            </Button>
                        </Box>
                        </Grid>
                    </Grid>
                    </form>
                </CardContent>
            </Card>
        </DialogContent>
    </Dialog>
   </>
  )
}

export default EnrollFormcc
