import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { supportedLanguages } from "../i18n/i18n";

export const SimpleI18nDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  const isRTL =
    supportedLanguages[i18n.language as keyof typeof supportedLanguages]
      ?.dir === "rtl";

  // Set document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {t("common.language")} Demo
      </Typography>

      <Box sx={{ mb: 3 }}>
        <LanguageSwitcher showLabel />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Current language: {i18n.language} | Direction: {isRTL ? "RTL" : "LTR"}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("navigation.dashboard")}
              </Typography>
              <Typography variant="body1" paragraph>
                {t("dashboard.welcome")}, User!
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">
                  • {t("navigation.quizzes")}
                </Typography>
                <Typography variant="body2">
                  • {t("navigation.announcements")}
                </Typography>
                <Typography variant="body2">
                  • {t("navigation.courses")}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t("auth.login")} Form
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="body2">
                  {t("auth.email")}: user@example.com
                </Typography>
                <Typography variant="body2">
                  {t("auth.password")}: ********
                </Typography>

                <Button variant="contained" sx={{ mt: 1 }}>
                  {t("auth.signIn")}
                </Button>

                <Typography variant="body2" color="text.secondary">
                  {t("auth.dontHaveAccount")} {t("auth.signUp")}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Common Actions
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button variant="outlined" size="small">
                  {t("common.save")}
                </Button>
                <Button variant="outlined" size="small">
                  {t("common.cancel")}
                </Button>
                <Button variant="outlined" size="small">
                  {t("common.edit")}
                </Button>
                <Button variant="outlined" size="small">
                  {t("common.delete")}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
