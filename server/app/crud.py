from sqlalchemy.orm import Session
import models, schemas


def create_category(db: Session, category: schemas.CategoryBase):
    db_category = models.Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_category_by_id(db: Session, category_id: int):
    db_category = db.get(models.Category, category_id)
    return db_category


def get_category(db: Session):
    return db.query(models.Category).all()


def delete_category(db: Session, category: schemas.Category):
    db.delete(category)
    db.commit()
    return category


def put_category(db: Session, category: schemas.Category, new_category: schemas.Category):
    category.name = new_category.name
    db.commit()
    db.refresh(category)
    return category


def create_motdepasse(db: Session, motdepasse: schemas.MotdepasseBase):
    category = [get_category_by_id(db=db, category_id=cat.id) for cat in motdepasse.category]
    print(category)
    db_motdepasse = models.Motdepasse(
        name=motdepasse.name,
        identifiant=motdepasse.identifiant,
        password=motdepasse.password,
        description=motdepasse.description,
        is_tested=False,
        category= category
    )

    db.add(db_motdepasse)
    db.commit()
    db.refresh(db_motdepasse)
    return db_motdepasse


def get_motdepasse_by_id(db: Session, motdepasse_id: int):
    db_motdepasse = db.get(models.Motdepasse, motdepasse_id)
    return db_motdepasse


def get_motdepasse(db: Session):
    return db.query(models.Motdepasse).all()


def delete_motdepasse(db: Session, motdepasse: schemas.Motdepasse):
    db.delete(motdepasse)
    db.commit()
    return motdepasse


def put_motdepasse(db: Session, motdepasse: schemas.Motdepasse, new_motdepasse: schemas.Motdepasse):
    category = [get_category_by_id(db=db, category_id=cat.id) for cat in new_motdepasse.category]
    motdepasse.name=new_motdepasse.name
    motdepasse.identifiant=new_motdepasse.identifiant
    motdepasse.password=new_motdepasse.password
    motdepasse.description=new_motdepasse.description
    motdepasse.is_tested=new_motdepasse.is_tested
    motdepasse.category= category
    db.commit()
    db.refresh(motdepasse)
    return motdepasse


# def create_motdepasse_category(db: Session, motdepasse_id: int, category_id: int):
#     db_motdepasse_category = models.MotdepasseCategory(
#         motdepasse_id = motdepasse_id,
#         category_id = category_id
#     )
#     db.add(db_motdepasse_category)
#     db.commit()
#     db.refresh (db_motdepasse_category)
#     return db_motdepasse_category