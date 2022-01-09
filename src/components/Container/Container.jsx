import React from 'react';
import {CSSTransition} from "react-transition-group";
import styles from "./Container.module.scss";
import Button from "../Button/Button";
import Thumbnail from "../Thumbnail/Thumbnail";

const Container = (props) => {

    return (
        <CSSTransition
            in={props.in}
            timeout={{enter: 500, exit: 300}}
            classNames={{
                enter: styles["Container-enter"],
                enterActive: styles["Container-enter-active"],
                enterDone: styles["Container-enter-done"],
                exit: styles["Container-exit"],
                exitActive: styles["Container-exit-active"],
                exitDone: styles["Container-exit-done"]
            }}
            onExited={props.closeParent}
        >
            <div className={styles.Container}>
                <a href={props.info["url"]}>
                    <Thumbnail imgSrc={props.info["thumbnail_url"]}/>
                </a>
                <div className={styles.data}>
                    <div className="data__title">
                        <span>Title</span>
                        <a href={props.info.url}>{props.info.title}</a>
                    </div>
                    <div className="data__author">
                        <span>Author</span>
                        <a href={props.info["author_url"]}>{props.info["author_name"]}</a>
                    </div>
                    <Button onClick={props.downloadHandler}>Convert</Button>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Container;