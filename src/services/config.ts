const config = {
    apiHost: process.env.NODE_ENV === 'development' ? "http://localhost:3333" : "https://api.hotpe.top",
};

export { config };