import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInterviewExperience,
  deleteInterviewExperience,
  editInterviewExperience,
} from "../../store/middlewares/interviewExperience";
import { Experience } from "./Experience";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";

const DEFAULT_DATA = {
  role: null,
  companyId: null,
};

export const InterviewExperience = ({ visit = false }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const [editItem, setEditItem] = useState();
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { role, companyId } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Role is not provided",
        })
      );
    } else if (!companyId) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Company is not provided",
        })
      );
    } else {
      const fullData = {
        user_id: profile.id,
        role,
        companyId,
      };
      if (editItem) {
        dispatch(editInterviewExperience(editItem, fullData));
      } else {
        dispatch(addInterviewExperience(fullData));
      }
      setShowInput(false);
      setFormData(DEFAULT_DATA);
    }
  };

  const handleEditClick = (id) => {
    const data = profile.interviewExperiences.find((we) => we.id === id);
    setFormData({
      role: data.role,
      companyId: data.companyId,
    });
    setEditItem(data.id);
    setShowInput(true);
  };

  const handleEditClose = () => {
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteInterviewExperience(id));
  };

  return (
    <Experience
      {...{
        title: "Interview Experience",
        data: profile.interviewExperiences,
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
