import { useState } from 'react';
import { calendarApi } from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

export const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await calendarApi.post('/recovery/reset-password', { token, newPassword });
            if (response.data.ok) {
                alert('Contraseña restablecida correctamente');
                navigate('/login'); // Redirigir al login o a otra página
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña', error);
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>Nueva Contraseña:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="submit">Restablecer contraseña</button>
            </form>
        </div>
    );
};