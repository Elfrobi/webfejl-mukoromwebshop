import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login(){
  this.loading = true;
  /*  this.loadingService.loadingWithPromise(this.email.value, this.password.value).then((_: boolean) =>{
      this.router.navigateByUrl('/main');
    }).catch(error =>{
      console.error(error, 'Incorrect email or password!');
    }).finally(() =>{
      console.log('This is executed finally.');
    });*/
   /* try{
      //then
    const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
    this.router.navigateByUrl('/main');
    //catch
    }catch(error){
      console.error(error, 'Incorrect email or password!');
    }
    //finally
    console.log('This is executed finally.');*/

    /*this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value, this.password.value)
    this.loadingSubscription = this.loadingObservation
    .subscribe(
    { 
      next: (data: boolean)=>{
      console.log(data);
      this.router.navigateByUrl('/shop');
    }, error: (error)=>{
      console.error(error);
      this.loading = false;
    }, complete: () => {
      console.log('finally');
      this.loading = false;
    }});*/

    this.authService.login(this.email.value, this.password.value).then(cred =>{
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error=>{
      console.error(error);
      this.loading = false;
    });
 }


 
 ngOnDestroy(){
  this.loadingSubscription?.unsubscribe();
}

}

  
