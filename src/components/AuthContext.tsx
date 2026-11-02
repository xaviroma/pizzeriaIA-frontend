
import { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    token: string;
    rol: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (usuario: Usuario) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(() => {
        const guardado = localStorage.getItem("usuario");
        return guardado ? JSON.parse(guardado) : null;
    });

    const login = (nuevoUsuario: Usuario) => {
        localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        setUsuario(nuevoUsuario);
    };

    const logout = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe utilizarse dentro de AuthProvider");
    }

    return context;
}
