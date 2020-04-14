import React from 'react'
import styled from "styled-components";
import clsx from 'clsx';
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Applications from '../../components/Card/Applications';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import MessageIcon from '@material-ui/icons/Message';
import Typography from '@material-ui/core/Typography';
import InputIcon from '@material-ui/icons/Input';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { request } from "../../api/index";
import WorkingTogether from "../../assets/stockimages/WorkingTogether.jpg";
import SkyScraper from "../../assets/stockimages/Skyscraper.jpg"
import OfficeBuilding from "../../assets/stockimages/OfficeBuildingCrop.jpg"

const useStyles = makeStyles({

	Address: {
		'color': 'white',
		'font-size': '14px',
		'margin-left': '5px',
	},

	BoldAndBrash: {
		'font-weight': 'bold',
		'font-size': '18px',
	},

	box: {
		backgroundColor: 'white',
		width: '1500px',
		'padding-top': '20px',
		'padding-bottom': '20px',
		'backdrop-filter': 'blur(4px)',
	},

	boxHeader: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'center',
	},

	darkbox: {
		//Slightly dark background
		background: 'rgba(0, 0, 0, 0.69)',
		//Blurs the background of the textbox
		'backdrop-filter': 'blur(4px)',
		'border-width': 'small',
		borderRadius: '10px',
		border: "2px solid rgba(0, 0, 0, 0.69)",
	},

	header: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'serif-voga',
		'font-size': 40,
	},

	IconAndText: {
		display: 'flex',
		'flex-direction': 'row',
	},

	imagebox: {
		//Slightly dark background
		background: 'rgba(189, 189, 189, 0.69)',
		//Blurs the background of the textbox
		'backdrop-filter': 'blur(4px)',
		'border-width': 'small',
		borderRadius: '10px',
		border: "2px solid rgba(0, 0, 0, 0.69)",
	},

	imagewrapper: {
		display: 'block',
		width: '100%',
		height: 'auto',
		margin: 'auto',

		/* Add the blur effect */
		filter: 'blur(2px)',
	},

	largeIcon: {
		width: 60,
		height: 60,
	},
	
	subHeader: {
		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'serif-voga',
		'font-size': 30,
		maxWidth: '1500px',
	},
	
	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'row',
		display: 'flex',
		maxWidth: '1500px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'align-content': 'center',
	},
});

export const Test = props => {

	const classes = useStyles();

	const CompanyName = "Company A";
	const CompanyDescription = 'He discovered a trick that was immensely hard to pull off.  It required ten angle perfect inputs, thirteen pixel perfect inputs, and alternating buttons every 60th of a second without pausing.  It took place in the last minute of the run, and he had to be there on the perfect frame, which meant completely perfect play up to that point.Additionally, not only was his position required to be right, but his subpixel position, which takes too long to manipulate and is essentially RNG(7 / 3000 chance) had to be right as well.In all, the trick saved around three tenths of a second. Obviously, it was worth going for it.';
	const State = "Washington";
	const PhoneNumber = "123-456-789";
	const Email = "fakeAddress@fakeDomain.com";
	/* DATA TO BE PUT IN VIA API LATER */
	
	return (
		<div>
			{/*-----------------------------COMPANY DESCRIPTION & CONTACT INFORMATION BOX------------------------------------*/}
			<img src={WorkingTogether} className={classes.imagewrapper} />
			<Container className={clsx(classes.box, classes.imagebox)} style={{
													position: 'absolute',
													top: '200px',
													left: '-100px',
													width: '500px',
													'margin-left':'150px',
												}}>
				<h3>{CompanyName}</h3>
				<hr />
				<Typography color="primary" className={classes.BoldAndBrash}>Location: {State}</Typography>

				<br />
				<Typography color="primary" className={classes.BoldAndBrash}>Field: Technology</Typography>

				<br />
				{/*-----------------------------CONTACT INFORMATION SUBHEADER------------------------------------*/}
				<h2>Contact Information</h2>
				<hr />
				<div className={classes.IconAndText}>
					<PhoneIcon style={{'margin-right': '5px'}} />
					<Typography className={classes.BoldAndBrash}> Phone: {PhoneNumber}</Typography>
				</div>
				<br />
				<div className={classes.IconAndText}>
					<EmailIcon style={{ 'margin-right': '5px' }} />
					<Typography className={classes.BoldAndBrash}>Email: {Email}</Typography>
				</div>
			</Container>
			<br />
			{/*-----------------------------IMAGE SUBTEXT (ADDRESS)------------------------------------*/}
			<div className={classes.box, classes.darkbox} style={{
				position: 'absolute',
				top: '505px',
				left: '500px',
				width: '750px',
				height: '75px',
				'z-index':'1',
				'margin-left': '150px',
			}}>
			{/* ADDRESS CONTENT */}
				<Typography className={classes.BoldAndBrash, classes.Address}>
					Ecolibrium Farms
				</Typography>
				<Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
					15410 Northeast 124th StreetRedmond
				</Typography>
				<Typography color="textSecondary" className={classes.BoldAndBrash, classes.Address}>
					WA 98052
				</Typography>
			</div>

			{/*-----------------------------IMAGE PLACEMENT------------------------------------*/ }
			<img src={OfficeBuilding} style={{
										position: 'absolute',
										top: '200px',
										left: '500px',
										width: '750px',
										'margin-left': '150px', }}
			/>

{/*-----------------------------ABOUT THE COMPANY TEXTBOX------------------------------------*/ }
{/* Provides a description of the company */ }
			<Container className={clsx(classes.box, classes.imagebox)} style={{
																		position: 'absolute',
																		top: '600px',
																		left:'500px',
																		width: '750px',
																		'margin-left': '150px',
																		}}>
				<h3>About this company</h3>
				<hr />
				{/* Company Description */}
				<Typography color='primary'>
					{CompanyDescription}
				</Typography>
			</Container>
			<br />

			<div className={classes.row} style={{ width: '800px' }}>
				{/* Generates the send an application box */}
				<Container
					className={(classes.box, classes.imagebox)}
					style={{ position: 'absolute', top: '600px', left: '75px', width: '230px', height: '150px', display: 'flex', flexDirection: 'column', 'align-items': 'center', justifyContent: "center"}}
				>
					{/* Input Icon */}
					<InputIcon className={classes.largeIcon} style={{ 'padding-top': '13px' }} />
					{/* Subtext */}
					<Typography className={classes.BoldAndBrash} style={{ 'margin-bottom': '25px'}}>
						Send an application
					</Typography>
				</Container>
				{/* Generates the visit website box*/}
				<Container
					className={classes.box, classes.imagebox}
					style={{ position: 'absolute', top: '600px', left: '315px', width: '230px', height: '150px', display: 'flex', flexDirection: 'column', 'align-items': 'center', justifyContent: "center" }}
				>
				{/* Link Icon */}
				<InsertLinkIcon className={classes.largeIcon} />
				{/* Subtext */}
				<Typography className={classes.BoldAndBrash} style={{ 'margin-bottom': '25px'}}>
					Visit Website
				</Typography>
				</Container>
			</div>
		</div>
	);
}