import React from 'react';
import styles from "./Button.module.scss"


const Button = ({children, ...props}) => {
    return (
        <button
            type="button"
            className={styles.btn}
            {...props}
        >
            <span className={styles.btn__text}>{children}</span>
        </button>
    );
};

export default Button;