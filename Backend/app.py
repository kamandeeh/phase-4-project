from flask import Flask
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://phase_4_project_vwxq_user:k7G4gdncXZ9DMRyJPIG3l3Dg4WUq2lTS@dpg-cuf0sld6l47c73f8q9cg-a.oregon-postgres.render.com/phase_4_project_vwxq'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)
CORS(app)

# jwt
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "uhdhfjhfjksddjhdyd")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(hours=1)
jwt = JWTManager(app)
jwt.init_app(app)

from Views import *

app.register_blueprint(user_bp)
app.register_blueprint(course_bp)
app.register_blueprint(order_bp)
app.register_blueprint(auth_bp)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

if __name__ == '__main__':
    app.run(debug=True, port=5000)

