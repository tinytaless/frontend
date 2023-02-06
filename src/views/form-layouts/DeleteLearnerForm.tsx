// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStore } from 'src/services/store'

interface IProps {
  address: string
  open2: boolean;
  onClose: () => void;
}

const DeleteLearnerForm: React.FC<IProps> = ({address, open2, onClose}) => {
  const {
    state: { contract },
  } = useStore();

  const deleteEmployee = async (address) => {
    try {
      await contract.deleteEmployee(address);
    } catch (error) {
        console.log("Error deleting learner: " + error)
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open2} onClose={onClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
            <Card>
              <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                  <Grid container spacing={5}>
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
                        <Button type='submit' variant='contained' size='large' 
                          onClick={() => deleteEmployee(address)} >
                          Delete
                        </Button>
                        <Button type='submit' variant='contained' size='large' 
                          onClick={onClose} >
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

export default DeleteLearnerForm
