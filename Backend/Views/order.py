from flask import jsonify, request, Blueprint
from models import db, Order

order_bp = Blueprint("order_bp", __name__)
@order_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    # Manually create response data for orders
    response_data = []
    for order in orders:
        order_data = {
            'id': order.id,
            'user_id': order.user_id,
            'course_id': order.course_id,
            'status': order.status
        }
        response_data.append(order_data)

    return jsonify(response_data), 200


@order_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get(order_id)
    if order:
        order_data = {
            'id': order.id,
            'user_id': order.user_id,
            'course_id': order.course_id,
            'status': order.status
        }
        return jsonify(order_data), 200
    else:
        return jsonify({"error": "Order not found"}), 404


@order_bp.route('/order', methods=['POST'])
def add_order():
    data = request.get_json()
    user_id = data['user_id']
    course_id = data['course_id']
    order = Order.query.filter_by(user_id=user_id, course_id=course_id).first()

    if order:
        return jsonify({'error': 'Order already exists'}), 400

    new_order = Order(user_id=user_id, course_id=course_id)
    db.session.add(new_order)
    db.session.commit()
    
    order_data = {
        'id': new_order.id,
        'user_id': new_order.user_id,
        'course_id': new_order.course_id,
        'status': new_order.status
    }
    return jsonify(order_data), 201


@order_bp.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        if 'status' in data:
            order.status = data['status']
        if 'user_id' in data:
            order.user_id = data['user_id']
        if 'course_id' in data:
            order.course_id = data['course_id']

        db.session.commit()
        
        order_data = {
            'id': order.id,
            'user_id': order.user_id,
            'course_id': order.course_id,
            'status': order.status
        }
        return jsonify(order_data), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@order_bp.route('/order/<int:order_id>', methods=['DELETE'])
def delete_order_route(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    else:
        db.session.delete(order)
        db.session.commit()
        return jsonify({"success": "Order deleted successfully"}), 200


