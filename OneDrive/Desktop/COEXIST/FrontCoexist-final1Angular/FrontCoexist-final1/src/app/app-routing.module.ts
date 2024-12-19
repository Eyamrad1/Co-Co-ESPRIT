import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from "./BackOffice/home-back/home-back.component";
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { HomeFrontComponent } from "./FrontOffice/home-front/home-front.component";
import { FeedbackComponent } from "./Components/user/feedback/feedback.component";
import { AddCarpoolingComponent } from "./Components/user/carpoolings/add-carpooling/add-carpooling.component";
import { DisplayallCarpoolingsComponent } from "./Components/user/carpoolings/displayall-carpoolings/displayall-carpoolings.component";
import { AddBookingComponent } from "./Components/user/Booking/add-booking/add-booking.component";
import { DisplayAllBookingComponent } from "./Components/user/Booking/display-all-booking/display-all-booking.component";
import { UpdateCarpoolingComponent } from "./Components/user/carpoolings/update-carpooling/update-carpooling.component";
import { DisplayAllCarpoolingsComponent } from "./Components/admin/carpooling/display-all-carpoolings/display-all-carpoolings.component";
import { AdminDisplayAllBookingComponent } from "./Components/admin/booking/admin-display-all-booking/admin-display-all-booking.component";
import { DisplayAllFeedbacksComponent } from "./Components/admin/feedback/display-all-feedbacks/display-all-feedbacks.component";
import { AllUsersComponent } from "./Components/admin/all-users/all-users.component";
import { RegisterComponent } from "./Components/user/register/register.component";
import { LoginComponent } from "./Components/user/login/login.component";
import { VerificationComponent } from "./Components/user/verification/verification.component";
import { ForgetPassComponent } from "./Components/user/forget-pass/forget-pass.component";
import { NavbarComponent } from "./BackOffice/navbar/navbar.component";
import { ForgetpassloginComponent } from "./Components/user/forgetpasslogin/forgetpasslogin.component";
import { AcountdetailsComponent } from "./Components/user/acountdetails/acountdetails.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AllanncollComponent } from "./Components/colocation/allanncoll/allanncoll.component";
import { AddanncollComponent } from "./Components/colocation/addanncoll/addanncoll.component";
import { AddBookingcollComponent } from "./Components/colocation/add-bookingcoll/add-bookingcoll.component";
import { AllBookingcollComponent } from "./Components/colocation/all-bookingcoll/all-bookingcoll.component";
import { FavorisComponent } from './Components/colocation/favoris/favoris.component';
import { UpdateanncollComponent } from './Components/colocation/addanncoll/updateanncoll.component';
import { MyanncollComponent } from './Components/colocation/myanncoll/myanncoll.component';
import { AnncollbookingComponent } from './Components/colocation/anncollbooking/anncollbooking.component';
import { AnncollarchiveComponent } from './Components/colocation/anncollarchive/anncollarchive.component';
import { AnnouncementCollocationComponent } from './Components/colocation/announcement-collocation/announcement-collocation.component';
import {AddPreferenceComponent} from "./Components/user/preferences/add-preference/add-preference.component";
import {NotificationComponent} from "./notification/notification.component";
import {CollFeedbackComponent} from "./Components/Colocation/coll-feedback/coll-feedback.component";
import {EventFrontComponent} from "./Components/user/event-front/event-front.component";
import {EventDetailsComponent} from "./Components/user/event-details/event-details.component";
import {DisplayEvaluationComponent} from "./Components/admin/display-evaluation/display-evaluation.component";
import {ReservationEventComponent} from "./Components/user/reservation-event/reservation-event.component";
import {DisplayEventComponent} from "./Components/admin/EventCrud/display-event/display-event.component";
import {PopupComponent} from "./Components/admin/popup/popup.component";
import {AddEventComponent} from "./Components/admin/EventCrud/add-event/add-event.component";
import {AddEvaluationComponent} from "./Components/user/EvaluationCrud/add-evaluation/add-evaluation.component";
import {UpdateEventComponent} from "./Components/admin/EventCrud/update-event/update-event.component";
import {ShowProductComponent} from "./Components/admin/product/show-product/show-product.component";
import {AddProductComponent} from "./Components/admin/product/add-product/add-product.component";
import {ProductComponent} from "./Components/product/product.component";
import {CheckoutComponent} from "./Components/checkout/checkout.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {ListOrdersComponent} from "./list-orders/list-orders.component";
import {OrderComponent} from "./order/order.component";
import {PaymentComponent} from "./payment/payment.component";


const routes: Routes = [
  {
    path: "notificationss",
    component:NotificationComponent
  },
  {
   path: "addPrefernce",
  component:AddPreferenceComponent
  },
  {
    path: "addFeedback",
    component: FeedbackComponent
  },
  { path: 'detailUser', component: AcountdetailsComponent },
  { path: "HomeAdmin", component: HomeBackComponent },
  {
    path: "user", component: AllTemplateFrontComponent,
    children: [
      { path: "home", component: HomeFrontComponent },
      { path: "authenticate", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "verification", component: VerificationComponent },
      { path: 'resetpassword', component: ForgetPassComponent },
      { path: 'logout', component: NavbarComponent },
      { path: 'forgetpassword', component: ForgetpassloginComponent },
      { path: 'events', component: EventFrontComponent },
      { path: 'details/:eventId', component: EventDetailsComponent },


      { path: 'reservation/:eventId', component: ReservationEventComponent },


      {
        path: "allfeedback",
        component: DisplayAllFeedbacksComponent
      },
    ]
  },
  {
    path: "", component: AllTemplateFrontComponent,
    children: [
      { path: 'checkout', component: CheckoutComponent },
      { path: 'product', component: ProductComponent },

      {
        path: "home",
        component: HomeFrontComponent, children: []
      },
      {
        path: "addColl",
        component: AddanncollComponent
      },
      {
        path: "updateColl/:id",
        component: UpdateanncollComponent
      },
      {
        path: "annColl",
        component: AllanncollComponent
      },
      {
        path: "annColl/:id",
        component: AnnouncementCollocationComponent
      },
      {
        path: "myAnnColl",
        component: MyanncollComponent
      },
      {
        path: "anncollarchive",
        component: AnncollarchiveComponent
      },
      {
        path: "coll-feedback/:id",
        component: CollFeedbackComponent
      },
      {
        path: "anncollbooking/:id",
        component: AnncollbookingComponent
      }, {
        path: "carpooling/:carpoolingID", component: UpdateCarpoolingComponent
      },
      {
        path: "anncollbooking/:id",
        component: AnncollbookingComponent
      },
      {
        path: "addBooColl/:id",
        component: AddBookingcollComponent
      },
      {
        path: "booColl",
        component: AllBookingcollComponent
      },
      {
        path: "favoris",
        component: FavorisComponent
      }
    ]
  },
  {
    path: "admin", component: AllTemplateBackComponent,
    children: [
      { path: 'show', component: ShowProductComponent },
      { path: 'addP', component: AddProductComponent },
      { path: 'updateP', component: UpdateProductComponent },
      { path: 'listOrder', component: ListOrdersComponent },

      {path: "home", component: HomeBackComponent},
      {path: "getAllUsers", component: AllUsersComponent},
      { path: 'display-evaluation', component: DisplayEvaluationComponent },
      {
        path: "allCarpiilingsAdmin",
        component: DisplayAllCarpoolingsComponent,
      },
      { path: 'display-event', component: DisplayEventComponent },
      { path: 'Graph', component: PopupComponent },

      {
        path: "AdminBooking",
        component: AdminDisplayAllBookingComponent,
      },{
            path: "allfeedback",
            component: DisplayAllFeedbacksComponent
        }
    ]
  },
  {
    path: "displayCarpooling",
    component: DisplayallCarpoolingsComponent, children: [
      {
        path: "addBooking",
        component: AddBookingComponent
      },
    ]
  },
  { path: "addCar", component: AddCarpoolingComponent },
  { path: "allBooking", component: DisplayAllBookingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'update-event/:id', component: UpdateEventComponent },
  { path: 'add-evaluation/:eventId', component: AddEvaluationComponent },

  { path: 'add-event', component: AddEventComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'payment', component: PaymentComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
