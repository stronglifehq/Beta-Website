import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def insert_row(data):
    doc_ref = db.collection(u'items').add(data)
    print(f'Document added with ID: {doc_ref[1].id}')
