import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from "../../hooks";
// import { MyContext } from '../../hooks/Mycontext';


export const Navbar = ({ updateParentState, updateParentState2 }) => {
    const { startLogout, user } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const [misEventos, setMisEventos] = useState(true)      
    const [otrosEventos, setOtrosEventos] = useState(true)   

    const handleMisEventos = () => {
        setMisEventos(misEventos ? false : true)
        console.log(misEventos)
        updateParentState(misEventos)
    }


    const handleOtrosEventos = () => {
        setOtrosEventos(otrosEventos ? false : true)
        console.log(otrosEventos)
        updateParentState2(otrosEventos)
    }

    const handleDownload = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://eventflowirkanabackend-dead262715a1.herokuapp.com/api/reports/generate/all/all', {
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
                className="btn btn-outline-primary"
                onClick={ handleMisEventos }
            >
                {/* <i className="fas fa-sign-out-alt"></i> */}
                &nbsp;
                <span>Mis eventos</span>
            </button>
            <button
                className="btn btn-outline-secondary"
                onClick={ handleOtrosEventos }
            >
                {/* <i className="fas fa-sign-out-alt"></i> */}
                &nbsp;
                <span>Eventos externos</span>
            </button>
            <button
                className="btn btn-outline-light mr-2"
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

export const mineEvents = () =>{
    console.log(eventosUsuario)
    return eventosUsuario;
}
