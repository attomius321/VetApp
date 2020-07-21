import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {User} from "../../entities/user.model";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {auth} from "firebase";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
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
        this.toastr.success("Cont creat cu succes!");
        return result.user.updateProfile({
          displayName: name
        })
      }).catch(err => {
        this.toastr.error("Error: Adresa de email este deja utilizata!");
      });
  }

  async signIn(email, password){
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.toastr.success("Ati fost logat cu succes!")
    return this.updateUserData(credential.user) && this.router.navigate(['/appointments']);
  }

  async googleSignIn(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.toastr.success("Ati fost logat cu succes!")
    return this.updateUserData(credential.user) && this.router.navigate(['/appointments']);
  }

  async signOut() {
    await this.afAuth.signOut();
    this.toastr.warning("Ati fost delogat cu succes!")
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
