import { useState } from 'react';
import { calendarApi } from '../../api';
import { useNavigate } from 'react-router-dom';

// import './ForgotPasswordPage.css';


export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await calendarApi.post('/recovery', { email });
            if (response.data.ok) {
                alert('Correo de recuperación fue enviado');
                navigate('/login'); 
            }

        } catch (error) {
            console.error('Error al enviar el correo de recuperación', error);
        }
    };

    return (
<div className="container">
    <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
            <div className="login-form-1">
                <h2 className="text-center mb-4">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <h4>Email:</h4>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Enviar correo de recuperación
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
    );
};

