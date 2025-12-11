from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
app.config['JWT_SECRET_KEY'] = 'My_SecretKey'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)
class User(db.Model):
    Name=db.Column(db.String(50), nullable=False)
    Email=db.Column(db.String(50), nullable=False,primary_key=True)
    Password=db.Column(db.String(50), nullable=False)

    def to_dict(self) :
        return {'Name': self.Name, 'Email': self.Email, 'Password': self.Password}
    with app.app_context():
        db.create_all()

class Employee(db.Model):
    eid = db.Column(db.String(50), primary_key=True)
    ename = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    city = db.Column(db.String(100), nullable=False)


    def to_dict(self):
        return {
            "eid": self.eid,
            "ename": self.ename,
            "email": self.email,
            "city": self.city
        }

with app.app_context():
    db.create_all()


@app.route('/employees', methods=['POST'])
def create_employee():
    data = request.get_json()
    eid = data.get('eid')
    ename = data.get('ename')
    email = data.get('email')
    city = data.get('city')

    if not all([eid, ename, email, city]):
        return jsonify({"error": "All fields (eid, ename, email, city) are required"}), 400


    if Employee.query.get(eid):
        return jsonify({"error": "Employee ID already exists"}), 400

    new_emp = Employee(eid=eid, ename=ename, email=email, city=city)
    db.session.add(new_emp)
    db.session.commit()

    return jsonify(new_emp.to_dict()), 201

@app.route('/employees', methods=['GET'])
def get_employees():
    employees = Employee.query.all()
    return jsonify([e.to_dict() for e in employees]), 200


@app.route('/employees/<string:eid>', methods=['GET'])
def get_employee(eid):
    employee = Employee.query.get(eid)
    if employee:
        return jsonify(employee.to_dict()), 200
    return jsonify({"error": "Employee not found"}), 404

@app.route('/employees/<string:eid>', methods=['PUT'])
def update_employee(eid):
    employee = Employee.query.get(eid)
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    data = request.get_json()
    employee.ename = data.get('ename', employee.ename)
    employee.email = data.get('email', employee.email)
    employee.city = data.get('city', employee.city)

    db.session.commit()
    return jsonify(employee.to_dict()), 200

@app.route('/employees/<string:eid>', methods=['DELETE'])
def delete_employee(eid):
    employee = Employee.query.get(eid)
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    db.session.delete(employee)
    db.session.commit()
    return jsonify({"message": f"Employee {eid} deleted successfully"}), 200

@app.route('/employee/signup', methods=['POST'])
def signup():
    data = request.get_json()
    Ename = data.get('Ename')
    email = data.get('email')
    password = data.get('password')
    if not all([Ename, email, password]):
        return jsonify({"error": "All fields (Ename, email, password) are required"}), 400
    if User.query.filter_by(Email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    user = User(Name=Ename, Email=email, Password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@app.route('/employee/signin', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not all([email, password]):
        return jsonify({"error": "All fields (email, password) are required"}), 400
    user = User.query.filter_by(Email=email).first()
    if not user:
        return jsonify({"error": "Invalid Credentials"}), 404
    access_token = create_access_token(
        identity=email,
        expires_delta=datetime.timedelta(hours=1)
    )
    return jsonify(access_token=access_token), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"msg": f"Hello {current_user}, this is a protected route!"})

if __name__ == '__main__':
    app.run(debug=True)

