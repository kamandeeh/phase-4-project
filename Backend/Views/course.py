from flask import jsonify, request, Blueprint
from models import db, Course

course_bp = Blueprint("course_bp", __name__)

@course_bp.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    # Manually create response data for courses
    response_data = []
    for course in courses:
        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'price': course.price
        }
        response_data.append(course_data)
    
    return jsonify(response_data), 200


@course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get(course_id)
    if course:
        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'price': course.price
        }
        return jsonify(course_data), 200
    else:
        return jsonify({"error": "Course not found"}), 404


@course_bp.route('/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    title = data['title']
    description = data['description']
    price = data['price']

    check_title = Course.query.filter_by(title=title).first()
    check_description = Course.query.filter_by(description=description).first()

    if check_title or check_description:
        return jsonify({"error": "Course already exists!"}), 406
    else:
        new_course = Course(title=title, description=description, price=price)
        db.session.add(new_course)
        db.session.commit()
        return jsonify({"success": "Course added successfully!"}), 201


@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = Course.query.get(course_id)
    if course:
        data = request.get_json()
        course.title = data['title']
        course.description = data['description']
        course.price = data['price']
        db.session.commit()
        
        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'price': course.price
        }
        return jsonify(course_data), 200
    return jsonify({"error": "Course not found"}), 404


@course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return jsonify({"success": "Deleted successfully"}), 200
    else:
        return jsonify({"error": "Course you're trying to delete doesn't exist!"}), 404