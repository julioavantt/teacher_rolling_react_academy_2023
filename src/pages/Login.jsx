import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import NavBar from "../components/NavBar"
import LoginForm from "../components/LoginForm"

import { getUsuario } from "../helpers/rutaUsuarios"

const Login = props => {
	const [user, setUser] = useState({})
	const [userData, setUserData] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		localStorage.setItem("usuario", JSON.stringify([]))
	}, [])

	useEffect(() => {
		getUsuario(user.correo, user.password).then(datos => {
			setUserData(datos)
			localStorage.setItem("usuario", JSON.stringify(datos))
		})
	}, [user])

	useEffect(() => {
		if (userData?.length > 0) navigate("/")
	}, [userData])

	return (
		<>
			<NavBar />
			<div className="container mt-5">
				<div className="row text-center mb-3">
					<div className="col">
						<h3>Iniciar Sesión</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-4 offset-4">
						<p className="text-center">Ingresa tu correo electrónico</p>

						<LoginForm setUser={setUser} />

						<div className="text-center text-muted mt-4">
							<span>
								Al continuar con tu correo aceptas los términos y condiciones y el aviso de
								privacidad.
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
