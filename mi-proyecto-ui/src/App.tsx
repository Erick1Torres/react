import { DataTable } from './componentes/DataTable';
import { DateTime } from 'luxon';

// Recibe dos fechas (como string ISO) y devuelve la diferencia exacta en dias como numero.
function calcularDiasDiferencia(fechaInicio: string, fechaFin: string): number {
  const inicio = DateTime.fromISO(fechaInicio);
  const fin = DateTime.fromISO(fechaFin);
  
  // Uso luxon para calcular la diferencia en dias
  const diff = fin.diff(inicio, 'days');
  return Math.floor(diff.days);
}

// utilizo el concepto del Módulo 2
interface EstudianteUI {
  id: string;
  nombre: string;
  email: string;
  diasMatriculado: number;
}

function App() {
  // Simulo datos que vienen del servidor
  const datosEstudiantes: EstudianteUI[] = [
    { 
      id: "USR-001", 
      nombre: "Ana García", 
      email: "ana@uni.edu", 
      diasMatriculado: calcularDiasDiferencia("2025-09-01", DateTime.now().toISO()) 
    },
    { 
      id: "USR-002", 
      nombre: "Carlos López", 
      email: "carlos@uni.edu", 
      diasMatriculado: calcularDiasDiferencia("2026-01-15", DateTime.now().toISO()) 
    }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Administración Universitario</h1>
      <p>Este panel utiliza un componente <code>&lt;DataTable&lt;T&gt;&gt;</code> estrictamente tipado y cálculos de fechas con <code>luxon</code>.</p>
      
      <DataTable<EstudianteUI> 
        datos={datosEstudiantes} 
        columnas={['id', 'nombre', 'email', 'diasMatriculado']} 
      />
    </div>
  );
}

export default App;