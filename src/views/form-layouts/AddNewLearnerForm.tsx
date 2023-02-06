// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react'
import { useStore } from 'src/services/store'

interface IProps {
  open1: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddNewLearnerForm: React.FC<IProps> = ({ open1, onClose, onAdd }) => {
  const {
    state: { contract },
  } = useStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [withdraw, setWithdraw] = useState(false);

  const createNewEmployee = async (wallet, name) => {
    try {
      await contract.addEmployee(wallet, name);
      if (withdraw) {
        await contract.changeAccess(wallet);
      }
      onAdd();
    } catch (error) {
      console.log("Error creating new learner: " + error)
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open1} onClose={onClose}>
      <DialogTitle>Enroll</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='Name' onChange={(value) => setName(value.currentTarget.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Wallet Address' onChange={(value) => setAddress(value.currentTarget.value)} />
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
                    <FormGroup>
                      <FormControlLabel control={<Switch />} label="Allow USDC Withdrawal" value={withdraw} onChange={() => setWithdraw} />
                    </FormGroup>
                    <Button type='submit' variant='contained' size='large'
                      onClick={() => createNewEmployee(address, name)} disabled={!name || !address} >
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
  )
}

export default AddNewLearnerForm
