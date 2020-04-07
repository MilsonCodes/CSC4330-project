import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//https://material-ui.com/components/cards/

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		maxWidth: 300,
	},
	bullet: {
		display: 'inline-blockblock',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const options = ["stuff", "test"];
const details = ["Items"];
var i = -1;

export default function OutlinedCard() {

	const classes = useStyles();
	const bull = <span
		className={classes.bullet}>•</span>;

	return (

		options.map(options => (
			i++,

			<Card
				className={classes.root}
				variant="outlined">
			<CardContent>
					{options}
					<Typography
						variant="body2"
						component="p">
						
          <br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
					<Button
						size="small"
					>
						Learn More
					</Button>
			</CardActions>
		</Card>

		))
	);
}