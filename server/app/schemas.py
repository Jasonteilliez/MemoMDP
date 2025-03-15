from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True


class MotdepasseBase(BaseModel):
    name: str
    identifiant: str | None = None
    password: str | None = None
    description: str | None = None
    is_tested: bool = False
    category: list[Category] = []


class Motdepasse(MotdepasseBase):
    id: int

    class Config:
        orm_mode = True