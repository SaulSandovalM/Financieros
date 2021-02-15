import firebase from '../../../Firebase'

const db = firebase.firestore().collection('/fondos')

class FondosDataService {
  getAll () {
    return db
  }

  create (fondo) {
    return db.add(fondo)
  }

  update (id, value) {
    return db.doc(id).update(value)
  }

  delete (id) {
    return db.doc(id).delete()
  }
}

export default new FondosDataService()
