from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from database import Base


class MotdepasseCategory(Base):
    __tablename__ = "motdepasse_category"

    id = Column(Integer, primary_key=True)
    motdepasse_id = Column('motdepasse_id', Integer, ForeignKey('motdepasse.id', ondelete='CASCADE'))
    category_id = Column('category_id', Integer, ForeignKey('category.id', ondelete='CASCADE'))                        


class Motdepasse(Base):
    __tablename__ = "motdepasse"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    identifiant = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    description = Column(String(500))
    is_tested = Column(Boolean, default=False)
    category = relationship("Category", secondary="motdepasse_category")
    

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))

