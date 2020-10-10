import React from 'react';
import {
	TextField,
	Typography,
	Button,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
} from '@material-ui/core';

class SignUp extends React.Component {
	state = {
		username: '',
		password: '',
		password_confirm: '',
		email: '',
	};

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	submitHandler = (e) => {
		console.log('are you in here');
		e.preventDefault();
		this.props.signupHandler({
			username: this.state.username,
			password: this.state.password,
			avatar: this.state.avatar,
		});
	};

	render() {
		return (
			<div style={form}>
				<Card>
					<CardContent>
						<Typography
							align="center"
							style={title}
							variant="h2"
							component="h2"
						>
							Signup
						</Typography>
						<form style={formForm} onSubmit={this.submitHandler}>
							<CardActionArea>
								<CardMedia
									style={loginImg}
									image="https://i.ibb.co/PGSxdbf/Untitled-design-1.png"
									title="Chits"
								/>
							</CardActionArea>
							<TextField
								fullWidth="true"
								required="true"
								size="small"
								style={inputs}
								label="Email"
								name="email"
								variant="outlined"
								value={this.state.email}
								onChange={this.changeHandler}
							/>
							<br />
							<TextField
								fullWidth="true"
								required="true"
								size="small"
								style={inputs}
								label="Username"
								variant="outlined"
								name="username"
								value={this.state.username}
								onChange={this.changeHandler}
							/>
							<br></br>
							<TextField
								fullWidth="true"
								required="true"
								size="small"
								style={inputs}
								label="Password"
								variant="outlined"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.changeHandler}
							/>
							<br />
							<TextField
								fullWidth="true"
								required="true"
								size="small"
								style={inputs}
								label="Confirm Password"
								variant="outlined"
								name="password_confirm"
								type="password"
								value={this.state.password_confirm}
								onChange={this.changeHandler}
							/>
							<br></br>
							<Button
								style={submitBtn}
								color="primary"
								variant="contained"
								type="submit"
							>
								Sign Up
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default SignUp;

const inputs = {
	padding: '.5vh',
	alignItems: 'stretch',
	width: '35rem',
};

const form = {
	display: 'flex',
	justifyContent: 'center',
	// marginTop: '15vh',
	flexDirection: 'column',
	// margin: '10%'
};

const formForm = {
	padding: '20px',
	// margin: '10rem'
};

const submitBtn = {
	marginTop: '1vh',
	float: 'right',
	// marginRight: '2vw',
	width: '15vw',
	marginBottom: '5vh',
};

const title = {
	marginTop: '2vh',
	mkarginBottom: '2vh',
	float: 'center',
};

const loginImg = {
	height: 0,
	paddingTop: '56.25%',
	marginTop: '30',
};
