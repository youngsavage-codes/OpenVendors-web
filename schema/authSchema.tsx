import * as yup from "yup";

/* ---------------- REUSABLE FIELDS ---------------- */

const emailField = yup
  .string()
  .email("Enter a valid email address")
  .required("Email is required");

const strongPasswordField = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[@$!%*?&#]/, "Password must contain at least one special character");

const otpField = yup
  .string()
  .required("OTP is required")
  .matches(/^\d{6}$/, "OTP must be a 6-digit code");

const nameField = (label: string) =>
  yup
    .string()
    .required(`${label} is required`)
    .min(2, `${label} must be at least 2 characters`);

const phoneField = yup
  .string()
  .required("Phone number is required")
  .matches(
    /^\+\d{10,15}$/,
    "Phone number must be in international format (e.g. +2348012345678)"
  );

/* ---------------- SCHEMAS ---------------- */

export const signUpSchema = yup.object({
  email: emailField,
  password: strongPasswordField,
  firstName: nameField("First name"),
  lastName: nameField("Last name"),
  phone: phoneField,

  isAgreed: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms & Privacy Policy"),
});


export const verifyLoginEmailSchema = yup.object({
  email: emailField,
});

export const verifyLoginPasswordSchema = yup.object({
  password: strongPasswordField,
});

export const forgotPasswordSchema = yup.object({
  email: emailField,
});

export const resetPasswordSchema = yup.object({
  email: emailField,
  otp: otpField,
  newPassword: strongPasswordField.label("New password"),
});

export const verifyEmailSchema = yup.object({
  email: emailField,
  otp: otpField,
});