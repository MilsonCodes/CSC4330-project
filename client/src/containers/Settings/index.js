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


//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: 500,
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
		'font-size': 40,

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
		width: '100%',
		'overflow-y': 'scroll',

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

export const Settings = props => {

	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const TextBoxSize = 500;

	return (

		<div>

			<h2 className={classes.header}>Settings</h2>
			<div className={classes.root}>
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
							<Button href="Link here" style={{ 'backgroundColor': 'rgb(200,200,200)' }}>Set Password</Button>
						</div>

						<div>
							<hr />
							<h4>Two-Factor Authentication</h4>
							<br />
							<Button href="Link here" style={{ 'backgroundColor': 'rgb(200,200,200)' }}>Enable Two-Factor Authentication</Button>
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
							/>
							<Textbox
								label="Last Name"
								variant="filled"
								backgroundColor='white'
								width={TextBoxSize / 2 - 10}
							/>
						</div>
					</FormControl>
					<div>
						<hr />
						<h4>Username</h4>
						<Textbox
							label="Username"
							variant="filled"
							backgroundColor='white'
							width={TextBoxSize}
						/>
					</div>
					<div>
						<hr />
						<h4>Bio</h4>
						<Textbox
							label="Bio"
							variant="filled"
							backgroundColor='white'
							multiline="true"
							width={TextBoxSize}
						/>
						<hr />
						<Textbox
							label="Skills"
							variant="filled"
							backgroundColor='white'
							width={TextBoxSize}
						/>
					</div>
					<div>
						<hr />
						<h4>Contact</h4>
						<Textbox
							label="Email Address"
							variant="filled"
							backgroundColor='white'
							width={TextBoxSize}
						/>
					</div>

					<div>
						<hr />
						<h4>Resume</h4>
						<br />
						<Button
							variant="contained"
							component="label"
						>
							Upload File
							<input
								type="file"
								style={{ display: "none" }}
							/>
						</Button>
					</div>

					<hr />
					<Button variant="contained" color="primary">
						Save
					</Button>

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
		</div>

	);
}