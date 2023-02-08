import { Outlet, Link } from "react-router-dom"

const Header = () => {
  return (
    <>
    <header className="navigation">
        <h1><Link to="/">HRnet</Link></h1>
        <Link to="/list">View Current Employees</Link>
    </header>

    <Outlet />
    </>
  )
};

export default Header
