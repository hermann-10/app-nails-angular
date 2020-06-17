import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IReservation } from '../models/IReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private afs: AngularFirestore) {}

  readReservation() {
    return this.afs.collection<IReservation>('table-reservation', (ref) =>
      ref.orderBy('date', 'asc')
    );
  }

  createReservation( name, type, employe, date, heure) {
    return this.afs
      .collection('table-reservation')
      .add({ name, type, employe, date, heure });
  }

  //Update reservation
  updateReservationt(reservation) {
    return this.afs.doc(`table-reservation/${reservation.id}`).update({
      ...reservation,
      name: reservation.name,
      type : reservation.type,
      employe: reservation.employe,
      date: reservation.date,
      heure: reservation.heure
    });
  }

  

  deleteReservation(reservation) {
    return this.afs
      .doc<IReservation>(`table-reservation/${reservation.id}`)
      .delete();
  }
}
