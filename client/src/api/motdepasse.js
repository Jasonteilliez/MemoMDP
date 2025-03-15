import axios from "axios";

export const getMotdepasse = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:3001/motdepasse");
        if (response?.status === 200) {
            return {
                succes: "Motdepasse récupéré.",
                data: response.data
            }
        }
        throw new Error("Erreur Motdepasse");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}

export const putMotdepasse = async (values) => {
    try {
        const response = await axios.put("http://127.0.0.1:3001/motdepasse", values);
        if (response?.status === 200) {
            return {
                succes: "Motdepasse modifié.",
                data: response.data
            }
        }
        throw new Error("Erreur Motdepasse");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}

export const postModepasse = async (values) => {
    try {
        const response = await axios.post("http://127.0.0.1:3001/motdepasse", values);
        if (response?.status === 200) {
            return {
                succes: "Motdepasse créé.",
                data: response.data
            }
        }
        throw new Error("Erreur Motdepasse");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}

export const deleteMotdepasse = async (values) => {
    console.log(values)
    try {
        const response = await axios.delete(`http://127.0.0.1:3001/motdepasse/${values}`);
        if (response?.status === 200) {
            return {
                succes: "Motdepasse supprimé.",
                data: response.data
            }
        }
        throw new Error("Erreur Motdepasse");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}

