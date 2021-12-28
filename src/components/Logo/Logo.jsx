import React from 'react';
import logo from "../../images/youtube.svg"
import classes from "./Logo.module.scss"

const Logo = ({children, ...props}) => {
    return (
        <div
            className={classes.logo}
            {...props}
        >
            <img
                className={classes.logo__image}
                src={logo}
                alt="Logo"
            />
            <span className={classes.logo__text}>{children}</span>
        </div>
    );
};

export default Logo;