import './App.css';
import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(4),
    minWidth: '31%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  json: {
    fontFamily: 'monospace',
  },
  jsonPaper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  }
}));

function getStyles(value, values, theme) {
  return {
    fontWeight:
      values.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect = ({values, selected, handler, label}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <FormControl className={classes.formControl} variant="filled">
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handler}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value} style={getStyles(value, values, theme)}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

function App() {

  const classes = useStyles();

  const availableRoles = ['Design', 'Tech', 'Business', 'Student'].sort()
  const availableCountries = ['Belgium', 'Denmark', 'Estonia', 'Finland', 'Germany', 'Sweden'].sort()
  const availableLocations = ['Leuven', 'Liège', 'Copenhagen', 'Tallinn', 'Helsinki', 'Lahti', 'Oulu', 'Tampere', 'Turku', 'Berlin', 'Munich', 'Gothenburg', 'Stockholm'].sort()

  const [json, setJson] = useState({
    lang: 'fi',
    role: [],
    country: [],
    location: [],
    image: '',
    intro: ''
  })

  const handleChange = (target) => (event) => {    
    setJson(oldJson => ({ ...oldJson, [target]: event.target.value}))
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container className={classes.root}>
        <Card className={classes.card} style={{ backgroundColor: '#efefef' }}>
            <CardContent>
              <Typography variant="h3" component="h1">
                Little Helper
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                It just makes JSON. Reactive.
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card} style={{ border: "none", boxShadow: "none", backgroundColor: 'inherit' }}>
            <CardContent>
              <FormControl fullWidth className={classes.formControl} component="fieldset">
                <FormLabel component="legend">Language</FormLabel>
                <RadioGroup aria-label="lang" name="lang1" value={json.lang} onChange={handleChange('lang')}>
                  <FormControlLabel value="fi" control={<Radio />} label="Finnish" />
                  <FormControlLabel value="en" control={<Radio />} label="English" />
                  <FormControlLabel value="sv" control={<Radio />} label="Swedish" />
                </RadioGroup>
              </FormControl>

              <MultiSelect values={availableRoles} selected={json.role} handler={handleChange('role')} label="Role"/>
              <MultiSelect values={availableCountries} selected={json.country} handler={handleChange('country')} label="Country"/>
              <MultiSelect values={availableLocations} selected={json.location} handler={handleChange('location')} label="Location"/>
          
              <FormControl className={classes.formControl} fullWidth component="fieldset">
                <TextField value={json.image} id="image" fullWidth label="Image URL" variant="outlined" onChange={handleChange('image')} />
              </FormControl>
              <FormControl className={classes.formControl} fullWidth component="fieldset">
                <TextField value={json.intro} id="intro" multiline rows={5} fullWidth label="Intro" variant="outlined" onChange={handleChange('intro')} />
              </FormControl>
            </CardContent>
          </Card>
            
          <Paper className={classes.jsonPaper}  elevation={10}>
            <Typography className={classes.json} variant="body1" component="pre">
              { JSON.stringify(json, null, 2) }
            </Typography>
          </Paper>
      
        </Container>

    </React.Fragment>
  );
}

export default App;
