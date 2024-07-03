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
<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Restablecer Contraseña</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label>Nueva Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">
                            Restablecer contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};