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
            'price': course.price,
            'image_url': course.image_url  # Consistent naming here
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
            'price': course.price,
            'image_url': course.image_url  # Consistent naming here
        }
        return jsonify(course_data), 200
    else:
        return jsonify({"error": "Course not found"}), 404


@course_bp.route('/courses', methods=['POST'])
def add_course():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    image_url = data.get('image_url')

    if not title or not description or not price or not image_url:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if course already exists
    check_title = Course.query.filter_by(title=title).first()
    if check_title:
        return jsonify({"error": "Course with this title already exists!"}), 406

    new_course = Course(title=title, description=description, price=price, image_url=image_url)
    db.session.add(new_course)
    db.session.commit()
    
    return jsonify({"success": "Course added successfully!"}), 201


@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    course = Course.query.get(course_id)
    if course:
        data = request.get_json()
        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)
        course.price = data.get('price', course.price)
        course.image_url = data.get('image_url', course.image_Url)

        db.session.commit()
        
        course_data = {
            'id': course.id,
            'title': course.title,
            'description': course.description,
            'price': course.price,
            'image_url': course.image_Url  # Consistent naming here
        }
        return jsonify(course_data), 200
    return jsonify({"error": "Course not found"}), 404


@course_bp.route('/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    course = Course.query.get(course_id)
    if course:
        db.session.delete(course)
        db.session.commit()
        return jsonify({"success": "Course deleted successfully"}), 200
    else:
        return jsonify({"error": "Course you're trying to delete doesn't exist!"}), 404
