import React from 'react';
import styles from "./Notification.module.scss"

const Notification = ({children, type, show}) => {

    if (!children) return null;
    return (
        <div className={[styles.Notification, styles[`Notification-${type}`]].join(" ")}>
            {children}
        </div>
    )
}

export default Notification;