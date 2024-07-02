import React from 'react';

const ReporteEventos = () => {
    const handleDownload = async () => {
        try {
            const response = await fetch('/api/reports/generate/all/all', {
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
        } catch (error) {
            console.error('Error al descargar el reporte:', error);
        }
    };

    return (
        <button onClick={handleDownload}>Generar Reporte de Eventos</button>
    );
};

export default ReporteEventos;