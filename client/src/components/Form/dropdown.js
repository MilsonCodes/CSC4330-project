import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

//To DO:  Finish passing down states to the menu.  Create an exposed drop down menu.

export default function DropDown() {

	/* Used to determine the CSS of the menu */
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		margin: {
			margin: theme.spacing(1),
		},
	}));

	//Sets the default text of the menu button
	const defaultValue = "Menu";
	var [select, setSelect] = React.useState(defaultValue);

	//Used for CSS styling
	const classes = useStyles();

	//Used to anchor the menu to the drop down menu button
	const [anchorEl, setAnchorEl] = React.useState(null);

	const options = [
		'Never gonna give you up',
		'Never gonna let you down',
		'Never gonna take a stand',
		'And Hurt you',
	];

	/* Change the text of the manu button when this function is called */
	const handleChange = key => {

		/* Changes the text of the drop down menu button back to the default value */
		setSelect(defaultValue);

		/* If received parameter does not match one of the options (User clicked outside the button),
		 * reset the button text back to the default value */
		for (var i = 0; i < options.length ; i++)
		{
			if (options[i] != key);

			else {
				setSelect(key);
				break;
			}
		}
	};

	/* Creates and anchors the dropdown menu to the button */
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (key) => {
		setAnchorEl(null);
		handleChange(key);
	};

	return (
		<div className = "classes">
			<Button
				color="primary"
				variant = "outlined"
				contentEditable = "false"
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
				>
				{select} ▼
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
						type="text"

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