
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { useAuth } from "./AuthContext";

interface LoginResponse {
    id: number;
    nombre: string;
    correo: string;
    token: string;
    rol: string;
}

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const message = location.state?.message;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post<LoginResponse>("/auth/login", {
                correo,
                password
            });

            login(response.data);
            const destino = location.state?.from || "/";
            navigate(destino, { replace: true });
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError("Correo electrónico o contraseña incorrectos.");
            } else {
                setError("No se ha podido iniciar sesión. Inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "450px" }}>
            <h2 className="text-center mb-4">Iniciar sesión</h2>

            {message && (
                <div className="alert alert-success">{message}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        className="form-control"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? "Accediendo..." : "Entrar"}
                </button>
            </form>

            <p className="text-center mt-3">
                ¿Todavía no tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
        </div>
    );
}
