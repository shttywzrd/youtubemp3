import React, {useEffect, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import Input from "../Input/Input";
import Container from "../Container/Container";
import styles from "./Converter.module.scss";
import HttpClient from "../../API/HttpClient";

const Converter = () => {

    const [url, setUrl] = useState("");
    const [info, setInfo] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isYouTubeLink(url)) fetchVideoInfo(url).catch(() => console.log("fetch error"));
    }, [url] )

    function isYouTubeLink(url) {
        return /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]{11})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*$/
            .test(url);
    }

    function handleChange(input) {
        setUrl(input);
    }

    async function fetchVideoInfo(url) {
        const json = await HttpClient.get(`https://noembed.com/embed?url=${url}`);
        if(json) {
            if(json.error) {
                console.log(json.error);
                setIsLoaded(false);
            }
            else {
                setInfo(json);
                setIsLoaded(true);
            }
        }
    }

    return (
        <CSSTransition
            in={isLoaded}
            timeout={300}
            classNames={{
                enter: styles["Converter-enter"],
                enterActive: styles["Converter-enter-active"],
                enterDone: styles["Converter-enter-done"]
            }}
            onEntered={() => setShowContent(true)}
            onExited={() => setShowContent(false)}
        >
            <form className={styles.Converter}>
                <Input
                    type="text"
                    placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    value={url}
                    onChange={e => handleChange(e.target.value)}
                    onPaste={e => handleChange(e.target.value)}
                />
                <label className={styles.Converter__label} htmlFor={styles.Converter}>Enter youtube link:</label>
                <Container in={showContent} status={isLoaded} info={info}/>

            </form>
        </CSSTransition>
    );
};



export default Converter;