from flask import request, jsonify
from config import app, db
from models import Contact

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts}), 200

@app.route("/create_contact", method=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email") 

    if not first_name or not last_name or not email:
        return(
            jsonify({"message": "Add all details."}),400,
        )
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":ste(e)}), 400
    
    return jsonify({"message": "User created!"}), 201

@app.route("/update_contact/<int:id>", methods=["PUT"])
def update_contact(id):
    contact = Contact.query.get(id)

    if not contact:
        return jsonify({"message": "Contact not found."}), 404

    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()
    return jsonify({"message": "Contact updated."}), 200



@app.route("/delete_contact/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "Contact not found."}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "Contact deleted."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)