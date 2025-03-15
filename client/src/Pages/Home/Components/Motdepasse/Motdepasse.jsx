import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './Motdepasse.module.scss';

const Motdepasse = ({data, categoryData, handleModifyMotdepasse, handleDeleteMotdepasse}) => {
    const{id, name, identifiant, password, description, is_tested, category} = data;
    const [isEditing, setIsEditing] = useState(false);
    const [isInfo, setIsInfo] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const toggleInfo = () => {
        setIsInfo(!isInfo)
    }

    const yupSchema = yup.object({
        [`name${id}`]: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 1 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        [`identifiant${id}`]: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 30 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        [`password${id}`]: yup
        .string()
        .required("Le champ est obligatoire")
        .min(1, "Le champ doit comporter 30 caractères")
        .max(30, "Le champ ne doit pas contenir plus de 30 caractères"),
        [`description${id}`]: yup
        .string(),
        [`is_tested${id}`]: yup
        .boolean(),
        [`category${id}`]: yup
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
        console.log(values)
        let newCategory = []
        for (const cat of categoryData) {
            if (values[`category${id}`].includes(cat.id.toString())) {
                newCategory.push(cat)
            }
        }
        const sendData = {
            id,
            name: values[`name${id}`], 
            identifiant: values[`identifiant${id}`], 
            password: values[`password${id}`], 
            description: values[`description${id}`], 
            is_tested: values[`is_tested${id}`],
            category: newCategory
        }
        console.log("sendData :", sendData)
        handleModifyMotdepasse(sendData)
    }

    const isDefaultChecked = (id) => {
        for (const cat of category) {
            if (id === cat.id) return true;
        }
        return false;
    }

    const handleClickSupprimer = () => {
        handleDeleteMotdepasse(id);
    }

    return(
        <tr className={`${styles.motdepasseLine}`}>
            <td>
                {!isEditing && (
                    <div>
                        {is_tested ? (
                            <div className={`${styles.teste} ${styles.testeYes}`}></div>
                        ) : (
                                    
                            <div className={`${styles.teste} ${styles.testeNo}`}></div>
                        )}
                        <div className={`${styles.motdepasseData}`}>
                            <div className={`${styles.line1}`}>
                                <div className={`${styles.info}`}><p>{name}</p></div>
                                <div className={`${styles.info}`}><p>{identifiant}</p></div>
                                <div className={`${styles.info}`}><p>{password}</p></div>
                            </div>

                            {isInfo ? (
                            <div className={`${styles.line2}`}>
                                <div><p>{description}</p></div>
                                <div className={`${styles.categoryList}`}>
                                    {category && category.map((el, index) => {
                                        return(
                                            <span key={index}>{el.name} </span>
                                        )
                                    })}
                                </div>

                            </div>) : ("")
                            }
                        </div>
                        <button type="button" onClick={toggleInfo}><i className={`fa-solid fa-circle-info ${styles.info}`}></i></button>
                        <button type="button" onClick={toggleEdit}><i className={`fa-regular fa-pen-to-square ${styles.modify}`}></i></button>
                        <button type="button" onClick={handleClickSupprimer}><i className={`fa-solid fa-trash ${styles.delete}`}></i></button>
                    </div>
                )}
                {isEditing && (
                    <form onSubmit={handleSubmit(submit)}>
                        <div className={`${styles.teste}`}>
                            <input type="checkbox" {...register(`is_tested${id}`)} id={`is_tested${id}`} defaultChecked={is_tested}/>
                        </div>
                        <div className={`${styles.motdepasseData}`}>
                            <div className={`${styles.line1}`}>
                                <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register(`name${id}`)} id={`name${id}`} defaultValue={name}/></div>
                                <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register(`identifiant${id}`)} id={`identifiant${id}`} defaultValue={identifiant}/></div>
                                <div className={`${styles.info}`}><input type="text" className={`${styles.infoInput}`} {...register(`password${id}`)} id={`password${id}`} defaultValue={password}/></div>
                            </div>
                            <div className={`${styles.line2}`}>
                                <div><textarea {...register(`description${id}`)} id={`description${id}`} defaultValue={description}/></div>
                                <div className={`${styles.categoryList}`}>
                                    {categoryData && categoryData.map((el, index) => {
                                        return (
                                            <label key={el.id}>
                                                <input 
                                                    type="checkbox" 
                                                    {...register(`category${id}`)} 
                                                    value={el.id} 
                                                    id={`${el.name}_${id}`} 
                                                    defaultChecked={isDefaultChecked(el.id)? true: false}
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
                        <button type="button" onClick={toggleEdit}><i className={`fa-regular fa-pen-to-square ${styles.modify}`}></i></button>
                        <button type="button" onClick={handleClickSupprimer}><i className={`fa-solid fa-trash ${styles.delete}`}></i></button>
                    </form>
                    
                )

                }


            </td>
        </tr>
    )
}

export default Motdepasse