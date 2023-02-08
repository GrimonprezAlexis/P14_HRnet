import React  from "react"
import { Link } from 'react-router-dom'

const Error404 = ({ match }) => {
    return (
        <div className="container error">
            <p className="error__404">404</p>
            <p className="error__404__message">Oups! La page que vous demandez n'existe pas.</p>
            <Link to='/' className="error__404__backHome">Retourner sur la page d’accueil</Link>
        </div>
    )
}

export default Error404