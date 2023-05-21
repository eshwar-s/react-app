import { ClearOutlined, SearchOutlined } from "@mui/icons-material";
import {
  InputAdornment,
  OutlinedInput,
  darken,
  lighten,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ROUTE } from "../common/routes";
import { ThemeMode } from "../common/theme";

function SearchBox() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const theme = useTheme();
  const previousRoute = useRef("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("query")) {
      if (location.pathname !== ROUTE.SEARCH) {
        previousRoute.current = location.pathname;
        const params = createSearchParams(searchParams).toString();
        navigate(`${ROUTE.SEARCH}?${params}`);
      }
    } else {
      if (location.pathname === ROUTE.SEARCH) {
        navigate(previousRoute.current);
      } else if (value) {
        setValue("");
      }
    }
  }, [searchParams, location.pathname, navigate, value]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleInputClear(event);
    }
  };

  const handleInputChange = (event) => {
    if (event.target.value) {
      setSearchParams({ query: event.target.value });
      setValue(event.target.value);
    } else {
      handleInputClear(event);
    }
  };

  const handleInputClear = (event) => {
    searchParams.delete("query");
    setSearchParams(searchParams);
    setValue("");
  };

  return (
    <OutlinedInput
      sx={getStyle(theme)}
      color="secondary"
      size="small"
      placeholder={t("searchPlaceholder")}
      startAdornment={
        <InputAdornment position="start">
          <SearchOutlined fontSize="small" />
        </InputAdornment>
      }
      endAdornment={
        value ? (
          <InputAdornment position="end">
            <ClearOutlined
              fontSize="small"
              sx={{ cursor: "default" }}
              onClick={handleInputClear}
            />
          </InputAdornment>
        ) : null
      }
      fullWidth
      inputProps={{
        style: {
          fontSize: "14px",
        },
      }}
      value={value}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
    />
  );
}

function getStyle(theme) {
  return {
    ".MuiOutlinedInput-input": {
      height: "16px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor:
        theme.palette.mode === ThemeMode.LIGHT
          ? darken(theme.palette.secondary.main, 0.15)
          : lighten(theme.palette.secondary.main, 0.15),
    },
  };
}

export default SearchBox;
