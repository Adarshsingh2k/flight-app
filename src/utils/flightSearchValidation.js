export const validateField = (field, value, deptDateValue) => {
  let errorMessage = "";

  switch (field) {
    case "from":
      if (!value || value.length !== 3)
        errorMessage = "From field should be 3 characters long";
      break;
    case "departure":
      if (!value || value.length !== 3)
        errorMessage = "Departure field should be 3 characters long";
      break;
    case "deptDate":
      if (!value) {
        errorMessage = "Departure date is required";
      } else {
        const current = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < current)
          errorMessage = "Departure date should be greater than current date";
      }
      break;
    case "retDate":
      if (value) {
        const departureDate = new Date(deptDateValue);
        const returnDate = new Date(value);
        if (returnDate <= departureDate)
          errorMessage = "Return date should be greater than departure date";
      }
      break;
    case "travellerCount":
      if (!value || value <= 0 || value > 7)
        errorMessage = "Traveller count should be between 1 and 7";
      break;
    default:
      break;
  }
  return errorMessage;
};
