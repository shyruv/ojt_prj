import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MemberRoutingModule } from "./members-routing.module";
import { MemberComponent } from "./member.component";
import { MemberFormComponent } from "./member-form/member-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CoreTouchspinModule } from "@core/components/core-touchspin/core-touchspin.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MembersService } from "app/api";
import { SharedModule } from "app/common/shared/shared.module";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { FormsModule } from "@angular/forms";
import { CoreDirectivesModule } from "@core/directives/directives";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxMaskModule } from "ngx-mask";
import { NgxPatternModule } from "ngx-pattern";
import { PersonalInfoComponent } from './member-form/personal-info/personal-info.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [MemberComponent, MemberFormComponent,
     PersonalInfoComponent, DateTimeComponent, MeetingRoomComponent, ReviewComponent],
  imports: [
    NgxDatatableModule,
    CommonModule,
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    MemberRoutingModule,
    SharedModule,
    Ng2FlatpickrModule,
    FormsModule,
    CoreDirectivesModule,
    NgSelectModule,
    NgxPatternModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [MembersService, DatePipe],
})
export class MembersModule {}
