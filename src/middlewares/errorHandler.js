const errorHandler = (err, req, res, next) => {
    console.error('Erro capturado:', err);

    const statusCode = err.status || 500;
    const message = err.message || 'Erro interno do servidor';

    res.status(statusCode).json({
        error: message
    });
};