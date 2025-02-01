from app import app
from models import Course,db

with app.app_context():
    print("Deleting data...")
    Course.query.delete()
   

    print("Creating restaurants...")
    easy = Course(title= "Introduction to Web Development",
      description="Learn the basics of web development, including HTML, CSS, and JavaScript. Start building your first website today!", price=10000,image_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdAdQnrVDOSNpvaWU3ZGrH5gfngFCGZimcQ&s")
    medium = Course(title="Advanced JavaScript",
      description="Take your JavaScript skills to the next level. Learn advanced concepts like closures, async programming, and more.",price=15499,image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn9W_ZoKrXymhaGRx0Wq1URlskW6FlR3XERQ&s")
    hard = Course( title= "React for Beginners",
      description="Dive into React, one of the most popular JavaScript libraries, and learn how to build modern web apps with it.",price=25000, image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5PvX_YaHnjn9HNzzf0MM32osx3PeSFrQl5A&s")
    course = [easy,medium,hard]
  
    db.session.add_all(course)
    db.session.commit()

    print("Seeding done!")
