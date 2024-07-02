import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from "../../hooks";

export const Navbar = () => {
    const { startLogout, user } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/reports/generate/all/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al generar el reporte');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte-eventos.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error al descargar el reporte:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al generar el reporte',
                text: 'Ocurrió un problema al intentar generar el reporte. Por favor, inténtalo de nuevo más tarde.',
            });
        }
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                {user.name}
            </span>

            <button
                className="btn btn-outline-primary mr-2"
                onClick={handleDownload}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        &nbsp; Generando...
                    </>
                ) : (
                    <>
                        <i className="fas fa-file-pdf"></i>
                        &nbsp; Generar Reporte
                    </>
                )}
            </button>

            <button
                className="btn btn-outline-danger"
                onClick={startLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    );
};
