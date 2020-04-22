import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DropDown from "../../components/Form/dropdown";
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CheckboxApp from "../../components/Form/checkbox";
import Textbox from "../../components/Form/textbox";
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import { Chip } from '@material-ui/core';
import { request } from '../../api';
import { updateProfile } from '../../redux/auth/actions'

//CSS styling
const useStyles = makeStyles({

	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},

	box: {

		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		width: 500,
		background: 'rgba(208, 208, 208, 0.4)',
	},

	image: {
		position: "absolute",
		margin: 'auto',
		height: 'auto',
		top: '100px',
		right: '150px',
	},

	header: {

		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'Calibri',

	},
	pagebreak: {
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'row',
		display: 'flex',
		maxWidth: '1000px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
	},

	tabbed_content: {
		width: '100%'
	}
});

//Settings page

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (

		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const SettingsPage = props => {
  const { user } = props

  console.log(user)

	const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    profile: {
      first_name: user.first_name,
      last_name: user.last_name,
      skills: user.skills,
      bio: user.bio
    },
    resume: null,
    profileSubmitted: false,
    error: null
  });

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

  const TextBoxSize = 500;
  
  console.log(state)

  const updateField = (field, value) => {
    var newState = { ...state }
    newState.profile[field] = value
    setState(newState)
  }

  const convertToStr = arr => {
    var str = ""

    for(let i = 0; i < arr.length; i++)
      str += `${arr[i]}${i < arr.length - 1 ? ", " : ""}`

    return str
  }

  const keyDownSkills = e => {
    if(e.key === "Enter"){
      e.preventDefault()

      var skill = e.target.value, skills = state.profile.skills != "" ? state.profile.skills.split(", ") : []

      if(!skills.includes(skill)){
        skills.push(skill)
        setState({ ...state, profile: { ...state.profile, skills: convertToStr(skills) }})
      }

      e.target.value = null
    }
  }

  const deleteSkill = index => {
    var skills = state.profile.skills != "" ? state.profile.skills.split(", ") : []
    skills.splice(index, 1) 
    setState({ ...state, profile: { ...state.profile, skills: convertToStr(skills) }})
  }

  const submitProfileChanges = e => {
    setState({ ...state, profileSubmitted: false })

    var data = {}

    Object.keys(state.profile).forEach(element => {
      if(state.profile[element] != user[element])
        data[element] = state.profile[element]
    });

    console.log(data)

    if(data != {}) {
      request("/users/" + user.id + "/", data, "PATCH", true)
      .then(res => {
        setState({ ...state, profileSubmitted: true })
        props.dispatch(updateProfile(res.data))
      })
      .catch(err => {
        setState({ ...state, error: err })
      })
    }

    var fileData = new FormData()
    if(state.resume) {
      fileData.append("resume", state.resume)
    }

    if(state.resume) {
      request("/users/" + user.id + "/resume", fileData, "PUT", true, "multipart/form-data")
      .then(res => {
        setState({ ...state, profileSubmitted: true })
        console.log(res)
      })
      .catch(err => {
        setState({ ...state, error: err })
      })
    }
  }

  const setCurrentListing = listing => {
    setState({ ...state, currentListing: listing })
  }

  const skillsArr = state.profile.skills != "" ? state.profile.skills.split(", ") : []

	return (
		<Container>
			<h1 className={classes.header + " pt-2 mb-2"}><i>Settings</i></h1>
			<div className={classes.root + " mb-4"} style={{ borderRadius: "10px" }}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					className={classes.tabs}
				>
					<Tab label="General" {...a11yProps(0)} />
					<Tab label="Profile" {...a11yProps(1)} />
					<Tab label="Notifications" {...a11yProps(2)} />
					<Tab label="Privacy" {...a11yProps(3)} />
					{/*<Tab label="Language" {...a11yProps(4)} />*/}
				</Tabs>
				<TabPanel value={value} index={0} className={classes.tabbed_content}>
					<h3>General Settings</h3>
					<hr />
					<div className={classes.pagebreak} >
						<div>
							<br />
							<h4>Account Details</h4>
							<hr />
							<Button href="/" style={{ 'backgroundColor': 'rgb(200,200,200)' }}>Set Password</Button>
						</div>

						<div>
							<hr />
							<h4>Two-Factor Authentication</h4>
							<br />
							<Button href="/" style={{ 'backgroundColor': 'rgb(200,200,200)' }}>Enable Two-Factor Authentication</Button>
						</div>

					</div>

				</TabPanel>
				<TabPanel value={value} index={1} className={classes.tabbed_content}>
					<h3>Profile Settings</h3>
					<hr />
					<div>
						<br />
						<h4>About Me</h4>
					</div>
					<hr />
					<FormControl>
						<h4>Full Name</h4>
						<div style={{ 'justify-content': 'flex-start', display: 'inline-flex', 'flex-direction': 'row', }}>
							<Textbox
								label="First Name"
								variant="filled"
								backgroundColor='white'
                width={TextBoxSize / 2 - 10}
                handleChange={e => updateField("first_name", e.target.value )}
							/>
							<Textbox
								label="Last Name"
								variant="filled"
								backgroundColor='white'
                width={TextBoxSize / 2 - 10}
                handleChange={e => updateField("last_name", e.target.value )}
							/>
						</div>
					</FormControl>
					<div>
						<hr />
						<h4>Bio</h4>
						<Textbox
							label="Bio"
							variant="filled"
							backgroundColor='white'
							multiline="true"
              width={TextBoxSize}
              handleChange={e => updateField("bio", e.target.value)}
						/>
						<hr />
						<Textbox
							label="Skills"
							variant="filled"
							backgroundColor='white'
              width={TextBoxSize}
              onKeyDown={keyDownSkills}
						/>
            {skillsArr.length > 0 ? skillsArr.map((skill, i) => (
              <Chip
                label={skill}
                onDelete={() => deleteSkill(i)}
                className="mr-1"
              />
            )) : null}
					</div>

					<div>
						<hr />
						<h4>Resume</h4>
						<br />
            <div style={{ width: '100%', whiteSpace: "nowrap" }}>
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  onChange={e => setState({ ...state, resume: e.target.files[0] })}
                />
              </Button>
              {state.resume ?
                <p className="ml-3 d-inline" style={{ width:"auto" }}>{state.resume.name}</p>
              : null}
            </div>
					</div>

					<hr />
					<Button variant="contained" color="primary" onClick={submitProfileChanges}>
						Save
					</Button>
          {state.profileSubmitted ?
            <p className="ml-3 d-inline" style={{ width:"auto", color: 'green' }}>Saved!</p>
          : null}
				</TabPanel>
				<TabPanel value={value} index={2} className={classes.tabbed_content}>
					<h3>Notifications settings</h3>
					<hr />
					<div>
						<h5>Notify me when:</h5>
						<CheckboxApp
							options={[
								"Someone has sent me a message",
								"I have been selected by an employee/employer",
								"I have submitted my application",
								"I have received an offer about potential opportunities",
								"There is an opportunity I may be interested in",
							]}
							flexDirection="column"
						>
						</CheckboxApp>
						<Button variant="contained" color="primary">
							Save
						</Button>
					</div>
				</TabPanel>
				<TabPanel value={value} index={3} className={classes.tabbed_content}>
					<h3>Privacy Settings</h3>
					<hr />
					<div>
						<div>
							<h5>Who can see your page?</h5>
							<hr />
							<CheckboxApp
								options={[
									"Employers",
									"Employees",
									"Unsigned users",
								]}
								flexDirection="column"
							>
							</CheckboxApp>

						</div>

						<div>
							<h5>Who can contact you?</h5>
							<hr />
							<CheckboxApp
								options={[
									"Employers",
									"Employees",
									"Unsigned users",
								]}
								flexDirection="column"
							>
							</CheckboxApp>
						</div>

						<div>
							<h5>Who can find you?</h5>
							<hr />
							<CheckboxApp
								options={[
									"Employers",
									"Employees",
									"Unsigned users",
								]}
								flexDirection="column"
							>
							</CheckboxApp>
						</div>
						<Button variant="contained" color="primary">
							Save
						</Button>
					</div>
				</TabPanel>


				{/* Adding this has the implication that one of us has the capabilities of translating our entire site into another language, so let's keep this hidden */}
				<TabPanel value={value} index={4} className={classes.tabbed_content}>
					<h3>Language Settings</h3>
					<div>
						<br />
						<DropDown
							options={["English", "Español"]}
							controls="simple-menu"
							haspopup="true"
							defaultValue="English"
							color="#302F2F"
							hoverColor="black"
						>
							test
						</DropDown>

						<br />

					</div>
				</TabPanel>

			</div>
		</Container>
	);
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

export const Settings = connect(mapStateToProps)(SettingsPage)