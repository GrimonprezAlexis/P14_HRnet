import { Outlet, Link } from "react-router-dom"

const Layout = () => {
  return (
    <>
    <nav>
    <ul className="navigation">
        <li>
        <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/list">View Current Employees</Link>
        </li>
        <li>
        <Link to="/error">Erreur</Link>
        </li>
    </ul>
    </nav>

    <Outlet />
    </>
  )
};

export default Layout
