import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://pawauth-backend.onrender.com/api/auth/login"; // Corrected URL
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.token); // Ensure backend returns 'token'
			window.location = "https://pawhelp.vercel.app/";
		} catch (error) {
			if (error.response && error.response.status >= 400) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.mainTitle}>Welcome to PawHelp</h1>
			<div className={styles.formWrapper}>
				<div className={styles.leftPanel}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<h1 className={styles.title}>Login</h1>
						<input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
						<input type="password" placeholder="Password" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
						{error && <div className={styles.error}>{error}</div>}
						<button type="submit" className={styles.button}>Sign In</button>
					</form>
				</div>
				<div className={styles.rightPanel}>
					<h1 className={styles.subtitle}>New Here?</h1>
					<Link to="/signup">
						<button className={styles.signupButton}>Sign Up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
