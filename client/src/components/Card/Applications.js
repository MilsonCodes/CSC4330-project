import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: red[500],
	},

	box: {

		border: '2px solid grey',
		'border-width': 'medium',
		'border-radius': '10px',
		padding: 3,
		'padding-bottom': '30px',
		width: 500,
		background: 'rgba(88, 88, 88, 0.4)',
	},

	card: {

		flexWrap: 'wrap',
		borderWidth: 1,
		height: '100%',
		width: '1400px',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
		'padding-bottom': '3px',
		border: '4px solid black',
	},

	card_header: {

		fontSize: 14,
		position: 'relative',
		left: '-60px',

	},

	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

	header: {

		color: 'white',
		position: 'relative',
		'text-align': 'center',
		'font-family': 'Calibri',
		'font-size': 40,

	},

	row: {
		'margin-left': 'auto',
		'margin-right': 'auto',
		flexDirection: 'column',
		display: 'flex',
		maxWidth: '1500px',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'allign-content': 'center',
		'padding-bottom': '10px',
		'padding-top': '10px',
	},
}));

export default function Applications(props) {

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className={classes.card}>
			{/* Generates a color for the header based on the status of the application*/}
			{
				(props.subheader == "Status: Accepted")
					? <CardHeader
						title={props.title}
						subheader={props.subheader}
						style={{ 'text-align': 'left', backgroundColor: '#04a829' }}
					/>
					: null
			}
			{
				(props.subheader == "Status: Rejected")
					? <CardHeader
						title={props.title}
						subheader={props.subheader}
						style={{ 'text-align': 'left', backgroundColor: 'red' }}
					/>
					: null
			}
			{
				(props.subheader == "Status: Unsent")
					? <CardHeader
						title={props.title}
						subheader={props.subheader}
						style={{ 'text-align': 'left', backgroundColor: 'grey' }}
					/>
					: null
			}
			
			<CardContent>
				<Typography color="textSecondary" style={{fontSize: 20}}> Job: {props.job} </Typography>
			</CardContent>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>
						{props.FullDetails}
					</Typography>
				</CardContent>
			</Collapse>
			<CardActions>
				<Button size="small" onClick={handleExpandClick}>Date Submitted:  {props.Date}</Button>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}