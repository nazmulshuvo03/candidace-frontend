import { HorizontalTabs } from "../Tabs/HorizontalTabs";
import { CompaniesAdmin } from "./Companies";
import { ProfessionAdmin } from "./Profession";
import { UserAdmin } from "./User";

export const AdminPage = () => {
  const TABS = [
    { id: 1, name: "Users", component: <UserAdmin /> },
    { id: 2, name: "Companies", component: <CompaniesAdmin /> },
    { id: 3, name: "Profession", component: <ProfessionAdmin /> },
  ];

  return <HorizontalTabs data={TABS} />;
};
