import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
// import { MoveNextByMaxLengthDirective } from 'app/common/ui/directives/move-next-by-max-length.directive';
import { DatePipe } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SharedModule } from 'app/common/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
//import { IdentityService } from 'app/api';
// import { BASE_PATH, IdentityService } from 'app/api/sidc-services/identity';
import { environment } from 'environments/environment';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'auth' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { animation: 'auth' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { animation: 'auth' }
  },
  {
    path: 'otp',
    component: OtpComponent,
    data: { animation: 'auth' }
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
];


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    OtpComponent,
    // MoveNextByMaxLengthDirective,
    ResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCommonModule,
    NgxMaskModule.forRoot(),
    Ng2FlatpickrModule,
    SharedModule,
    NgSelectModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
  ],
})
export class AuthModule { }
