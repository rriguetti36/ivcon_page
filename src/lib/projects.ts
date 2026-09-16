type Project = {
  nombre: string; ubicacion: string; problema: string; solucion: string;
  resultado: string; publicarSEO: boolean; descripcion?: string;
};

// Área y sistema son opcionales: nunca exigir cifras o materiales desconocidos.
export const projectComplete = (project: Project) =>
  [project.problema, project.solucion, project.resultado].every(value => Boolean(value.trim()));
export const projectIndexable = (project: Project) => project.publicarSEO && projectComplete(project);
export const projectDescription = (project: Project) => project.descripcion ||
  `Proyecto ${project.nombre} de IVCON en ${project.ubicacion}. Consulta la información disponible de esta obra y solicita una evaluación para tu proyecto.`;
