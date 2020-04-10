import React from 'react'
import styled from "styled-components";
import theme from "../../constants/theme";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
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

//https://css-tricks.com/almanac/properties/b/backdrop-filter/

const useStyles = makeStyles({

	avatar: {
		backgroundColor: red[500],
	},
	
});

export default function VertMenu(props) {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const list = ["Option1", "Option2", "Option3", "Option4", "option5"];
	var i = -1;

	return (
		
			i++ ,
			<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<Menu
					id="long-menu"
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
				>
					{list.map((list) => (
						<MenuItem key={list} selected={list === 'Pyxis'} onClick={handleClose}>
							{list}
						</MenuItem>
					))}
				</Menu>
				<MoreVertIcon />
			</IconButton>
			</div>
	);
}