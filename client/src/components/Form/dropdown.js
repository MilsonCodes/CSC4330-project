import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

//To DO:  Finish passing down states to the menu.  Create an exposed drop down menu.

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


	var [select, setSelect] = React.useState("Menu");

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const options = [
		'Never gonna give you up',
		'Never gonna let you down',
		'Never gonna take a stand',
		'And Hurt you',
	];

	const handleChange = event => {
		setSelect("test");
	};

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (key) => {
		alert(key);
		setAnchorEl(null);
		handleChange();
	};

	return (
		<div className = "classes">
			<Button
				contentEditable = "false"
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}>
				{select}
      </Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}

			>
				{options.map(options => (
					<MenuItem
						type = "text"
						
						onClick={
							() => handleClose(options)
						}
					>
						{options}

					</MenuItem>
				))}
			</Menu>
		</div>
	);
}