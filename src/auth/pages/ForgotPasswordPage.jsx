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
                navigate('/login'); //redirigir al login
            }

        } catch (error) {
            console.error('Error al enviar el correo de recuperación', error);
        }
    };

    return (
        <div className="container login-container">
            <div className="row">
            <div className="col-md-12 login-form-1">

                <h2>Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <h4>Email:</h4>
                    <div className="form-group mb-4 text-center">
                        <input
                            className="form-control"
                            placeholder="Correo"
                            value={ email }
                            onChange={handleEmailChange}
                            required
                        />

                    </div>
                    <div className="form-group mb-2">

                        <button 
                            type="submit" 
                            className="btn btnSubmit"
                        >Enviar correo de recuperación</button>

                    </div>
                </form>
            </div>

            </div>
        </div>
    );
};

