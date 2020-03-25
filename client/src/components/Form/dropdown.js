import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

export default function DropDown(props) {

	/* Used to determine the CSS of the menu */
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			width: "130px",
		},
		margin: {
			margin: theme.spacing(1),
		},
	}));

	//Sets the default text of the menu button
	var [select, setSelect] = React.useState(props.defaultValue);

	//Used for CSS styling
	const classes = useStyles();

	//Used to anchor the menu to the drop down menu button
	const [anchorEl, setAnchorEl] = React.useState(null);

	//Copies the prop array list into a variable.  This is to allow the prop array to be mapped out into a menu.
	const list = props.options

	/* Change the text of the manu button when this function is called */
	const handleChange = key => {

		/* Changes the text of the drop down menu button back to the default value */
		setSelect(props.defaultValue);

		/* If received parameter does not match one of the options (User clicked outside the button),
		 * reset the button text back to the default value */
		for (var i = 0; i < list.length ; i++)
		{
			if (list[i] != key);

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

	/* Activates when the menu is supposed to close.  Will disable the anchor to the dropdown menu.
	 * And will change the text of the menu based on what was or wasn't selected. */
	const handleClose = (key) => {
		setAnchorEl(null);
		handleChange(key);
	};

	return (
		//Div classname is used for the CSS styling variable.
		<div className={classes.root}>
			<Button
				//Determines the color of the button
				color="primary"
				//Determines appearance of the button
				variant="outlined"
				//Determines if the content of the button can be editable
				contentEditable="false"
				//A setting for screen readers to help readers with disabilities
				aria-label="more"
				//Determines menu type
				aria-controls="long-menu"
				//Indicates that there is an interactive popup sub-menui
				aria-haspopup="true"
				onClick={handleClick}
				>
				{select} ▼
      </Button>
			<Menu
				id="simple-menu"
				//Anchors the menu to the button
				anchorEl={anchorEl}
				//Keeps the children in the DOM.  Used to allow the menu to be responsive.
				keepMounted
				//Opens the drop down menu
				open={Boolean(anchorEl)}
				onClose={handleClose}

			>
				{/* Creates a loop that maps out the contents of an array and adds each array value as its own menu type.
				 * This allows for a menu button to dynamically create a series of menu options based on the available options*/}
				{list.map(list => (
					<MenuItem
						type="text"
						onClick={
							() => handleClose(list)
						}
					>
						{list}

					</MenuItem>
				))}
			</Menu>
		</div>
	);
}