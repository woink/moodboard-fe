import React from 'react';
import SignUp from './SignUp';
import {
	Paper,
	TextField,
	Button,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
} from '@material-ui/core';

class Login extends React.Component {
	state = {
		clicked: false,
		username: '',
		password: '',
	};

	clickHandler = () => {
		let previous = this.state.clicked;
		this.setState({
			clicked: !previous,
		});
	};

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	submitHandler = (e) => {
		e.preventDefault();
		this.props.loginHandler({
			username: this.state.username,
			password: this.state.password,
		});
	};

	render() {
		return (
			<div style={form}>
				<Card elevation={12}>
					<Paper>
						{this.state.clicked ? (
							<SignUp signupHandler={this.props.signupHandler} />
						) : (
								<div style={childForm}>
									<form style={formForm} onSubmit={this.submitHandler}>
										<TextField
											fullWidth
											required
											label="Username"
											size="small"
											variant="outlined"
											name="username"
											value={this.state.username}
											onChange={this.changeHandler}
										/>
										<br></br>
										<br></br>

										<TextField
											fullWidth
											required
											label="Password"
											variant="outlined"
											type="password"
											name="password"
											value={this.state.password}
											size="small"
											onChange={this.changeHandler}
										/>
										<br />
										<Button
											style={submitBtn}
											color="primary"
											variant="contained"
											type="submit"
										>
											Log In
										</Button>
									</form>
									<Button
										style={signUp}
										label="Sign up"
										color="secondary"
										onClick={this.clickHandler}
									>
										New User? Sign Up
									</Button>
								</div>
						)}
					</Paper>
				</Card>
			</div>
		);
	}
}

export default Login;

const form = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: '15vh',
};

const childForm = {
	width: '60vh',
	padding: '10px',
};

const formForm = {
	padding: '20px',
};

const submitBtn = {
	marginTop: '1vh',
	float: 'right',
	marginRight: '2vw',
	width: '15vw',
};

const loginImg = {
	height: 0,
	paddingTop: '56.25%',
	marginTop: '30',
};

const signUp = {
	marginTop: '5vh',
	marginRight: 'auto',
	marginLeft: 'auto',
	width: '100%',
};

const title = {
	marginTop: '2vh',
};
