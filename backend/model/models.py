from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(128))
    ocr_results = relationship("OCRResult", back_populates="owner")

class OCRResult(Base):
    __tablename__ = "ocr_results"
    id = Column(Integer, primary_key=True, index=True)
    image_data = Column(LargeBinary)
    image_filename = Column(String(255))
    text = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="ocr_results")
