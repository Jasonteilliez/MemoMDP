import axios from "axios";

export const testGet = async () => {
    try {
        const response = await axios.get("http://localhost:8000/")
        if(response) {
            console.log(response);
            return "ok";
        }
        throw new Error('wtf !')
    } catch(err) {
        console.log(err);
        return "pas ok";
    }
}