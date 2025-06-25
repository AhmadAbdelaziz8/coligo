import React from "react";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../i18n/i18n";

interface LanguageSwitcherProps {
  variant?: "text" | "outlined" | "filled";
  size?: "small" | "medium";
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "outlined",
  size = "small",
  showLabel = false,
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const supportedLangs = Object.entries(supportedLanguages).map(
    ([code, info]) => ({
      code,
      ...info,
    })
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      {showLabel && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {t("common.language")}
        </Typography>
      )}
      <FormControl size={size} variant={variant}>
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          sx={{
            "& .MuiSelect-select": {
              paddingY: 1,
            },
          }}
        >
          {supportedLangs.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">{language.nativeName}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
