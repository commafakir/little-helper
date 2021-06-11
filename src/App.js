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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '30%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    <FormControl className={classes.formControl} component="fieldset">
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

  const availableRoles = ['Design', 'Tech', 'Business', 'Student']
  const availableCountries = ['Belgium', 'Denmark', 'Estonia', 'Finland', 'Germany', 'Sweden']
  const availableLocations = ['Leuven', 'Liège', 'Copenhagen', 'Tallinn', 'Helsinki', 'Lahti', 'Oulu', 'Tampere', 'Turku', 'Berlin', 'Munich', 'Gothenburg', 'Stockholm']

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
      <div className={classes.root}>
        <Container>
          <Typography variant="heading1" component="h1">
            Little Helper
          </Typography>
          <Typography variant="body1" component="p">
            It just makes JSON.
          </Typography>
          <Card className={classes.root}>
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
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <FormControl className={classes.formControl} fullWidth component="fieldset">
              <TextField value={json.image} id="image" fullWidth label="Image URL" variant="outlined" onChange={handleChange('image')} />
              </FormControl>
              <FormControl className={classes.formControl} fullWidth component="fieldset">
                <TextField value={json.intro} id="intro" multiline rows={5} fullWidth label="Intro" variant="outlined" onChange={handleChange('intro')} />
              </FormControl>
            </CardContent>
          </Card>
      
            
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="body2" component="pre">
                { JSON.stringify(json, null, 2) }
              </Typography>
            </CardContent>
          </Card>
      
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
