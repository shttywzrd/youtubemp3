import React from 'react';
import styles from "./Thumbnail.module.scss"

const Thumbnail = (props) => {
    return (
        <div className={styles.wrapper}>
            <img
                className={styles.img}
                src={props.imgSrc}
                alt="thumbnail"
            />
        </div>
    );
};

export default Thumbnail;