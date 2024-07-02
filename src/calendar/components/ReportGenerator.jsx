// GenerateReports.jsx

import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const GenerateReports = () => {
    const [loading, setLoading] = useState(false);

    const handleGenerateReport = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`/api/reports/generate/all/all`, {
                responseType: 'blob',
            });

            // Crear un objeto URL para el blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Crear un elemento <a> invisible para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte-eventos.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al generar el reporte:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Generador de Reportes</h2>
            <Button variant="outline-primary" onClick={handleGenerateReport} disabled={loading}>
                {loading ? 'Generando...' : 'Generar Reporte'}
            </Button>
        </div>
    );
};

export default GenerateReports;
