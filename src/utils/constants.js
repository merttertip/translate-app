export const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    background: "#3f3f46",
    borderColor: state.isFocused ? "#3b82f6" : "#52525b",
    borderWidth: "2px",
    borderRadius: "12px",
    minHeight: "48px",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    padding: "12px 16px",
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? "#52525b"
        : "#3f3f46",
    color: state.isSelected ? "white" : "#e4e4e7",
    cursor: "pointer",
  }),

  menu: (baseStyles, state) => ({
    ...baseStyles,
    background: "#3f3f46",
    border: "1px solid #52525b",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#e4e4e7",
  }),

  input: (baseStyles, state) => ({
    ...baseStyles,
    color: "#a1a1aa",
  }),
};
