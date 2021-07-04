import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - shoyld be 8 characters or longer")
      .matches(
        /^[a-zA-Z0-9._-]*$/,
        "Password can only contain alphabets, numbers , underscore, period and dash"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

// Exactly the same as Create user schema
export const editUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - shoyld be 8 characters or longer")
      .matches(
        /^[a-zA-Z0-9._-]*$/,
        "Password can only contain alphabets, numbers , underscore, period and dash"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
