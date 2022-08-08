import React, {useState} from "react"
import styles from './index.module.scss'
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
	const [active,setActive] = useState(false)
	const navigate = useNavigate();
	const handleSwitch = ()=>{
		setActive((a)=>!a)
	}

	const handleLogin = () => {
		localStorage.setItem('login','true')
		navigate('/',{replace:true});
	}

	return (
			<div className={styles.login}>
				<div className={clsx([styles.container,active&&styles.rightPanelActive])} id="container">
					<div className={clsx([styles.formContainer,styles.signUpContainer])}>
						<div className={styles.form}>
							<h1>创建账号</h1>
							<input type="text" placeholder="Name"/>
							<input type="email" placeholder="Email"/>
							<input type="password" placeholder="Password"/>
							<button>Sign Up</button>
						</div>
					</div>
					<div className={clsx([styles.formContainer,styles.signInContainer])}>
						<div className={styles.form}>
							<h1>登录</h1>
							<input type="email" placeholder="Email"/>
							<input type="password" placeholder="Password"/>
							<a href="#">忘记密码?</a>
							<button className={styles.opBtn} onClick={handleLogin}>Sign In</button>
						</div>
					</div>
					<div className={styles.overlayContainer}>
						<div className={styles.overlay}>
							<div className={clsx([styles.overlayLeft,styles.overlayPanel])}>
								<h1>欢迎回来!</h1>
								<p>马上开启一段奇妙的旅程吧</p>
								<button className={styles.ghost} onClick={handleSwitch}>Sign In</button>
							</div>
							<div className={clsx([styles.overlayRight,styles.overlayPanel])}>
								<h1>Hello!</h1>
								<p>请输入你的账号信息</p>
								<button className={styles.ghost} onClick={handleSwitch}>Sign Up</button>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Login
