import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from '../auth';
import { CalendarPage } from '../calendar';
import { ReportGenerator } from '../calendar'; 
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        );
    }

    return (
        <Routes>
            {status === 'not-authenticated' ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<CalendarPage />} />
                    <Route path="/reportes" element={<ReportGenerator />} /> {/* Nueva ruta para ReportGenerator */}
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
};
