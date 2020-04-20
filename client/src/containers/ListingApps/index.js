import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux'
import { history } from "../../helpers/history";
import { request } from "../../api/index.js"
import FileDownload from 'js-file-download'


//list of listings
var listingID = 0

function mapStateToProps(state) {
	const { user } = state.auth
	return { user }  
}

class Page extends React.Component{
	constructor(props){
		super(props)
		this.user = props.user
		this.state = {
			applicants: [],
			accepted:[],
			rejected:[],
			pending:[],
			listing: "",
		}
		this.pullData()
	}

	applicantCard(applicant){
		function acceptreject(event) {
			applicant.status = event.target.value
			if (event.target.value === "Rejected"){
				request("/application/"+ applicant.id, { status: "Rejected" }, "POST", true)
				console.log("Hey we're rejecting application :" + applicant.id)
			}
			else if(event.target.value === "Accepted"){
				request("/application/"+ applicant.id, { status: "Accepted" }, "POST", true)
				console.log("Hey we're accepting application :" + applicant.id)
			}
			else{
				request("/application/"+ applicant.id, { status: "Pending" }, "POST", true)
				console.log("Hey we're pending application :" + applicant.id)
			}
			setTimeout(window.location.reload(false),500)
		}
	
		function resumedownload(e){
			request("/users/" + applicant.profile.user.id + "/resume", null, "GET", true, "application/pdf")
				.then(res => {
					FileDownload(res.data, 'file-name.pdf')
				})
				.catch(err => {
					//Handle the error. This may be a 404 saying the user doesn't have a resume
				})
		}
		return (
			<Grid item>
				<Card style={{display: 'inline-block'}}>
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							<FormControl style={{minWidth: 120}}>
								<InputLabel>Select Action</InputLabel>
								<Select
									value={applicant.status}
									onChange={(e)=>{acceptreject(e)}}
								>
									<MenuItem value={"Pending"}>Pending</MenuItem>
									<MenuItem value={"Accepted"}>Accept</MenuItem>
									<MenuItem value={"Rejected"}>Reject</MenuItem>
								</Select>
							</FormControl>
						</Typography>

						{/* Name */}
						<Typography variant="h5" component="h2">
							<a href={"/profile/"+ applicant.profile.id}>{applicant.profile.first_name + " " + applicant.profile.last_name}</a>
						</Typography>

						{/* Email */}
						<Typography color="textSecondary">
							<a href={"mailto:" + applicant.profile.user.email}
							>
								{applicant.profile.user.email}
							</a>
						</Typography>

						{/* Address */}
						<Typography variant="body2" component="p">
							{applicant.profile.company.name}
							<br />
							{applicant.profile.company.description}
							<br />
							{applicant.profile.address.city + " " + applicant.profile.address.zip_code}
						</Typography>

						{/* Bio */}
						<Typography color="textSecondary" variant="body2" component="p" style={{maxWidth:250}}>
							{"Bio: " + applicant.profile.bio}
						</Typography>
						{/* Skills */}
						<Typography variant="body2" component="p" style={{maxWidth:250}}>
							{"Skills: " + applicant.profile.skills}
						</Typography>

					</CardContent>
					<CardActions>
						<Button 
							size="small" 
							onClick={(e)=> {resumedownload(e)}}
						>Resume</Button>
						<Button size="small" href={"mailto:" + applicant.profile.user.email}>Email</Button>
					</CardActions>
				</Card>
			</Grid>
		)
	}


	applicantContainer(applicants) {
		if (applicants.length ==0){
			return(
				<font color="white">No Applicants yet!</font>
			)
		}
		var sorted = applicants.sort(function(a, b) {
			return parseFloat(b.priority) - parseFloat(a.priority);
		})
		return (
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={2}>
						{applicants.sort(function(a, b) {
							return parseFloat(b.priority) - parseFloat(a.priority);
						}).map((applicant, index) => {
							return(this.applicantCard(applicant))//<ApplicantCard applicant={applicant}></ApplicantCard>)
						})}
					</Grid>
				</Grid>
			</Grid>
		)
	}

	pullData = async () => {
		try {
			var res = await request("/listings/"+ listingID +"/applications", null, "GET", true)
			console.log(res)
			this.setState({applicants: res["data"]})
			this.setState({accepted:
				this.state.applicants.filter(function(a){
					return a.status === "Accepted";         
				})})
			this.setState({rejected:
				this.state.applicants.filter(function(a){
					return a.status === "Rejected";         
				})})
			this.setState({pending:
				this.state.applicants.filter(function(a){
					return a.status === "Pending";         
				})})
			
		}
		catch(e) {
			console.log("fail")
			this.setState({applicants: []})
			//Do something with e. This happens when the status code is at or above 400
		}
		try {
			var res = await request("/listings/?listings=1", null, "GET", true)
			for (var i =0; i< res["data"].length; i++){
				if (res["data"][i].id == listingID){
					this.setState({listing: res["data"][i]})
					break
				}
			}
		}
		catch(e) {
			console.log("faillisting")
			//Do something with e. This happens when the status code is at or above 400
		}
	}

	render(){
		if (this.user.admin || this.user.manager){
		
			return (
				<div>
					<h1><font color="white">{this.state.listing.title +  " (ID:" + listingID.toString() +")"}</font></h1>
					<h2><font color="white">{this.state.listing.internalonly?"Internal Only":"Internal and External"}</font></h2>
					<p><font color="white">{"Description: "  + this.state.listing.description}</font></p>
					<p><font color="white">{"Key words: "  + this.state.listing.key_words}</font></p>
					<h3><font color="white">Pending:</font></h3>
					{this.applicantContainer(this.state.pending)}
					<h3><font color="white">Accepted:</font></h3>
					{this.applicantContainer(this.state.accepted)}
					<h3><font color="white">Rejected:</font></h3>
					{this.applicantContainer(this.state.rejected)}
				</div>
			);
		}
		else{
			//user
			//TODO: ?
			history.push("/profile")
		}
	}
}

const NonConnectedComp = props => {
	listingID = props.match.params.id
	return(
		<Page user={props.user}></Page>
	)
}
export const ListingApps = connect(mapStateToProps)(NonConnectedComp)