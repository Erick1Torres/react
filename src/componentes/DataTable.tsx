import { useState } from 'react';

// 1. Tipado de props: Definino un contrato estricto usando un Genérico <T>
interface DataTableProps<T> {
  datos: T[];              // Array de datos genericos
  columnas: (keyof T)[];   // Array de claves que existen dentro del tipo T
}

// 2. Componente React fuertemente tipado. 
// Le obligo a que 'T' tenga al menos un 'id' para usarlo en el atributo 'key' de React.
export function DataTable<T extends { id: string | number }>({ datos, columnas }: DataTableProps<T>) {

  // 3. Tipado de hooks: Estado local para la edición. 
  // Uso Partial<T> porque el usuario podría no haber rellenado todos los campos aún.
    const [filaEnEdicion, setFilaEnEdicion] = useState<Partial<T> | null>(null);

    return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Tabla de Datos Generica</h2>
        <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
            {columnas.map((col, index) => (
                <th key={index}>{String(col).toUpperCase()}</th>
            ))}
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {datos.map((fila) => (
            <tr key={fila.id}>
                {columnas.map((col, index) => (
                <td key={index}>{String(fila[col])}</td>
))}
                <td>
                    <button onClick={() => setFilaEnEdicion(fila)}>
                    Editar
                </button>
                </td>
            </tr>
))}
        </tbody>
        </table>

        {filaEnEdicion && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <h3>Editando registro...</h3>
            <p><i>Nota: Este estado acepta <code>Partial&lt;T&gt;</code>, por lo que las propiedades son opcionales.</i></p>
            <pre>{JSON.stringify(filaEnEdicion, null, 2)}</pre>
            <button onClick={() => setFilaEnEdicion(null)}>Cancelar edición</button>
        </div>
)}
    </div>
);
}