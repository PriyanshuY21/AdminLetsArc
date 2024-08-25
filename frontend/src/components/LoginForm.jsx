import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import axios from "../api/axios";
import { loginSchema } from "../schema";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate(); // To navigate programmatically
  const { handleUser } = useContext(AuthContext); // Accessing AuthContext to manage user state

  // Function to handle form submission
  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      // Sends login request to the server
      const response = await axios.post("/login", {
        ...values,
      });
      console.log(response.data);
      handleUser(response.data.user); // Updates user state with response
      localStorage.setItem("token", `Bearer ${response.data.token}`); // Stores JWT token in localStorage
      actions.resetForm(); // Resets form fields
      toast.success("Login successful!"); // Display success toast notification
      navigate("/letsarc"); // Navigates to Letsarc app upon successful login
    } catch (error) {
      toast.error(error.response.data.message); // Displays error toast notification
      console.log(error.response.data); // Logs error details
    }
  };

  // Formik for form state management, validation, and submission handling
  const {
    values,        // Current values of the form fields
    errors,        // Validation errors
    touched,       // Tracks if fields have been touched (blurred)
    isSubmitting,  // Indicates if form is in the process of being submitted
    handleBlur,    // Handles blur event for form fields
    handleChange,  // Handles change event for form fields
    handleSubmit,  // Handles form submission
  } = useFormik({
    initialValues: initialValues,          // Initial values of the form
    validationSchema: loginSchema,         // Validation schema for form validation
    onSubmit,                              // Function to call on form submission
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      {/* Email input field with validation */}
      <label
        htmlFor="email"
        className="flex flex-col gap-1 text-base font-semibold tracking-wide text-gray-800"
      >
        Email
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`h-12 w-72 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
            errors.email && touched.email ? "border-[#f66464]" : ""
          }`}
        />
        {/* Display validation error if email is invalid */}
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
      </label>
      
      {/* Password input field with validation */}
      <label
        htmlFor="password"
        className="flex flex-col gap-1 text-base font-semibold tracking-wide text-gray-800"
      >
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`h-12 w-72 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
            errors.password && touched.password ? "border-[#f66464]" : ""
          }`}
        />
        {/* Display validation error if password is invalid */}
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting} // Disables button while submitting
        className="h-12 w-full rounded-lg bg-blue1/90 text-lg font-semibold tracking-wider text-white hover:bg-blue1 disabled:opacity-85"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
