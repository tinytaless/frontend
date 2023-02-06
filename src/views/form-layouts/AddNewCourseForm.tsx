// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import { useStore } from 'src/services/store'
import { storeWithProgress, makeFileObject, makeFileUrl } from '../../services/web3StorageUtils';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddNewCourseForm: React.FC<IProps> = ({ open, onClose, onAdd }) => {
  const {
    state: { contract },
  } = useStore();


  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [bounty, setBounty] = useState(0);
  const [qJsonFile, setQJsonFile] = useState("");
  const [qJsonFilename, setQJsonFilename] = useState("");

  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const qJson = event.target.files[0];
    setQJsonFilename(qJson.name)
    var reader = new FileReader();
    reader.readAsText(qJson);

    reader.onload = function () {
      setQJsonFile(reader.result as string);
    };

    reader.onerror = function (error) {
      console.log('Error reading JSON file: ', error);
    };
  };
  
  function youtube_parser(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      console.log("Error occurred while parsing");
    }
  } 
  
  const createNewCourse = async (name, desc, url, bounty) => {
    try {
      console.log("comes here: " + name +","+ desc +","+ url +","+ bounty)
      let extractedUrl = youtube_parser(url);
      console.log("extractedUrl: " + extractedUrl)
      const fileObj = makeFileObject(qJsonFile, qJsonFilename);
      const cid = await storeWithProgress([fileObj], false);
      console.log("cid: " + cid)
      const qJsonFileURL = makeFileUrl(cid, qJsonFilename);
      console.log("qJsonFileURL: " + qJsonFileURL)
      await contract.createCourse(name, desc, url, bounty, cid, qJsonFileURL);
      onAdd();
    } catch (error) {
      console.log("Error creating course: " + error)
    } finally {
      console.log("Im in finally: ")
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
                  <TextField fullWidth label='Description' onChange={(value) => setDesc(value.currentTarget.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='URL' onChange={(value) => setUrl(value.currentTarget.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Bounty' onChange={(value) => setBounty(parseInt(value.currentTarget.value, 0))} />
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
                    <Button variant='contained' size='large' onClick={handleClick}>
                      Upload Questionnarie
                    </Button>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      onChange={handleChange}
                      style={{display: 'none'}}
                    />
                    <Button variant='contained' size='large' 
                    onClick={() => createNewCourse(name, desc, url, bounty)} 
                    disabled={!name || !url || !bounty}>
                      Submit
                    </Button>
                    <Button variant='contained' size='large' onClick={onClose} >
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

export default AddNewCourseForm
