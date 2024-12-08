import Event from "events";
import { RegistrationOtpEmailI, sendRegistrationEmail } from "../../features/email/sendRegisterationEmail";
import { LoginOtpEmailI, sendLogInEmail } from "../../features/email/sendLoginEmail";

type EventName = {
  "login-otp-email": LoginOtpEmailI;
  "registration-otp-email": RegistrationOtpEmailI;
};

export class AppEvents {
  private event = new Event();

  private createListener(eventName: string, method: any) {
    this.event.on(eventName, method);
  }

  setUpAllListners() {
    // all eventListners are setup here
    this.createListener("registration-otp-email", sendRegistrationEmail);
    this.createListener("login-otp-email", sendLogInEmail);
  }

  emit<T extends keyof EventName>(eventName: T, data: EventName[T]) {
    this.event.emit(eventName, data);
  }
}
