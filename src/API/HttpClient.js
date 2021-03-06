import axios from "axios";

export default class HttpClient {

    static async get(url) {
        //await new Promise(r => setTimeout(r, 5000));
        const response = await axios.get(url);
        return response.data;
    }
    static async requestDownload(info) {
        axios.post("http://localhost:8080/", {
            "url": info.url,
            "title": info.title
        }).then(res => {
            window.location.href = `http://localhost:8080/download/${res.data.id}`;
        }).catch(err => console.log(err));
    }
}