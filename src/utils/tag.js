/**
 * @typedef {Object} Tag
 * @property {number} id - The ID of the tag.
 * @property {string} name - The name of the tag.
 * @property {number} priority - The priority of the tag.
 * @property {string} textColor - The color of the text.
 * @property {string} bgColor - The background color of the tag.
 */

import { getDataLabelFromKey } from "./data";

/**
 * @type {Tag}
 */
const TAG = {
  id: 0, // Sample initial value for id
  name: "", // Sample initial value for name
  priority: 0, // Sample initial value for priority
  textColor: "", // Sample initial value for textColor
  bgColor: "", // Sample initial value for bgColor
};

// Function to create a new tag
/**
 * Create a new tag.
 * @param {number} id - The ID of the tag.
 * @param {string} name - The name of the tag.
 * @param {number} priority - The priority of the tag.
 * @param {string} textColor - The color of the text.
 * @param {string} bgColor - The background color of the tag.
 * @returns {Tag} A new tag object.
 */
function newTag(id, name, priority, textColor, bgColor) {
  return {
    id: id,
    name: name,
    priority: priority,
    textColor: textColor,
    bgColor: bgColor,
  };
}

function sameTargetCompany(userCompanies, personCompanies) {
  if (
    !(
      userCompanies &&
      userCompanies.length &&
      personCompanies &&
      personCompanies.length
    )
  )
    return false;
  for (let i = 0; i < userCompanies.length; i++) {
    if (personCompanies.includes(userCompanies[i])) {
      return true;
    }
  }
  return false;
}

function targetCompanyExperience(userCompanies, personExperiences) {
  if (
    !(
      userCompanies &&
      userCompanies.length &&
      personExperiences &&
      personExperiences.length
    )
  )
    return false;
  for (let i = 0; i < personExperiences.length; i++) {
    if (userCompanies.includes(personExperiences[i].companyId)) {
      return true;
    }
  }
  return false;
}

function focusAreaIncludes(skillsList, personFocusAreas, includesItem) {
  if (!(personFocusAreas && personFocusAreas.length)) return false;
  for (let fa of personFocusAreas) {
    if (getDataLabelFromKey(skillsList, fa) === includesItem) return true;
  }
  return false;
}

export const personTag = (user, person, skillsList, max = 10) => {
  let tags = [];
  if (skillsList && skillsList.length) {
    if (focusAreaIncludes(skillsList, person.focusAreas, "Product Sense")) {
      tags.push(
        newTag(6, `Product Sense`, 5, "text-yellow-700", "bg-yellow-100")
      );
    }
    if (
      focusAreaIncludes(skillsList, person.focusAreas, "Analytical & Metrics")
    ) {
      tags.push(
        newTag(7, `Analytical & Metrics`, 5, "text-yellow-700", "bg-yellow-100")
      );
    }
    if (focusAreaIncludes(skillsList, person.focusAreas, "Behavioral")) {
      tags.push(newTag(8, `Behavioral`, 5, "text-yellow-700", "bg-yellow-100"));
    }
  }
  if (user.experienceLevel === person.experienceLevel) {
    tags.push(newTag(5, `Levels match`, 4, "text-blue-700", "bg-blue-100"));
  }
  // TODO: Actively Practising to be added
  if (
    targetCompanyExperience(user.companiesOfInterest, person.workExperiences) ||
    targetCompanyExperience(
      user.companiesOfInterest,
      person.interviewExperiences
    )
  ) {
    tags.push(
      newTag(
        3,
        `Target Company Experience`,
        2,
        "text-green-700",
        "bg-green-100"
      )
    );
  }
  if (sameTargetCompany(user.companiesOfInterest, person.companiesOfInterest)) {
    tags.push(
      newTag(2, `Same target company as yours`, 1, "text-white", "bg-green-800")
    );
  }
  if (user.experienceLevel < person.experienceLevel) {
    tags.push(
      newTag(1, `Level's don't match`, 0, "text-red-700", "bg-red-100")
    );
  }
  return tags.slice(0, max);
};
