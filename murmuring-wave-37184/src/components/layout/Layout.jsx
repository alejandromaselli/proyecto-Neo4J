import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signOut } from "../auth/helpers";

import Menu from './Menu';

const Layout = ({ children, match, history }) => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [showing, setShowing] = useState(false)

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        console.log(width);
        console.log(height);
    })

    const isActive = (path) => {
        if (match.path === path) return { color: "#000" };
        else return { color: "#fff" };
    };

    useEffect(() => {
        console.log(process.env.REACT_APP_API);
        setWidth(window.innerWidth)
    }, []);

    const nav = () => (
        <ul className="nav nav-tabs bg-primary" style={{ position: 'absolute', width: '100vw' }} >
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive("/")}>
                    Inicio
                </Link>
            </li>
            {
                !isAuth() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
                                Crear cuenta
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
                                Iniciar sesión
                            </Link>
                        </li>
                    </React.Fragment>
                )
            }
            {
                isAuth() && isAuth().role === 'admin' && (
                    <React.Fragment>
                        <li className="nav-item">
                            <li
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => {
                                    signOut(() => {
                                        history.push('/')
                                    })
                                }}
                            >Singout admin {isAuth().name}</li>
                        </li>
                    </React.Fragment>
                )
            }
            {
                isAuth() && (
                    <React.Fragment>
                        <li className="nav-item">
                            <li
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#fff' }}
                                onClick={() => {
                                    signOut(() => {
                                        history.push('/')
                                    })
                                }}
                            >Signout {isAuth().name}</li>
                        </li>
                    </React.Fragment>
                )
            }
        </ul >
    );

    const sideBar = () => (
        <React.Fragment>
            <div className="side-menu" style={{ display: width < 500 ? 'inline-block' : 'none' }}  >
                <header style={{ transform: showing ? 'translateX(0%)' : 'translateX(-100%)', transition: '1s' }}>
                    <nav>
                        <ul>
                            <li>ruta 2</li>
                            <li>ruta 2</li>
                            <li>ruta 2</li>
                            <li>ruta 2</li>
                        </ul>
                    </nav>
                    <div className="exit" onClick={() => setShowing(!showing)} style={{ transform: showing ? 'translateX(0%)' : 'translateX(-100%)', transition: '1s' }} ></div>
                </header>
                <i onClick={() => setShowing(!showing)} className="fa fa-bars"></i>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {width < 500 ? sideBar() : nav()}
            <div className="container">{children}</div>
        </React.Fragment>
    );
};

export default withRouter(Layout);
