from app import app
from models import Course,db

with app.app_context():
    print("Deleting data...")
    Course.query.delete()
   

    print("Creating restaurants...")
    easy = Course(title= "Introduction to Web Development",
      description="Learn the basics of web development, including HTML, CSS, and JavaScript. Start building your first website today!",)
    medium = Course(title="Advanced JavaScript",
      description="Take your JavaScript skills to the next level. Learn advanced concepts like closures, async programming, and more.",)
    hard = Course(name="Kiki's Pizza", address='address3')
    course = [easy,medium,hard]
  
    db.session.add_all(course)
    db.session.commit()

    print("Seeding done!")
