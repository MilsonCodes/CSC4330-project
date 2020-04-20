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

//CSS styling classes
const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: red[500],
	},

	card: {
		border: '4px solid black',
		borderWidth: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		'justify-content': 'space-evenly',
		'padding-bottom': '3px',
	},

	card_header: {
		backgroundColor: 'grey',
		'font-family': 'Helvetica',
		'text-align': 'left',
	},

	expand: {
		marginLeft: 'auto',
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

	header: {
		color: 'white',
		'font-family': 'Calibri',
		'font-size': 40,
		position: 'relative',
		'text-align': 'center',

	},

	preview: {
		'font-size': 20,
	},

	row: {
		'align-content': 'center',
		display: 'flex',
		flexDirection: 'column',
		'flex-wrap': 'wrap',
		'justify-content': 'space-evenly',
		'margin-left': 'auto',
		'margin-right': 'auto',
	},
}));

export default function Applications(props) {

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
  };
  
  const getColorFromStatus = status => {
    switch(status) {
      case "Accepted":
        return '#04a829';
      case "Rejected":
        return 'red';
      default:
        return 'grey';
    }
  }

	return (
		<Card className={classes.card}>
			{/* Generates a color for the header based on the status of the application*/}
      <CardHeader
        title={props.company}
        subheader={`Status: ${props.status}`}
        style={{ 'text-align': 'left', backgroundColor: getColorFromStatus(props.status) }}
      />      
			
			<CardContent>
				{/* Generates the preview text that will always be seen upon loading */}
				<Typography
					color="textSecondary"
					className={classes.preview}
				>
					Job: {props.title}
				</Typography>
				<Typography
					color="textSecondary"
					className={classes.preview}
				>
					Salary: {props.salary}
				</Typography>
			</CardContent>
			{/* Generates a collapsable button for the card which will reveal more information regarding the contents of this card */}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>
						{/* The extra content that will be shown when the card is expanded */}
						{props.description}
					</Typography>
				</CardContent>
			</Collapse>
			<CardActions>
				{/* When either the date or the down arrow button is clicked on, it will trigger the collapse or uncollapse effect */}
				<Button size="small" onClick={handleExpandClick}>Date Submitted:  {props.submitDate}</Button>
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