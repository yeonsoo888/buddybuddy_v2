import axios from "axios";

export class Chatserv {
    option
    constructor() {
        this.option = {
            credentials: 'include',
        }
    }

    chatServ = async (method:string,url:string) => {
        const params = {
            method: method,
            url: url,
        }

        const option = this.option;

        return await axios(
            {...params, ...option}
        )
    };
}