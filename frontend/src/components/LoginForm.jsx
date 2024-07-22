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
  const navigate = useNavigate();
  const { handleUser } = useContext(AuthContext);

  const onSubmit = async (values, actions) => {
    try {
      console.log(values);
      const response = await axios.post("/login", {
        ...values,
      });
      console.log(response.data);
      handleUser(response.data.user);
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      actions.resetForm();
      toast.success("Login successful!");
      navigate("/letsarc"); 
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
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
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
      </label>
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
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-blue1/90 text-lg font-semibold tracking-wider text-white hover:bg-blue1 disabled:opacity-85"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
