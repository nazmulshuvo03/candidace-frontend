import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducation,
  deleteEducation,
  editEducation,
} from "../../store/middlewares/education";
import { Experience } from "./Experience";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";

const DEFAULT_DATA = {
  degree: "",
  major: "",
  institution: "",
  year_of_graduation: null,
};

export const Education = ({ visit = false }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const [editItem, setEditItem] = useState();
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.degree) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Degree is not provided",
        })
      );
    } else if (!formData.major) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Major is not provided",
        })
      );
    } else if (!formData.institution) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Institution is not provided",
        })
      );
    } else {
      const fullData = {
        user_id: profile.id,
        ...formData,
      };
      if (editItem) {
        dispatch(editEducation(editItem, fullData));
        setEditItem();
      } else {
        dispatch(addEducation(fullData));
      }
      setShowInput(false);
      setFormData(DEFAULT_DATA);
    }
  };

  const handleEditClick = (id) => {
    const data = profile.education.find((we) => we.id === id);
    setFormData({
      ...data,
    });
    setEditItem(data.id);
    setShowInput(true);
  };

  const handleEditClose = () => {
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteEducation(id));
  };

  return (
    <Experience
      {...{
        title: "Education",
        data: profile.education,
        formData,
        showInput,
        setShowInput,
        handleEditClick,
        handleDeleteClick,
        editItem,
        handleEditClose,
        handleChange,
        handleSubmit,
        visit,
      }}
    />
  );
};
