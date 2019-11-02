import { Injectable } from '@angular/core';
import { AngularFirestore  } from 'angularfire2/firestore'
@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor( public db : AngularFirestore) { }
  getNdeshjet(data){

    return  this.db.collection('ndeshjet').doc('data').collection(data).snapshotChanges();
 }


}
