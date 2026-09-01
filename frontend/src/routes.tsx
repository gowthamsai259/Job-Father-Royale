import { Navigate, type RouteObject } from "react-router-dom";

import LoginPage from "./pages/loginpage";
import CommonPage from "./pages/commonpage";
import ResumeAnalyzerPage from "./pages/resumeanalyserpage";
import ModelSettingsPage from "./pages/modelsettingspage";

type RouteProps = {
userEmail?: string;
onLogin: () => void;
onLogout: () => void;
};

export function createRoutes({
    userEmail,
    onLogin,
    onLogout,
}: RouteProps): RouteObject[] {
return [
    {
    path: "/login",
    element: <LoginPage onLogin={onLogin} />,
    },
    {
    path: "/home",
    element: (
        <CommonPage
        email={userEmail}
        onLogout={onLogout}
        />
    ),
    children: [
        {
        index: true,
        element: (
            <Navigate
            to="resume-analyzer"
            replace
            />
        ),
        },
        {
            path: "resume-analyzer",
            element: <ResumeAnalyzerPage />,
        },
        {
            path: "model-settings",
            element: <ModelSettingsPage />,
        },
    ],
    },
    {
        path: "*",
        element: <Navigate to="/home" replace />,
    },
];
}
