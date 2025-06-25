import React from "react";
import { CalendarToday as ScheduleIcon } from "@mui/icons-material";
import { PlaceholderPage } from "../components/common";

const SchedulePage: React.FC = () => {
  const features = [
    "View your complete academic schedule",
    "Manage class timings and locations",
    "Set reminders for important events",
    "Sync with external calendar apps",
    "Track assignment due dates",
    "Plan study sessions and breaks",
  ];

  return (
    <PlaceholderPage
      title="Schedule & Calendar"
      description="Organize your academic life with smart scheduling tools"
      icon={<ScheduleIcon />}
      features={features}
    />
  );
};

export default SchedulePage;
