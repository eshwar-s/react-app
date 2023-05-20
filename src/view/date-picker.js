import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function TaskDatePicker({
  value,
  label,
  onChange,
  fontSize,
  margin,
  ...props
}) {
  return (
    <DatePicker
      value={value}
      label={label}
      sx={{
        ".MuiInputLabel-root": { fontSize: fontSize },
        margin: margin,
      }}
      slotProps={{
        textField: {
          InputProps: {
            style: {
              fontSize: fontSize,
            },
          },
        },
        actionBar: {
          actions: ["clear"],
        },
      }}
      onChange={onChange}
      {...props}
    />
  );
}

export function TaskDateTimePicker({
  value,
  label,
  onChange,
  fontSize,
  margin,
  ...props
}) {
  return (
    <DateTimePicker
      value={value}
      label={label}
      sx={{
        ".MuiInputLabel-root": { fontSize: fontSize },
        margin: margin,
      }}
      slotProps={{
        textField: {
          InputProps: {
            style: {
              fontSize: fontSize,
            },
          },
        },
        actionBar: {
          actions: ["clear"],
        },
      }}
      onChange={onChange}
      {...props}
    />
  );
}
