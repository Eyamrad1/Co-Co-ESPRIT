import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterComponent } from './BackOffice/footer/footer.component';
import { DynamicContentComponent } from './BackOffice/dynamic-content/dynamic-content.component';
import { NavbarComponent } from './BackOffice/navbar/navbar.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { DynamicFrontComponent } from './FrontOffice/dynamic-front/dynamic-front.component';
import { AnnouncementCollocationComponent } from './Components/colocation/announcement-collocation/announcement-collocation.component';
import { CollocationBookingComponent } from './Components/colocation/collocation-booking/collocation-booking.component';
import { AllanncollComponent } from './Components/colocation/allanncoll/allanncoll.component';
import { AddanncollComponent } from './Components/colocation/addanncoll/addanncoll.component';
import { AddBookingcollComponent } from './Components/colocation/add-bookingcoll/add-bookingcoll.component';
import { AllBookingcollComponent } from './Components/colocation/all-bookingcoll/all-bookingcoll.component';
import { FavorisComponent } from './Components/colocation/favoris/favoris.component';
import { UpdateanncollComponent } from './Components/colocation/addanncoll/updateanncoll.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyanncollComponent } from './Components/colocation/myanncoll/myanncoll.component';
import { AnncollbookingComponent } from './Components/colocation/anncollbooking/anncollbooking.component';
import { AnncollarchiveComponent } from './Components/colocation/anncollarchive/anncollarchive.component';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from "@angular/common/http";
import { FeedbackComponent } from './Components/user/feedback/feedback.component';
import { AddCarpoolingComponent } from './Components/user/carpoolings/add-carpooling/add-carpooling.component';
import { DisplayallCarpoolingsComponent } from './Components/user/carpoolings/displayall-carpoolings/displayall-carpoolings.component';
import { AddBookingComponent } from './Components/user/Booking/add-booking/add-booking.component';
import { DisplayAllBookingComponent } from './Components/user/Booking/display-all-booking/display-all-booking.component';
import { UpdateCarpoolingComponent } from './Components/user/carpoolings/update-carpooling/update-carpooling.component';
import { DisplayAllCarpoolingsComponent } from './Components/admin/carpooling/display-all-carpoolings/display-all-carpoolings.component';
import { AdminDisplayAllBookingComponent } from './Components/admin/booking/admin-display-all-booking/admin-display-all-booking.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AllUsersComponent } from './Components/admin/all-users/all-users.component';
import { UpdateUserComponent } from './Components/admin/update-user/update-user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegisterComponent } from "./Components/user/register/register.component";
import { RouterModule } from "@angular/router";
import { VerificationComponent } from './Components/user/verification/verification.component';
import { NgOtpInputModule } from "ng-otp-input";
import {  RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ForgetPassComponent } from './Components/user/forget-pass/forget-pass.component';
import { ForgetpassloginComponent } from './Components/user/forgetpasslogin/forgetpasslogin.component';
import { AcountdetailsComponent } from './Components/user/acountdetails/acountdetails.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatSnackBarModule } from "@angular/material/snack-bar";
import {HomeFrontComponent} from "./FrontOffice/home-front/home-front.component";

import { AddPreferenceComponent } from './Components/user/preferences/add-preference/add-preference.component';
import { NotificationComponent } from './notification/notification.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {CollFeedbackComponent} from "./Components/Colocation/coll-feedback/coll-feedback.component";
import {DisplayAllFeedbacksComponent} from "./Components/admin/feedback/display-all-feedbacks/display-all-feedbacks.component";
import {EventDetailsComponent} from "./Components/user/event-details/event-details.component";
import {ReservationEventComponent} from "./Components/user/reservation-event/reservation-event.component";
import {PopupComponent} from "./Components/admin/popup/popup.component";
import {DisplayEvaluationComponent} from "./Components/admin/display-evaluation/display-evaluation.component";
import {AddEventComponent} from "./Components/admin/EventCrud/add-event/add-event.component";
import {DisplayEventComponent} from "./Components/admin/EventCrud/display-event/display-event.component";
import {UpdateEventComponent} from "./Components/admin/EventCrud/update-event/update-event.component";
import {AddEvaluationComponent} from "./Components/user/EvaluationCrud/add-evaluation/add-evaluation.component";
import {EventFrontComponent} from "./Components/user/event-front/event-front.component";
import { ShowProductComponent } from './Components/admin/product/show-product/show-product.component';
import { AddProductComponent } from './Components/admin/product/add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductComponent } from './Components/product/product.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
@NgModule({
    declarations: [
        AppComponent,
        AllTemplateBackComponent,
        AllTemplateFrontComponent,
        NavbarComponent,
        SidebarComponent,
        HomeBackComponent,
        HomeFrontComponent,
        FooterFrontComponent,
        FooterComponent,
        HeaderFrontComponent,
        DynamicFrontComponent,
        FeedbackComponent,
        AddCarpoolingComponent,
        DynamicContentComponent,
        AllUsersComponent,
        UpdateUserComponent,
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        ForgetPassComponent,
        ForgetpassloginComponent,
        AcountdetailsComponent,
        DashboardComponent,


        DisplayallCarpoolingsComponent,
        AddBookingComponent,
        DisplayAllBookingComponent,
        UpdateCarpoolingComponent,
        DisplayAllCarpoolingsComponent,
        AdminDisplayAllBookingComponent,
        AnnouncementCollocationComponent,
        CollocationBookingComponent,
        AllanncollComponent,
        AddanncollComponent,
        AddBookingcollComponent,
        AllBookingcollComponent,
        FavorisComponent,
        UpdateanncollComponent,
        MyanncollComponent,
        AnncollbookingComponent,
        AnncollarchiveComponent,
        CollFeedbackComponent,
        AddPreferenceComponent,
        NotificationComponent,
        DisplayAllFeedbacksComponent,
      EventDetailsComponent,
      ReservationEventComponent,
      PopupComponent,
      DisplayEvaluationComponent,
      AddEventComponent,
      DisplayEventComponent,
      UpdateEventComponent,
      AddEvaluationComponent,
      EventFrontComponent,
      ShowProductComponent,
      AddProductComponent,
      CartComponent,
      OrderComponent,
      PaymentComponent,
      ProductComponent,
      CheckoutComponent,
      UpdateProductComponent,
      ListOrdersComponent,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        ReactiveFormsModule,
        NgxCaptchaModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        NgOtpInputModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        MatIconModule,
        SlickCarouselModule,
        MatProgressSpinnerModule,
        NgxChartsModule,NgxPaginationModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}
