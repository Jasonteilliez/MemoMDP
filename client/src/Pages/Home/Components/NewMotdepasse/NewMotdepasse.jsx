import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./NewMotdepasse.module.scss"

const NewMotdepasse = ({categoryData, handleAddMotdepasse}) => {

    const yupSchema = yup.object({
        mdp_name: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 1 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        mdp_identifiant: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 30 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        mdp_password: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 30 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        mdp_description: yup
        .string(),
        mdp_category: yup
        .array()
        .of(yup.string())
    });

    const {
        register, 
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(yupSchema)
    });

    const submit = async (values) => {
        let newCategory = []
        console.log(values.mdp_category)
        if(values.mdp_category) {
            for (const cat of categoryData) {
                if (values.mdp_category.includes(cat.id.toString())) {
                    newCategory.push(cat)
                }
            }
        }
        const sendData = {
            name: values.mdp_name, 
            identifiant: values.mdp_identifiant, 
            password: values.mdp_password, 
            description: values.mdp_description, 
            is_tested: false,
            category: newCategory
        }
        console.log("sendData :", sendData)
        handleAddMotdepasse(sendData);
        reset();
    }

    return (
        <tr className={`${styles.motdepasseLine}`}>
            <td>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={`${styles.teste}`}></div>
                    <div className={`${styles.motdepasseData}`}>
                        <div className={`${styles.line1}`}>
                            <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register("mdp_name")} id={"mdp_name"} defaultValue=""/></div>
                            <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register("mdp_identifiant")} id={"mdp_identifiant"} defaultValue=""/></div>
                            <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register("mdp_password")} id={"mdp_password"} defaultValue=""/></div>
                        </div>
                        <div className={`${styles.line2}`}>
                            <div><textarea {...register("mdp_description")} id={"mdp_description"} defaultValue=""/></div>
                            <div className={`${styles.categoryList}`}>
                                {categoryData && categoryData.map((el, index) => {
                                    return (
                                        <label key={el.id}>
                                            <input 
                                                type="checkbox" 
                                                {...register("mdp_category")} 
                                                value={el.id} 
                                                id={`mdp_${el.name}`} 
                                                defaultChecked={false}
                                                className={`${styles.iCheckbox}`}
                                            />
                                            <p>{el.name}</p>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <button type="submit"><i className={`fa-solid fa-check ${styles.add}`}></i></button>
                    <div className={`${styles.vide}`}></div>
                    <div className={`${styles.vide}`}></div>
                </form>
            </td>
        </tr>
    )
}

export default NewMotdepasse;

