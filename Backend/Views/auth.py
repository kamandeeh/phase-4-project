from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist
from werkzeug.security import check_password_hash
from datetime import datetime, timezone
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_cors import CORS  # Add this import

auth_bp = Blueprint("auth_bp", __name__)
# Configure CORS to allow credentials and specific origins
CORS(auth_bp, supports_credentials=True, origins=["http://localhost:5173"])  # Update with your frontend origin


# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Current user
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_data = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'is_admin': user.is_admin
    }

    return jsonify(user_data)

# Logout route (in Flask)
@auth_bp.route("/logout", methods=["DELETE"])  # Ensure DELETE method is used
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"success": "Logged out successfully"}), 200
