import axios from "axios";

export const getCategory = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:3001/category");
        if (response?.status === 200) {
            return {
                succes: "Category récupéré.",
                data: response.data
            }
        }
        throw new Error("Erreur Category");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}


export const putCategory = async (values) => {
    try {
        const response = await axios.put("http://127.0.0.1:3001/category", values);
        if (response?.status === 200) {
            return {
                succes: "Category modifié.",
                data: response.data
            }
        }
        throw new Error("Erreur Category");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}


export const deleteCategory = async (values) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:3001/category/${values}`);
        if (response?.status === 200) {
            return {
                succes: "Category supprimé.",
                data: response.data
            }
        }
        throw new Error("Erreur Category");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}


export const postCategory = async (values) => {
    try {
        const response = await axios.post("http://127.0.0.1:3001/category", values);
        if (response?.status === 200) {
            return {
                succes: "Category créé.",
                data: response.data
            }
        }
        throw new Error("Erreur Category");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}