import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";


export class HttpHeadersOption {
  public static httpOptionsWithObserve = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.API_URL,
    }),
    observe: 'response',
  };

  public static httpHeaderOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.API_URL,
    }),
  };
  public static httpHeaderOptionsForMockBaService = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.API_URL,
    }),
    withCredentials: true,
  };
  public static httpHeaderOptionsOnlyCredentials = {};
}

export class UrlPath {
  public static SignIn = 'auth/signin';
  public static SignUp = 'auth/signup';
  public static PublicContent = 'all';
  public static GetUserBoard = 'user';
  public static GetModBoard = 'mod';
  public static GetAdminBoard = 'admin';
}

export class RoutingKeys {
  public static HomePage = '/';
  public static PendingApproval = '/account/pending-approval';
  public static Dashboard = 'dashboard';
  public static Login = 'login';
  public static SignUp = 'sign-up';
  public static VerifyUser = 'signup-verified';
  public static SignupSuccess = '/signup-success';
  public static Users = 'users';
  public static Access = 'access';
  public static EditPlaces = 'places/place-edit/';
  public static AddPlaces = 'place-submit';
  public static Place = 'place';
  public static MessageSubmit = 'messages/message-submit';
  public static Messages = 'messages/';
  public static AppSubmit = 'app-submit/';
  public static ResetPassword = 'reset-password';
}

export class SnackbarMessage {
  public static GoLive = 'Message is now ';
  public static PausedMessage = 'Message is paused';
  public static BroadcastMessage = 'Broadcast successfully';
  public static ResendMail = 'Mail sent successfully';
  public static ModelTrained = 'Model Trained Successfuly';
  public static SomethingWentWrong = 'Something Went wrong';
  public static TestNotification = 'Test notification send successfully';
  public static TestNotificationB = 'Test notification B send successfully';
  public static TokenExpired = 'Token is expired';
  public static TokenIsNotTied = 'Token is not tied to a user';
  public static UserAlreadyVerified = 'User is already verified';
  public static UserAdded = 'User added successfully';
  public static UserDeleted = 'User successfully removed from app';
  public static AppAdded = 'App added successfully';
  public static AppNameUpdated = 'App name updated successfully';
  public static SavedChanges = 'Saved changes successfully';
  public static UpdateRole = 'Role updated successfully';
  public static UpdateMe = 'Profile updated successfully';
  public static ScheduleAlreadyExists = 'Schedule is already exists';
  public static DeletePaymentMethod = 'Delete Payment Method';
  public static ConfirmPlanSwitch = 'Plan Changed';
  public static SavePlace = 'Place Saved';
  public static UpdateMYDetails = 'My Details Updated';
}

export class DefaultDate {
  public static MIN = new Date('1900/01/01');
  public static MAX = new Date('2099/11/31');
}

const PaymentDetails = [
  'Study Management',
  'eRegulatory (DOA + eISF)',
  'eSource',
  'Visit Scheduling',
  'Subject Communications',
  'Finance (budgets + invoices)',
  'Remote Monitoring',
  'Training Management',
  'Credential Management',
  'Mobile App',
  'Dedicated Database on Goolge Cloud',
  'Custom Web Link for Your Davesa Cloud',
  'Free Virtual Training Hours<br/><span class="sm-pd">(additional training - $175/ hr)</span>',
  'Free Studies Created<br/><span class="sm-pd">(addtional studies created - $7,500/ study)</span>',
  'Davesa iPads<br/><span class="sm-pd">(additional iPads - $1,500/ iPad)</span>',
];

export const PaymentPlans = [
  {
    type: 'Solo PI',
    seats: 2,
    seatsText: '1-2 Seats',
    price: '$500',
    details: PaymentDetails.slice(0, 3),
    allDetails: PaymentDetails,
  },
  {
    type: 'Small Site',
    seats: 5,
    seatsText: 'Up to 5 Seats',
    price: '$2,200',
    details: PaymentDetails.slice(0, 3),
    allDetails: PaymentDetails,
  },
  {
    type: 'Standard Site',
    seats: 10,
    seatsText: 'Up to 10 Seats',
    price: '$4,000',
    details: PaymentDetails.slice(0, 3),
    allDetails: PaymentDetails,
  },
  {
    type: 'Enterprise',
    seats: null,
    seatsText: '20+ Seats',
    price: 'Contact us for a Quote',
    details: PaymentDetails.slice(0, 3),
    allDetails: PaymentDetails,
  }
];
