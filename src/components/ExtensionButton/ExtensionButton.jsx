import React from 'react';
import styles from "../Button/Button.module.scss";


const ExtensionButton = ({children, imgSrc, ...props}) => {
    return (
        <button
            className={`${styles.btn} ${styles.extension}`}
            {...props}
        >
            <img className={styles.btn__icon} src={imgSrc} alt=""/>
            <span className={styles.btn__text}>{children}</span>
        </button>
    );
};

export default ExtensionButton;