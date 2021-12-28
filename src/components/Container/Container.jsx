import React from 'react';
import Thumbnail from "../Thumbnail/Thumbnail";
import {CSSTransition} from "react-transition-group";
import styles from "./Container.module.scss";
import Button from "../Button/Button";
import HttpClient from "../../API/HttpClient";

const Container = (props) => {

    return (
        <CSSTransition
            in={props.in}
            timeout={500}
            classNames={{
                enterActive: styles["Container-enter-active"],
                enterDone: styles["Container-enter-done"]
            }}
        >
            {props.status ? <div className={styles.Container}>
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
                    <Button onClick={() => HttpClient.requestDownload(props.info)}>Convert</Button>
                </div>
            </div> : <h1>Loading...</h1>
            }
        </CSSTransition>
    );
};

export default Container;