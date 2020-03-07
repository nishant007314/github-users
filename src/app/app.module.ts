import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppErrorHandler } from './common/app-error-handler';
import { GithubProfileService } from './github-profile.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { HomeComponent } from './home/home.component';
import { GithubFollowersComponent } from './github-followers/github-followers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubFollowersService } from './services/github-followers.service';
import { BaseRequestOptions } from '@angular/http';
import { RepoComponent } from './repo/repo.component';
import { SignupComponent } from './signup/signup.component';
import { FakeBackendProvider } from './helpers/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { AuthGaurd } from './services/auth-gaurd.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    GithubFollowersComponent,
    HomeComponent,
    GithubProfileComponent,
    NavbarComponent,
    NotFoundComponent,
    RepoComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    JwtModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'users/:username/followers',
        component: GithubFollowersComponent
      },
      {
        path: 'profile/:username',
        component: GithubProfileComponent,
        canActivate: [AuthGaurd]
      },
      {
        path: 'profile',
        component: GithubProfileComponent
      },
      {
        path: 'repos',
        component: RepoComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    GithubProfileService,
    GithubFollowersService,
    AuthGaurd,
    AdminAuthGuard,
    AuthService,
    FakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
