import PageRoutes from "../routes/PageRoutes.js";
import CardRoutes from "../routes/CardRoutes.js";
import UserRoutes from "../routes/UserRoutes.js";
import ProductRoutes from "../routes/ProductRoutes.js"
import AuthenticationRoutes from "../routes/AuthenticationRoutes.js";
import ApplicationRoutes from "../routes/ApplicationRoutes.js";
import APIRoutes from "../routes/APIRoutes.js";

export default (app) => {
    // Registering our PageRoutes as middleware
    app.use("/", PageRoutes);

    // Authentication routes
    app.use("/", AuthenticationRoutes);
    
    // Our Card routes
    app.use("/cards", CardRoutes);

    // Our User routes
    app.use("/users", UserRoutes);

    // Product routes
    app.use("/products", ProductRoutes);

    app.use("/applications", ApplicationRoutes);

    app.use("/api", APIRoutes);
};