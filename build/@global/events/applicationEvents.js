"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEvents = void 0;
const events_1 = __importDefault(require("events"));
const sendRegisterationEmail_1 = require("../../features/email/sendRegisterationEmail");
const sendLoginEmail_1 = require("../../features/email/sendLoginEmail");
class AppEvents {
    constructor() {
        this.event = new events_1.default();
    }
    createListener(eventName, method) {
        this.event.on(eventName, method);
    }
    setUpAllListners() {
        // all eventListners are setup here
        this.createListener("registration-otp-email", sendRegisterationEmail_1.sendRegistrationEmail);
        this.createListener("login-otp-email", sendLoginEmail_1.sendLogInEmail);
    }
    emit(eventName, data) {
        this.event.emit(eventName, data);
    }
}
exports.AppEvents = AppEvents;
