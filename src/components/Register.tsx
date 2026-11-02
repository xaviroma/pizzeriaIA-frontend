
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/clientes", form);
            navigate("/login", {
                state: { message: "Cuenta creada correctamente. Ya puedes iniciar sesión." }
            });
        } catch (err: any) {
            if (err.response?.status === 409) {
                setError("Este correo electrónico ya está registrado.");
            } else if (err.response?.status === 400) {
                setError("Revisa los datos introducidos. La contraseña debe tener al menos 8 caracteres.");
            } else {
                setError("No se ha podido crear la cuenta. Inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "550px" }}>
            <h2 className="text-center mb-4">Crear cuenta</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        className="form-control"
                        type="email"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono (opcional)</label>
                    <input
                        className="form-control"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección (opcional)</label>
                    <input
                        className="form-control"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                    />
                    <small className="text-muted">
                        Mínimo 8 caracteres.
                    </small>
                </div>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? "Creando cuenta..." : "Registrarme"}
                </button>
            </form>

            <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
        </div>
    );
}
