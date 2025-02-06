from flask import jsonify, request,Blueprint,g
from models import db, User
from werkzeug.security import generate_password_hash

user_bp = Blueprint("user_bp", __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        # Fetch all users from the database
        users = User.query.all()

        # Manually create response data
        response_data = []
        for user in users:
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin,  # Add is_admin to response
                'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            response_data.append(user_data)

        return jsonify(response_data), 200
    except Exception as e:
        user_bp.logger.error(f"Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error', 'details': str(e)}), 500


@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,  # Include is_admin
            'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        return jsonify(user_data)
    return jsonify({"error": "User not found"}), 404


@user_bp.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()

    try:
        username = data['username']
        email = data['email']
        password = data['password']  # Use the raw password, not 'password_hash'
        is_admin = data.get('is_admin', False)  # Default to False if not provided

        # Check for existing username or email
        check_username = User.query.filter_by(username=username).first()
        check_email = User.query.filter_by(email=email).first()

        if check_username or check_email:
            return jsonify({"error": "Username/email exists"}), 406

        # Hash the raw password
        password_hash = generate_password_hash(password)

        # Create a new user
        new_user = User(username=username, email=email, password_hash=password_hash, is_admin=is_admin)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"success": "Added successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


@user_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    current_user = g.current_user  # Assuming you have a way to get the current logged-in user
    
    if not current_user.is_admin:
        return jsonify({"error": "Permission denied"}), 403

    if user:
        data = request.get_json()
        if 'username' in data:
            user.username = data['username']
        if 'email' in data:
            user.email = data['email']
        if 'password_hash' in data:
            user.password_hash = data['password_hash']
        if 'is_admin' in data:  # Admin can update this field
            user.is_admin = data['is_admin']
        db.session.commit()
        # Manually construct the updated user data
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,
            'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        return jsonify(user_data)
    return jsonify({"error": "User not found"}), 404


@user_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    return jsonify({"error": "User not found"}), 404