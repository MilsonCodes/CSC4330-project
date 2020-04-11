import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
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
import LinkButtons from "../../components/Buttons/LinkButton";
import StyledButtons from "../../components/Buttons/StyledButton";
import CheckboxApp from "../../components/Form/checkbox";
import VertMenu from "../../components/Form/VertMenu";
import SubmitButton from "../../components/Form/SubmitButton";
import Textbox from "../../components/Form/textbox";
import DropDown from "../../components/Form/dropdown";
import SubmitForm from "../../components/Form/index";
import FriendlyCatchUp from "../../assets/stockimages/FriendlyCatchUp.jpg"


//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	avatar: {
		backgroundColor: red[500],
	},

	box: {
		
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		width: 500,
		background: 'rgba(208, 208, 208, 0.4)',
	},

	card: {
		backgroundColor: '#D0D0D0',
		flexWrap: 'wrap',
		borderWidth: 1,
		height: '100%',
		width: '300px',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
		'padding-bottom': '3px',
		border: '4px solid black',
	},

	card_bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},

	card_header: {

		fontSize: 14,
		position: 'relative',
		left: '-60px',

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
		right: "500px",
		margin: 'auto',
		'font-family': 'Yanone Kaffeesatz',
		'font-size': 40,
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
});

export const Test = props => {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	//Job Search Page
	//https://www.pexels.com/ For free stock images
	const classes = useStyles();

	const options = ["Business A", "Business B", "Business C", "Business D", "Business E"];
	const desc = ["A's description", "B's description", "C's description", "D's description", "E's description"];
	var i = -1;

	return (
		<div style={{ overflow: "auto" }}>
			
			<header>
				<h1 className={clsx(classes.header, classes.box)}>
				Let's get started
				</h1>
				<br />
					<h2 className={clsx(classes.box, classes.header)}>
					Join us and begin the search for a not just a new employer 
						but for a new way of life.
				</h2>
			</header>
			<img src={FriendlyCatchUp} className={classes.image} />

			<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
			<div>
				<div className={clsx(classes.header, classes.box)} style={{ 'text-align' : 'center', 'margin-left':'55%', width:'50%' }}>
					<h4 style={{ color: 'white', 'text-align': 'center' }}>Search</h4>
					<h4 style={{ color: 'white', 'text-align': 'center' }}>It's simple.  For a quick search, just fill out the textboxes below and we'll best match you to your preferences.</h4>
				</div>

				<br />

				<Container className={classes.row} fixed style={{ backgroundColor: 'white'}}>
					<Textbox
						label="Keywords"
						variant="filled"
						backgroundColor='white'
					/>

					<Textbox
						label="Location"
						variant="filled"
						backgroundColor='white'
					/>
					<Textbox
						label="Salary"
						variant="filled"
						backgroundColor='white'
					/>
				</Container>
				<br/>
				<SubmitButton
					width='100px'
					marginLeft="292px"
					backgroundColor="#5C5959"
					variant="contained"
					color="secondary"
				>
				</SubmitButton>

				<h4 style={{ display: 'flex', 'margin-left': '35%', 'text-align': 'center', top: '1000px', color: 'white' }}>
					See what we have to offer right now
				</h4>

				<div className={classes.row}>

					{options.map(options => (
						i++ ,
						<Card className={classes.card}>
							<CardHeader
								avatar={
									<Avatar aria-label="business" className={classes.avatar}>
										I
									</Avatar>
								}
								title={options}
								subheader="Date"
							/>
							<CardContent>
								<br />
								<Typography color="textSecondary"> {desc[i]} </Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Learn More</Button>
							</CardActions>
						</Card>
					))
					}
				</div>
		</div>
			<br />
		</div>
  )
}