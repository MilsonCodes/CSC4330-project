import React from 'react';
import { Button, Avatar, Typography, Card, CardHeader, CardActions, CardContent } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';

const useStyles = makeStyles({
	avatar: {
		backgroundColor: red[500],
	},
	card: {
		backgroundColor: '#D0D0D0',
		border: '4px solid black',
		borderWidth: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
    height: '100%',
    width: "100%",
		'justify-content': 'space-evenly',
	}
});

function ListingCardNA(props) {
  const classes = useStyles();

  const { listing, company, appButton, user } = props

  const getDateStr = date => {
    const dateStr = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

    const getNumStr = num => num < 10 ? `0${num}` : num

    const timeStr = `${date.getHours()}:${getNumStr(date.getMinutes())}`

    return `Closes at: ${dateStr} ${timeStr}`
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="business" className={classes.avatar}>
            {company.name.charAt(0)}
          </Avatar>
        }
        title={company.name}
        subheader={getDateStr(new Date(listing.date))}
      />
      <CardContent>
        <Typography color="textWhite"> {listing.title} </Typography>
        <br />
        <Typography color="textSecondary"> {listing.description} </Typography>
      </CardContent>
      <br/>
      <br/>
      <CardActions style={{ position: 'absolute', bottom: 0 }}>
        <Button size="small" variant="outlined" href={`/listing/${listing.id}`}>Learn More</Button>
        {appButton ? 
          <Button size="small" variant="outlined" className="ml-2" onClick={() => appButton(listing.id)}>Apply</Button>
        : null}
        {user.manager && user.company.id === company.id ?
          <Button size="small" variant="outlined" className="ml-2" href={`/listing/${listing.id}/applications`}>View Applications</Button>
        : null}
      </CardActions>
    </Card>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth

  return { user }
}

const ListingCard = connect(mapStateToProps)(ListingCardNA)
export default ListingCard