import { useEffect, useState } from "react";
import { deleteCategory, getCategory, postCategory, putCategory } from "../../api/category";
import { deleteMotdepasse, getMotdepasse, postModepasse, putMotdepasse } from "../../api/motdepasse";
import styles from './Home.module.scss';
import Motdepasse from "./Components/Motdepasse/Motdepasse";
import Category from "./Components/Category/Category";
import NewCategory from "./Components/NewCategory/NewCategory";
import NewMotdepasse from "./Components/NewMotdepasse/NewMotdepasse";

const Home = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCategory, setSelectedCatagory] = useState([]);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [motdepasseData, setMotdepasseData] = useState(null);
  const [filter, setFilter] = useState("");
  const [toggleModepasse, setToggleModepasse] = useState(false);

  useEffect(()=> {
    getcategoryData();
    getMotdepasseData();
  }, [])

  const getcategoryData = async () => {
    const response = await getCategory()
    if (response.succes) {
      setCategoryData(response.data)
    }
    return;
  }

  const getMotdepasseData = async () => {
    const response = await getMotdepasse()
    if (response.succes) {
      setMotdepasseData(response.data)
    }
    return;
  }

  const handleInput = (e) => {
    const search = e.target.value;
    setFilter(search.trim().toLowerCase());
  }

  const handleCheckboxChange = (event) => {
    const checkId = event.target.value;
    if (event.target.checked) {
      setSelectedCatagory([...selectedCategory, checkId])
    } else {
      setSelectedCatagory(selectedCategory.filter((id) => id !== checkId))
    }
  }

  const isSelected = (mdp) => {
    if (selectedCategory.length == 0) {
      return true;
    }

    let cats = []
    for (const cat of mdp.category) {
      for (const selectedCat of selectedCategory) {
        if (selectedCat == cat.id) {
          return true
        }
      }
    } 
    return false
  }

  const handleToggleCategory = () => {
    setSelectedCatagory([]);
    setToggleCategory(!toggleCategory);
  }

  const handleModifyCategory = async (data) => {
    try {
      const response = await putCategory(data);
      if (response.succes) {
        console.log("success")
        getcategoryData();
        getMotdepasseData();
      }
      throw new Error("Erreur modifier categorie")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  const handleDeleteCategory = async (data) => {
    try {
      const response = await deleteCategory(data);
      if (response.succes) {
        console.log("success")
        getcategoryData();
        getMotdepasseData();
      }
      throw new Error("Erreur supprimer categorie")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  const handleAddCategory = async (data) => {
    try {
      const response = await postCategory(data);
      if (response.succes) {
        console.log("success")
        getcategoryData();
      }
      throw new Error("Erreur add categorie")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  const handleModifyMotdepasse = async (data) => {
    try {
      const response = await putMotdepasse(data);
      if (response.succes) {
        console.log("success")
        getMotdepasseData();
      }
      throw new Error("Erreur modifier Motdepasse")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  const handleToggleMotdepasse = () => {
    setToggleModepasse(!toggleModepasse)
  }

  const handleAddMotdepasse = async (data) => {
    try {
      const response = await postModepasse(data);
      if (response.succes) {
        console.log("success")
        getMotdepasseData();
      }
      throw new Error("Erreur add motdepasse")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  const handleDeleteMotdepasse = async (data) => {
    try {
      const response = await deleteMotdepasse(data);
      if (response.succes) {
        console.log("success")
        getMotdepasseData();
      }
      throw new Error("Erreur supprimer motdepasse")
    } catch (error) {
      console.log("Une erreur est survenue, veuillez réessayer ulterieurement.");
    }
  }

  return (
    <>
      <section className={`${styles.search}`}>
        <input onInput={handleInput} type="text" placeholder="Search..." />
      </section>

      <section className={`${styles.category}`}>
        <div className={`${styles.title}`}>
          <p>Catégories :</p>
          <button type="button" onClick={handleToggleCategory}><i className="fa-solid fa-gear"></i></button>
        </div>
        <div className={`${styles.categoryList}`}>
          {categoryData && categoryData.map(
            (cat, index) => {
              return (
              <Category 
              key={cat.id} 
              data={cat} 
              handleCheckboxChange={handleCheckboxChange}
              toggleCategory={toggleCategory}
              handleModifyCategory={handleModifyCategory}
              handleDeleteCategory={handleDeleteCategory}
              />
              )
            }
          )}
          {toggleCategory && (
            <NewCategory handleAddCategory={handleAddCategory}/>
          )}
        </div>


      </section>

      <section className={`${styles.motdepasse}`}>
        <div className={`${styles.title}`}>
          <p>Mot de passe :</p>
        </div>
        <table className={`${styles.motdepasseList}`}>
          <tbody>
          {motdepasseData && motdepasseData
            .filter(isSelected)
            .filter(motdepasseData => motdepasseData.name.toLowerCase().includes(filter))
            .map(
            (mdp, index) => {
              return (
                <Motdepasse 
                key={mdp.id} 
                data={mdp} 
                categoryData={categoryData}
                handleModifyMotdepasse={handleModifyMotdepasse}
                handleDeleteMotdepasse={handleDeleteMotdepasse}
                />
              )
            }
          )}
          {toggleModepasse && (
            <NewMotdepasse 
              categoryData={categoryData}
              handleAddMotdepasse={handleAddMotdepasse}
            />
          )}
          </tbody>
        </table>
        
        <div className={`${styles.addMotdepasse}`}>
          <button onClick={handleToggleMotdepasse}>
            {!toggleModepasse && (
              <i className="fa-solid fa-plus"></i>
            )}
            {toggleModepasse && (
              <i className="fa-solid fa-minus"></i>
            )}
          </button>
        </div>
      </section>
    </>
  )
}

export default Home;