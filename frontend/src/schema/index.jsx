import * as yup from "yup";

// const passwordRules8 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// password rule for 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

// const passwordRules5 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const phoneRules = /^\d{10}$/;

const emailRules = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// export const registerSchema = yup.object().shape({
//   first_name: yup.string().min(3).required("Required"),
//   last_name: yup.string().min(3).required("Required"),
//   org_name: yup.string().required("Required"),
//   email: yup
//     .string()
//     .matches(emailRules, "Please enter a valid email")
//     .required("Required"),
//   phone_number: yup
//     .string()
//     .matches(phoneRules, "Please enter a valid phone number")
//     .required("Required"),

//   //   age: yup.number().positive().integer().required("Required"),
//   //   password: yup
//   //     .string()
//   //     .min(5)
//   //     .matches(passwordRules, { message: "Please create a stronger password" })
//   //     .required("Required"),
//   //   confirmPassword: yup
//   //     .string()
//   //     .oneOf([yup.ref("password"), null], "Passwords must match")
//   //     .required("Required"),
// });

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRules, "Please enter a valid email")
    .required("Required"),
  password: yup.string().required("Required"),
});

export const newVideoSchema = yup.object().shape({
  video_title: yup.string().required("Required"),
});
