import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../../entities/user.model";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {auth} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ){
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signUp(name: string, email: string, password: string){
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        return result.user.updateProfile({
          displayName: name
        })
      }).catch(err => {
        console.log(err);
      });
  }

  async signIn(email, password){
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user) && this.router.navigate(['/appointments']);
  }

  async googleSignIn(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user) && this.router.navigate(['/appointments']);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/'])
  }

  private updateUserData({uid, email, displayName}: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName
    };

    return userRef.set(data, {merge: true});
  }
}
