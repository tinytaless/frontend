// ** MUI Imports
import Color from 'color';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import PlusCircle from 'mdi-material-ui/PlusCircle'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TrophyAward from 'mdi-material-ui/TrophyAward'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { useStore } from 'src/services/store'
import { ReactElement, useEffect, useState } from 'react'
import AddNewLearnerForm from 'src/views/form-layouts/AddNewLearnerForm'
import DeleteLearnerForm from 'src/views/form-layouts/DeleteLearnerForm'
import IconButton from '@mui/material/IconButton'
import { ThemeColor } from 'src/@core/layouts/types'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@mui/material/CardActionArea';

const MAX_FETCH_RETRIES = 60; // max retries to fetch from provider when expecting a change
const FETCH_RETRY_TIMEOUT = 1000; // timeout between fetches when expecting a change

const useStyles = makeStyles(() => ({
    actionArea: {
      transition: '0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    card: () => ({
      boxShadow: 'none',
      '&:hover': {
        boxShadow: `0 6px 12px 0 ${Color("#bfafb2")
          .rotate(-12)
          .darken(0.2)
          .fade(0.5)}`,
      },
    })
  }));

const SponsorLearner = () => {
    const {
        state: { contract },
    } = useStore();

    const [employees, setEmployees] = useState([]);
    const [topPerformers, setTopPerformers] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [address, setAddress] = useState("");

    const fetchEmployees = async (retry = false, retries = 0) => {
        const newEmployees = await contract.fetchEmployees();
        console.log("Fetch Employees Call....." + topPerformers);
        if (
          retry &&
          retries < MAX_FETCH_RETRIES &&
          employees.length === newEmployees.length
        ) {
          return setTimeout(
            () => fetchEmployees(true, retries + 1),
            FETCH_RETRY_TIMEOUT
          );
        }
        console.log("Init load");
        setEmployees(newEmployees);
      };

      const fetchTopPerformers = async () => {
        const newTopPerformers = await contract.getTopPerformers();
        setTopPerformers(newTopPerformers);
      };

    //To fetch employees onload
    useEffect(() => {
        if (!contract) {
          return;
        }
    
        fetchEmployees();
        fetchTopPerformers();
      }, [contract]);

      const handleClick = (address: string) => {
        setAddress(address)
        setOpen2(true)
      }

      interface DataType {
        color: ThemeColor
        icon: ReactElement
      }
      
      const awardIcon: DataType = 
        {
          color: "primary",
          icon: <TrophyAward sx={{ fontSize: '1.75rem' }}/>
        }

        const cardStyles = useStyles();

  return (
    <ApexChartWrapper>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Typography variant='h5'>Learners</Typography>
            </Grid>
            <Grid item xs={12} sx={{ paddingBottom: 2, paddingTop: 2 }}>
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
            {employees.map((learner, index) => ((learner[0] != 0) &&
            <Grid item xs={12} md={3}>
                <CardActionArea className={cardStyles.actionArea}>
                    <Card classes={cardStyles.card} sx={{ position: 'relative' }}>
                        <CardMedia sx={{ height: '6.375rem' }} image='/images/cards/background-user.png' />
                        <Avatar
                            alt={learner[1]}
                            src='/images/avatars/1.png'
                            sx={{
                            width: 50,
                            height: 50,
                            left: '1.313rem',
                            top: '5.28125rem',
                            position: 'absolute',
                            border: theme => `0.25rem solid ${theme.palette.common.white}`
                            }}
                        />
                        <CardContent>
                            <Box
                            sx={{
                                mt: 5.75,
                                mb: 8.75,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                            >
                                <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='h6'>{learner[1]}</Typography>
                                    <Typography variant='caption'>{learner[0].substring(0,5)+"..."+learner[0].substring((learner[0].length-4), learner[0].length)}</Typography>
                                </Box>
                                <IconButton size='small' aria-label='settings' className='card-more-options' 
                                    sx={{ color: 'text.secondary' }} onClick={() => handleClick(learner[0])} >
                                    <TrashCanOutline sx={{ fontSize: '3rem' }} />
                                </IconButton>
                            </Box>
                            <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontWeight: 350, marginBottom: 1 }}>
                                    <Box component='span' sx={{ fontWeight: 'bold' }}>
                                    </Box>
                                </Typography>
                                <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
                                    {topPerformers.find(performer=>performer[0] === learner[0]) ? (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                variant='rounded'
                                                sx={{
                                                    mr: 3,
                                                    width: 44,
                                                    height: 44,
                                                    boxShadow: 3,
                                                    color: 'common.white',
                                                    backgroundColor: `${awardIcon.color}.main`
                                                }}
                                                >
                                                {awardIcon.icon}
                                            </Avatar>
                                        </Box>
                                    ) : ''}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
            ))}
            <Grid item xs={12} md={3}>
                <CardActionArea className={cardStyles.actionArea}>
                    <Card classes={cardStyles.card}>
                    <CardContent
                        sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '18rem',
                        padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
                        }}
                    >
                            <Avatar
                                sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
                                >
                                <PlusCircle onClick={() => setOpen1(true)}/>
                            </Avatar>
                            <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
                                Add New Learner
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
            <AddNewLearnerForm open1={open1} onClose={() => setOpen1(false)} onAdd={() => fetchEmployees(true)} />         
        </Grid>
        <Grid item xs={12} md={3}>
            <DeleteLearnerForm address={address} open2={open2} onClose={() => setOpen2(false)} />         
        </Grid>
    </ApexChartWrapper>
  )
}

export default SponsorLearner
