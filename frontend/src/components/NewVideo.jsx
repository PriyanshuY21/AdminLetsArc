import { useFormik } from "formik";
import { Modal } from "../components";
import { newVideoSchema } from "../schema";
import toast from "react-hot-toast";
import axios from "../api/axios";

const initialValues = {
  video_title: "",
};

const NewVideo = ({ addProject, handleModalClose, handleSetVideoAdded }) => {
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "/create-video",
        {
          video_title: values.video_title,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      );
      console.log(response.data);
      handleSetVideoAdded();
      actions.resetForm();
      handleModalClose();

      toast.success("Video created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
    validationSchema: newVideoSchema,
    onSubmit,
  });

  return (
    <Modal open={addProject} onClose={handleModalClose}>
      <div className="w-80 space-y-3">
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <label
            htmlFor="video_title"
            className="flex flex-col gap-1 text-base font-semibold tracking-wide text-gray-800"
          >
            Video title
            <input
              type="text"
              name="video_title"
              value={values.video_title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`h-12 w-80 rounded-lg border-2 border-gray-400 bg-gray-100 px-4 text-lg font-medium text-gray-900 focus:border-blue1/90 focus:outline-none ${
                errors.video_title && touched.video_title
                  ? "border-[#f66464]"
                  : ""
              }`}
            />
            {errors.video_title && touched.video_title && (
              <p className="error">{errors.video_title}</p>
            )}
          </label>

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="btn btn-add w-full tracking-wide"
              disabled={false}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-light w-full tracking-wide"
              onClick={handleModalClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewVideo;
