import React, {useEffect, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import Input from "../Input/Input";
import Container from "../Container/Container";
import styles from "./Converter.module.scss";
import HttpClient from "../../API/HttpClient";
import Notification from "../Notification/Notification";

const Converter = () => {

    const [url, setUrl] = useState("");
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);


    useEffect(() => {
        if (isYouTubeLink(url)) {
            fetchVideoInfo(url).catch();
            setError("");
        } else {
            setOpen(false);
            if (url!=="")
            setError("wrong url");
        }
    }, [url] )


    function isYouTubeLink(url) {
        return /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9_-]{11})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*$/
            .test(url);
    }

    function handleChange(input) {
        setUrl(input);
    }

    function handleDownload() {
        return HttpClient.requestDownload(info);
    }

    async function fetchVideoInfo(url) {
        let json = await HttpClient.get(`https://noembed.com/embed?url=${url}`)
        if (json.error) {
            setError(json.error);
            setOpen(false);
        }
        else {
            setInfo(json);
            setOpen(true);
        }
    }

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames={{
                enter: styles["Converter-enter"],
                enterActive: styles["Converter-enter-active"],
                enterDone: styles["Converter-enter-done"],
                exit: styles["Converter-exit"],
                exitActive: styles["Converter-exit-active"],
                exitDone: styles["Converter-exit-done"]
            }}
            onEntered={() => setShowContent(true)}
            onExit={() => setShowContent(false)}
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
                <Notification type="error">{error}</Notification>
                <Container
                    in={showContent}
                    info={info}
                    downloadHandler={handleDownload}
                    closeParent={() => setOpen(false)}
                />
            </form>
        </CSSTransition>
    );
};

export default Converter;