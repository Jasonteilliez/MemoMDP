import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './NewCategory.module.scss';

const NewCategory = ({handleAddCategory}) => {

    const yupSchema = yup.object({
        name: yup
        .string()
        .required("Le champ est obligatoire")
        .min(2, "Le champ doit comporter 2 caractères")
        .max(20, "Le champ ne doit pas contenir plus de 12 caractères")
    });

    const defaultValues = {
        name: ""
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
            name: values.name
        }
        handleAddCategory(sendData)
        reset()
    }

    return(
        <div className={`${styles.category}`}>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" {...register("name")} id="name" className={`${styles.iText}`}/>
                <button><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>
    )
}

export default NewCategory