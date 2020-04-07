
import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import FormControl from "@material-ui/core/FormControl";
import clsx from 'clsx';
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import OutlinedCard from "../../components/Card/container";
import BusinessLeader from "../../assets/stockimages/SkyScapeCrop.png";
import logo from "../../assets/img/ChaseYourDreams.png";

export * from './Admin/index'
export * from './Applications/index'
export * from './Company/index'
export * from './Error/index'
export * from './Home/index'
export * from './Layout/index'
export * from './Listing/index'
export * from './ListingApps/index'
export * from './Login/index'
export * from './Profile/index'
export * from './Register/index'
export * from './Search/index'
export * from './Settings/index'
export * from './Stakeholders/index'
export * from './Test/index'

//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	box: {

		border: '2px solid grey',
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		width: 5,
		background: 'rgba(88, 88, 88, 0.4)',
	},

	button: {
		color: theme.palette.getContrastText(purple[500]),
		backgroundColor: '#e53935',
		'&:hover': {
			backgroundColor: purple[700],
		},
	},

	center: {

		textAlign: 'center', // <-- the magic
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 0,
		color: 'white',
	},

	imagebox: {

		position: 'absolute',
		display: 'inline-block',
		'font-size': '20px', /*or whatever you want*/
		color: '#FFF',

		//color: 'white',
		//background: rgb(0, 0, 0), /* fallback color */
		//background: rgba(0, 0, 0, 0.4),

	},

	imagetext: {

		//Manually aligns to the center
		'margin-left': '40%',
		'margin-right': '50%',

		//Allows the text to be positioned in front of the page anywhere, meaning it can be placed on top of other elements
		position: 'absolute',
		'text-align': 'center',
		left: 0,

		padding: '4px',

		height: '100px',
		'font-family': 'sans-serif',

		//Dimensions of the textbox
		width: '20%',
		height: 'auto',

		//Slightly dark background
		background: 'rgba(189, 189, 189, 0.69)',
		//Blurs the background of the textbox
		'backdrop-filter': 'blur(4px)',
		'border-width': 'medium',
		borderRadius: '10px',
		border: "2px solid rgba(0, 0, 0, 0.69)"
	},

	imagewrapper: {
		display: 'block',
		width: '100%',
		height: 'auto',
		//position: "absolute",
		margin: 'auto',

		/* Add the blur effect */
		filter: 'blur(2px)',
	},

	root: {
		minWidth: 275,
		maxWidth: 300,
	},

	row: {
		display: 'flex',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
	},

});

const options = ["Job Titles", "Salary Range", "Location", "Search"];

export const Home = props => {

	const classes = useStyles();

	return (
		<div style={{ overflow: "auto" }} className="mb-5">
			<div >
				<img src={BusinessLeader} className={classes.imagewrapper} />
				<img src={logo} className={classes.imagetext} style={{ top: '200px' }} />
				<h2
					className={classes.imagetext}
					style={{ top: '400px' }}
				>
					<span>Find your Talents</span>
				</h2>
				<h2
					className={classes.imagetext}
					style={{ top: '500px' }}
				>
					<span>Find your Partners</span>
				</h2>
				<h2 className={classes.imagetext}
					style={{ top: '600px' }} >
					<span>Build your Futures Together</span>
				</h2>
			</div>
			<br />
			<br />
			<div className={clsx(classes.box)} style={{ width: 500, position: "center", margin: 'auto', 'text-align': 'center' }}>
				<p style={{ color: 'white' }} className="m-4">
					<h2 style={{ 'text-align': 'center' }}>About Chase Your Dreams</h2>
					<br />
					Chase Your Dreams is an upstarting project designed to help employers match with potential employees.
					We hope to assist everyone and anyone from employees looking for a fresh change of pace from their daily routine to managers recruiting the best.
				</p>
			</div>
			<br />
			<br />
			<FormControl className={classes.row}>
				<div className={classes.box} style={{ width: 500 }}>
					<p style={{ color: 'white' }} className="m-4">
						<h2 style={{ 'text-align': 'center' }}>For Employers</h2>
						<br />
						You can provide us a list of criteria defining what skills and personality types you want from your employee.
						We'll then consult our database containing over [X] employees and find the one that best matches your ideal employee.
						We'll provide you the best possible results with little effort required on your part.
					</p>
					<div className={classes.center + " mb-4"}>
						<LinkButtons
							size="sm"
							label='stuff'
							variant='outline-light'
							width='auto'
							height='auto'
							text='Click here to begin now!'
							href='/login'
							className="ml-auto mr-auto"
						>
						</LinkButtons>
					</div>
					<br />
				</div>
				<div className={classes.box} style={{ width: 500 }}>
					<p style={{ color: 'white' }} className="m-4">
						<h2 style={{ 'text-align': 'center' }}>For Employees</h2>
						<br />
						All you need to do is input details regarding your life, such as your identity, your skill sets, your talents, your education/experience in a particular job field,
						and we'll match you with any potential recruiters that would love to meet you.
					</p>
					<br />
					<div className={classes.center + " mb-4"}>
						<LinkButtons
							size="sm"
							label='stuff'
							variant='outline-light'
							width='auto'
							height='auto'
							text='Click here to begin now!'
							href='/login'
							className="ml-auto mr-auto"
						>
						</LinkButtons>
					</div>
				</div>
			</FormControl>
		</div>
	)
}