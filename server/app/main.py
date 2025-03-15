from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try :
        yield db
    finally :
        db.close()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "there is nothing here to see."}


@app.get("/category", response_model=list[schemas.Category])
async def get_category(db: Session = Depends(get_db)):
    return crud.get_category(db=db)


@app.post("/category", response_model=schemas.Category)
async def create_category(category: schemas.CategoryBase, db: Session = Depends(get_db)):
    return crud.create_category(db=db, category=category)


@app.delete("/category/{id}", response_model=schemas.Category)
async def delete_category(id: int, db: Session = Depends(get_db)):
    db_category = crud.get_category_by_id(db=db, category_id=id)
    if not db_category:
        raise HTTPException(status_code=404, detail="category not found")
    return crud.delete_category(db=db, category=db_category)


@app.put("/category", response_model=schemas.Category)
async def put_category(category: schemas.Category, db: Session = Depends(get_db)):
    db_category = crud.get_category_by_id(db=db, category_id=category.id)
    if not db_category:
        raise HTTPException(status_code=404, detail="category not found")
    return crud.put_category(db=db, category=db_category, new_category=category)
    

@app.get("/motdepasse", response_model=list[schemas.Motdepasse])
async def get_motdepasse(db: Session = Depends(get_db)):
    return crud.get_motdepasse(db=db)


@app.post("/motdepasse", response_model=schemas.Motdepasse)
async def create_motdepasse(motdepasse: schemas.MotdepasseBase, db: Session = Depends(get_db)):
    if motdepasse.category:
        for cat in motdepasse.category:
            r = crud.get_category_by_id(db=db, category_id=cat.id)
            if not r:
                raise HTTPException(status_code=404, detail="category not found")   
    return crud.create_motdepasse(db=db, motdepasse=motdepasse)


@app.delete("/motdepasse/{id}", response_model=schemas.Motdepasse)
async def delete_motdepasse(id: int, db: Session = Depends(get_db)):
    db_motdepasse = crud.get_motdepasse_by_id(db=db, motdepasse_id=id)
    if not db_motdepasse:
        raise HTTPException(status_code=404, detail="motdepasse not found")
    return crud.delete_motdepasse(db=db, motdepasse=db_motdepasse)


@app.put("/motdepasse", response_model=schemas.Motdepasse)
async def put_motdepasse(motdepasse:schemas.Motdepasse, db: Session = Depends(get_db)):
        if motdepasse.category:
            for cat in motdepasse.category:
                r = crud.get_category_by_id(db=db, category_id=cat.id)
                if not r:
                    raise HTTPException(status_code=404, detail="category not found")
        db_motdepasse = crud.get_motdepasse_by_id(db=db, motdepasse_id=motdepasse.id)
        if not db_motdepasse:
            raise HTTPException(status_code=404, detail="motdepasse not found")
        return crud.put_motdepasse(db=db, motdepasse=db_motdepasse, new_motdepasse=motdepasse)