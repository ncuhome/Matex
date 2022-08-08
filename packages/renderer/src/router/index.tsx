import React, {useEffect} from "react"
import {Navigate, Route, Routes, useLocation} from "react-router-dom"
import Home from "/@/pages/Home";
import Login from "/@/pages/Login";
import ApiTest from "/@/pages/ApiTest";
import SocketTest from "/@/pages/Socket";
import Wait from "/@cmp/Wait";

const AuthRouter = () => {
	const auth = !!localStorage.getItem('login');
	const location = useLocation()

	useEffect(()=>{
		console.log('pathname: '+location.pathname)
	},[location.pathname])


	return (
			<Routes>
				<Route path={'/'} element={auth ? <Home /> : <Navigate to={'login'} />}>
					<Route path="api" element={<ApiTest />} />
					<Route path="socket" element={<SocketTest />} />
					<Route path="1" element={<Wait />} />
					<Route path="2" element={<Wait />} />
				</Route>
				<Route path={'/login'} element={<Login />} />
			</Routes>
	)
}

export default AuthRouter
