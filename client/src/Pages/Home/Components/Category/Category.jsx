import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styles from './Category.module.scss';

const Category = ({data, handleCheckboxChange, toggleCategory, handleModifyCategory, handleDeleteCategory}) => {
    const{id, name} = data;


    const yupSchema = yup.object({
        [`name${id}`]: yup
        .string()
        .required("Le champ est obligatoire")
        .min(2, "Le champ doit comporter 2 caractères")
        .max(20, "Le champ ne doit pas contenir plus de 12 caractères")
    });

    const defaultValues = {
        [`name${id}`]: name
    };

    const {
        register, 
        handleSubmit,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(yupSchema)
    });

    const submit = async (values) => {
        const sendData = {
            id,
            name: values[`name${id}`]
        }
        handleModifyCategory(sendData);
    }


    const handleClickSupprimer = () => {
        // Todo: Créer une popup de confirmation
        handleDeleteCategory(id);
    }


    return(

        <div className={`${styles.category}`}>
            {!toggleCategory && (
                <label>
                    <input type="checkbox" value={id} onChange={(event) => {handleCheckboxChange(event)}} className={`${styles.iCheckbox}`}/>
                    <p>{name}</p>
                </label>
            )}

            {toggleCategory && (
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" {...register(`name${id}`)} id={`name${id}`} className={`${styles.iText}`}/>
                    <button><i className={`fa-regular fa-pen-to-square ${styles.modify}`}></i></button>
                    <button type="button" onClick={handleClickSupprimer}><i className={`fa-solid fa-trash ${styles.delete}`}></i></button>
                </form>
            )}
        </div>

    )
}

export default Category