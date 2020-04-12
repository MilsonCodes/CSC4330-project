import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import DropDown from "../../components/Form/dropdown";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import VertMenu from "../../components/Form/VertMenu";
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import SubmitForm from "../../components/Form/index";
import FriendlyCatchUp from "../../assets/stockimages/FriendlyCatchUp.jpg"


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

export const Test = props => {

	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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
					<Tab label="Account" {...a11yProps(3)} />
					{/*<Tab label="Language" {...a11yProps(4)} />*/}
				</Tabs>
				<TabPanel value={value} index={0} className={classes.tabbed_content}>
					<h3>General Settings</h3>
					<hr />
					<div className={classes.pagebreak} >
						<br />
						<div>
							<br />
							<h4>Account Details</h4>
							<hr />
							<h6>Set Password</h6>
						</div>

						<div>
							<br />
							<h4>Two-Factor Authentication</h4>
							<br />
							<h6>Enable Two-Factor Authentication</h6>
						</div>

					</div>

				</TabPanel>
				<TabPanel value={value} index={1} className={classes.tabbed_content}>
					<h3>Profile Settings</h3>
					<hr />
					<div>
						<br />
						<h4>About</h4>
					</div>
					<hr />
					<div>
						<h4>Full Name</h4>
						<Textbox
							label="Location"
							variant="filled"
							backgroundColor='white'
						/>
					</div>
					<div>
						<br />
						<h4>Username</h4>
						<Textbox
							label="Location"
							variant="filled"
							backgroundColor='white'
							size='sm'
						/>
					</div>
					<div>
						<br />
						<h4>First Name</h4>
						<Textbox
							label="First Name"
							variant="filled"
							backgroundColor='white'
						/>
					</div>
					<div>
						<br />
						<h4>Bio</h4>
						<Textbox
							label="Bio"
							variant="filled"
							backgroundColor='white'
						/>
					</div>
					<div>
						<br />
						<h4>Contact</h4>
						<Textbox
							label="Contact"
							variant="filled"
							backgroundColor='white'
						/>
					</div>
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
							options={["Someone has sent me a message",
								"I have been selected by an employee/employer",
								"I have submitted my application",
								"I have received an offer about potential opportunities",
								"There is an opportunity I may be interested in",
							]}
							flexDirection="column"
						>
						</CheckboxApp>

					</div>
				</TabPanel>
				<TabPanel value={value} index={3} className={classes.tabbed_content}>
					<h3>Account Settings</h3>
					<hr />
					<div>

						<br />

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