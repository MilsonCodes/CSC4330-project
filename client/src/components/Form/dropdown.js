import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
export default function DropDown() {

	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		margin: {
			margin: theme.spacing(1),
		},
	}));

	const ITEM_HEIGHT = 48;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const options = [
		'Never gonna give you up',
		'Never gonna let you down',
		'Never gonna take a stand',
		'And Hurt you',
	];


	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}>
				Open Menu
      </Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}

			>
				{options.map(options => (
					<MenuItem key={options} onClick={handleClose}>
						{options}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}