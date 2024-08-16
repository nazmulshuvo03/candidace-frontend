import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkExperience,
  deleteWorkExperience,
  editWorkExperience,
} from "../../store/middlewares/workExperience";
import { formatPostgresDate, htmlDateInputFormat } from "../../utils/timeDate";
import { Experience } from "./Experience";
import { MandatoryStar } from "../MandatoryStar";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";

const DEFAULT_DATA = {
  jobTitle: "",
  experienceId: null,
  companyId: null,
  country: "",
  startDate: null,
  endDate: null,
};

export const WorkExperience = ({ visit }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
  const completionStatus = useSelector((state) => state.user.completionStatus);

  const [editItem, setEditItem] = useState();
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { jobTitle, experienceId, companyId, country, startDate, endDate } =
    formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyId) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Company is not provided",
        })
      );
    } else if (!jobTitle) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Role is not provided",
        })
      );
    } else if (!startDate) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Joining date is required",
        })
      );
    } else if (!experienceId) {
      dispatch(
        setToastMessage({
          type: TOAST_TYPES[1],
          message: "Experience Level is not provided",
        })
      );
    } else {
      const formattedStartDate = formatPostgresDate(startDate);
      const formattedEndDate = formatPostgresDate(endDate);

      const fullData = {
        user_id: profile.id,
        jobTitle: jobTitle,
        experienceId: experienceId,
        companyId: companyId,
        country: country,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      if (editItem) {
        dispatch(editWorkExperience(editItem, fullData));
        setEditItem();
      } else {
        dispatch(addWorkExperience(fullData));
      }
      setShowInput(false);
      setFormData(DEFAULT_DATA);
    }
  };

  const handleEditClick = (id) => {
    const data = profile.workExperiences.find((we) => we.id === id);
    setFormData({
      jobTitle: data.jobTitle,
      experienceId: data.experienceId,
      companyId: data.companyId,
      country: data.country,
      startDate: htmlDateInputFormat(data.startDate),
      endDate: data.endDate ? htmlDateInputFormat(data.endDate) : null,
    });
    setEditItem(data.id);
    setShowInput(true);
  };

  const handleEditClose = () => {
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteWorkExperience(id));
  };

  return (
    <Experience
      {...{
        title: "Work Experience",
        data: profile.workExperiences,
        formData,
        showInput,
        setShowInput,
        handleEditClick,
        handleDeleteClick,
        editItem,
        handleEditClose,
        handleChange,
        handleSubmit,
        star: !visit && !completionStatus.workExperiences,
        visit,
      }}
    />
  );
};
