import axios from "axios";

export default class HttpClient {

    static async get(url) {
        await new Promise(r => setTimeout(r, 1000));
        const response = await axios.get(url);
        return response.data;
    }
    static async requestDownload(info) {
        axios.post("https://109.251.68.32:8080/", {
            "url": info.url,
            "title": info.title
        }).then(res => {
            window.location.href = `https://109.251.68.32:8080/download/${res.data.id}`;
        }).catch(err => console.log(err));
    }
}