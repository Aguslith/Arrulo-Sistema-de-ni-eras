export const ZONAS = [
  'Palermo',
  'Belgrano',
  'Caballito',
  'Villa Urquiza',
  'Almagro',
  'Núñez',
  'Recoleta',
  'Flores',
  'San Isidro',
];

export const NEIGHBORING_ZONAS = {
  Palermo: ['Belgrano', 'Recoleta', 'Almagro', 'Villa Urquiza'],
  Belgrano: ['Palermo', 'Núñez', 'Villa Urquiza'],
  Caballito: ['Almagro', 'Flores', 'Palermo'],
  'Villa Urquiza': ['Belgrano', 'Núñez', 'Palermo'],
  Almagro: ['Caballito', 'Palermo', 'Recoleta'],
  'Núñez': ['Belgrano', 'Villa Urquiza', 'San Isidro'],
  Recoleta: ['Palermo', 'Almagro'],
  Flores: ['Caballito', 'Almagro'],
  'San Isidro': ['Núñez', 'Belgrano'],
};

export const TURNOS = ['Mañana', 'Tarde', 'Noche', 'Fines de semana'];

export const ESPECIALIDADES = [
  'Recién nacidos (0-1 año)',
  'Primera infancia (1-4 años)',
  'Apoyo escolar (5-11 años)',
  'RCP Pediátrico',
  'Cocina infantil',
  'Bilingüe Inglés',
  'Mascotas OK',
  'Movilidad propia',
];

export const INITIAL_NANNIES = [
  {
    id: 'n-1',
    nombre: 'Camila Pereyra',
    edad: 25,
    zona: 'Palermo',
    barriosCercanos: ['Palermo', 'Recoleta', 'Belgrano', 'Almagro'],
    tarifaHora: 4800,
    experienciaAnios: 4,
    rating: 4.9,
    horasCompletadas: 340,
    disponibilidad: ['Mañana', 'Tarde'],
    especialidades: ['Recién nacidos (0-1 año)', 'Primera infancia (1-4 años)', 'RCP Pediátrico', 'Mascotas OK'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: true,
    bio: 'Estudiante de Psicopedagogía (4to año). Amo proponer juegos sensoriales sin pantallas y acompañar rutinas de sueño con paciencia.',
    telefono: '+54 9 11 5432-8901',
    email: 'camila.pereyra@ejemplo.com',
    referenciaDestacada: '"Camila cuidó a Emma desde los 8 meses. Puntualísima y super cariñosa." — Flia. Benítez',
    avatarTheme: 'peach',
    avatarVariant: 0,
    puntualidad: 99,
    estado: 'Disponible',
  },
  {
    id: 'n-2',
    nombre: 'Lucía Fernández',
    edad: 29,
    zona: 'Caballito',
    barriosCercanos: ['Caballito', 'Almagro', 'Flores', 'Palermo'],
    tarifaHora: 4500,
    experienciaAnios: 6,
    rating: 4.8,
    horasCompletadas: 512,
    disponibilidad: ['Tarde', 'Noche', 'Fines de semana'],
    especialidades: ['Primera infancia (1-4 años)', 'Apoyo escolar (5-11 años)', 'Cocina infantil', 'RCP Pediátrico'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: true,
    bio: 'Maestra jardinera recibida. Me especializo en tardes creativas, ayuda con tareas de primaria y preparación de meriendas saludables.',
    telefono: '+54 9 11 6123-4410',
    email: 'lucia.fernandez@ejemplo.com',
    referenciaDestacada: '"Mis dos hijos la adoran, siempre llega 10 minutos antes." — Flia. Acosta',
    avatarTheme: 'mint',
    avatarVariant: 1,
    puntualidad: 98,
    estado: 'Disponible',
  },
  {
    id: 'n-3',
    nombre: 'Valentina Sosa',
    edad: 23,
    zona: 'Belgrano',
    barriosCercanos: ['Belgrano', 'Núñez', 'Villa Urquiza', 'Palermo'],
    tarifaHora: 5200,
    experienciaAnios: 3,
    rating: 4.9,
    horasCompletadas: 215,
    disponibilidad: ['Mañana', 'Tarde', 'Fines de semana'],
    especialidades: ['Primera infancia (1-4 años)', 'Apoyo escolar (5-11 años)', 'Bilingüe Inglés', 'Mascotas OK'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: true,
    bio: 'Profesora de inglés inicial y estudiante de Fonoaudiología. Juego, cuentos en inglés y excelente comunicación con las familias.',
    telefono: '+54 9 11 4982-1123',
    email: 'valen.sosa@ejemplo.com',
    referenciaDestacada: '"Súper responsable y dulce. Nos dio tranquilidad desde la primera videollamada." — Flia. Morales',
    avatarTheme: 'sky',
    avatarVariant: 2,
    puntualidad: 97,
    estado: 'Disponible',
  },
  {
    id: 'n-4',
    nombre: 'Agustina Rojas',
    edad: 31,
    zona: 'Villa Urquiza',
    barriosCercanos: ['Villa Urquiza', 'Belgrano', 'Núñez', 'Palermo'],
    tarifaHora: 5500,
    experienciaAnios: 8,
    rating: 5.0,
    horasCompletadas: 780,
    disponibilidad: ['Mañana', 'Tarde'],
    especialidades: ['Recién nacidos (0-1 año)', 'Primera infancia (1-4 años)', 'RCP Pediátrico', 'Cocina infantil', 'Movilidad propia'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: false,
    bio: 'Puericultora y niñera especializada en bebés recién nacidos y mellizos. Cuento con curso actualizado de primeros auxilios pediátricos.',
    telefono: '+54 9 11 3340-7765',
    email: 'agus.rojas@ejemplo.com',
    referenciaDestacada: '"Nos salvó el primer año con nuestros mellizos. Profesional 100%." — Flia. Quiroga',
    avatarTheme: 'lilac',
    avatarVariant: 3,
    puntualidad: 100,
    estado: 'Asignada',
  },
  {
    id: 'n-5',
    nombre: 'Martina Duarte',
    edad: 22,
    zona: 'Almagro',
    barriosCercanos: ['Almagro', 'Caballito', 'Palermo', 'Recoleta'],
    tarifaHora: 4200,
    experienciaAnios: 2,
    rating: 4.7,
    horasCompletadas: 145,
    disponibilidad: ['Tarde', 'Noche', 'Fines de semana'],
    especialidades: ['Primera infancia (1-4 años)', 'Apoyo escolar (5-11 años)', 'Mascotas OK'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: true,
    bio: 'Estudiante de Profesorado de Educación Inicial. Muy energética, ideal para salidas a la plaza, manualidades y salidas nocturnas de padres.',
    telefono: '+54 9 11 5890-2314',
    email: 'martu.duarte@ejemplo.com',
    referenciaDestacada: '"Excelente predisposición, incluso nos cubrió un sábado de urgencia." — Flia. Silva',
    avatarTheme: 'butter',
    avatarVariant: 4,
    puntualidad: 95,
    estado: 'Disponible',
  },
  {
    id: 'n-6',
    nombre: 'Sofía Méndez',
    edad: 24,
    zona: 'Flores',
    barriosCercanos: ['Flores', 'Caballito', 'Almagro'],
    tarifaHora: 4100,
    experienciaAnios: 2,
    rating: 4.3,
    horasCompletadas: 68,
    disponibilidad: ['Tarde', 'Noche'],
    especialidades: ['Primera infancia (1-4 años)', 'Cocina infantil'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: false,
      entrevista: true,
    },
    disponibleSos: false,
    bio: 'Cuidé sobrinos y trabajé en colonia de vacaciones. Busco turnos fijos de tarde en zona centro-oeste.',
    telefono: '+54 9 11 6712-9045',
    email: 'sofia.mendez@ejemplo.com',
    referenciaDestacada: '"Muy dulce con los chicos, necesita recordatorio previo de dirección." — Nota interna',
    avatarTheme: 'peach',
    avatarVariant: 5,
    puntualidad: 82,
    estado: 'En revisión',
  },
  {
    id: 'n-7',
    nombre: 'Florencia Paz',
    edad: 27,
    zona: 'Núñez',
    barriosCercanos: ['Núñez', 'Belgrano', 'San Isidro', 'Villa Urquiza'],
    tarifaHora: 5000,
    experienciaAnios: 5,
    rating: 4.9,
    horasCompletadas: 410,
    disponibilidad: ['Mañana', 'Tarde', 'Noche'],
    especialidades: ['Recién nacidos (0-1 año)', 'Primera infancia (1-4 años)', 'Apoyo escolar (5-11 años)', 'RCP Pediátrico', 'Movilidad propia'],
    verificada: {
      dni: true,
      antecedentes: true,
      referencias: true,
      entrevista: true,
    },
    disponibleSos: true,
    bio: 'Acompañante terapéutica y niñera con auto propio. Experiencia en traslados escolares y rutinas estructuradas con mucha calidez.',
    telefono: '+54 9 11 4451-8892',
    email: 'flor.paz@ejemplo.com',
    referenciaDestacada: '"Impecable en todo sentido, súper confiable y resolutiva." — Flia. Ledesma',
    avatarTheme: 'mint',
    avatarVariant: 0,
    puntualidad: 99,
    estado: 'Disponible',
  },
];

export const INITIAL_FAMILIES = [
  {
    id: 'f-1',
    apellido: 'Familia Gómez',
    contacto: 'Carolina Gómez',
    zona: 'Caballito',
    hijos: 'Mateo (2 años) y Julieta (5 años)',
    rangoEdad: 'Primera infancia (1-4 años)',
    turnosNecesarios: ['Tarde'],
    diasHorario: 'Lun a Vie • 14:00 a 18:30 hs',
    horasSemanales: 22.5,
    presupuestoHora: 4800,
    requisitos: ['Primera infancia (1-4 años)', 'RCP Pediátrico', 'Cocina infantil'],
    notas: 'Necesitamos reemplazo urgente: la postulante anterior no confirmó su asistencia a la entrevista.',
    telefono: '+54 9 11 5011-3422',
    email: 'caro.gomez@ejemplo.com',
    estado: 'Reemplazo SOS',
    nineraAsignadaId: null,
    avatarTheme: 'peach',
  },
  {
    id: 'f-2',
    apellido: 'Familia Martínez',
    contacto: 'Laura y Diego Martínez',
    zona: 'Palermo',
    hijos: 'Olivia (9 meses) y Tomás (3 años)',
    rangoEdad: 'Recién nacidos (0-1 año)',
    turnosNecesarios: ['Mañana', 'Tarde'],
    diasHorario: 'Lun, Mié y Vie • 09:00 a 15:00 hs',
    horasSemanales: 18,
    presupuestoHora: 5200,
    requisitos: ['Recién nacidos (0-1 año)', 'RCP Pediátrico', 'Mascotas OK'],
    notas: 'Tenemos un perrito golden muy tranquilo. Priorizamos experiencia comprobable con bebés y cero pantallas.',
    telefono: '+54 9 11 6332-9981',
    email: 'laura.martinez@ejemplo.com',
    estado: 'Buscando',
    nineraAsignadaId: null,
    avatarTheme: 'sky',
  },
  {
    id: 'f-3',
    apellido: 'Familia Herrera',
    contacto: 'Julián Herrera',
    zona: 'Belgrano',
    hijos: 'Sofía (7 años)',
    rangoEdad: 'Apoyo escolar (5-11 años)',
    turnosNecesarios: ['Tarde'],
    diasHorario: 'Mar y Jue • 15:30 a 19:30 hs',
    horasSemanales: 8,
    presupuestoHora: 5400,
    requisitos: ['Apoyo escolar (5-11 años)', 'Bilingüe Inglés'],
    notas: 'Retiro del colegio a 3 cuadras, merienda y acompañamiento con tarea de inglés y matemáticas.',
    telefono: '+54 9 11 4120-5578',
    email: 'julian.herrera@ejemplo.com',
    estado: 'En Entrevista',
    nineraAsignadaId: 'n-3',
    avatarTheme: 'lilac',
  },
  {
    id: 'f-4',
    apellido: 'Familia Quiroga',
    contacto: 'Mariana Quiroga',
    zona: 'Villa Urquiza',
    hijos: 'Mellizos Benja y Pipe (11 meses)',
    rangoEdad: 'Recién nacidos (0-1 año)',
    turnosNecesarios: ['Mañana'],
    diasHorario: 'Lun a Vie • 08:30 a 13:30 hs',
    horasSemanales: 25,
    presupuestoHora: 5600,
    requisitos: ['Recién nacidos (0-1 año)', 'RCP Pediátrico', 'Cocina infantil'],
    notas: 'Muy felices con Agustina desde hace 3 meses. Renovación mensual con membresía Club Familias.',
    telefono: '+54 9 11 5987-1204',
    email: 'mariana.quiroga@ejemplo.com',
    estado: 'Activa',
    nineraAsignadaId: 'n-4',
    avatarTheme: 'mint',
  },
  {
    id: 'f-5',
    apellido: 'Familia Silva',
    contacto: 'Romina Silva',
    zona: 'Almagro',
    hijos: 'Luca (4 años)',
    rangoEdad: 'Primera infancia (1-4 años)',
    turnosNecesarios: ['Noche', 'Fines de semana'],
    diasHorario: 'Viernes o Sábados • 20:00 a 01:00 hs',
    horasSemanales: 5,
    presupuestoHora: 4600,
    requisitos: ['Primera infancia (1-4 años)', 'Mascotas OK'],
    notas: 'Cuidados eventuales para salidas nocturnas de pareja. Luca se duerme a las 21:30 hs.',
    telefono: '+54 9 11 3844-6120',
    email: 'romi.silva@ejemplo.com',
    estado: 'Buscando',
    nineraAsignadaId: null,
    avatarTheme: 'butter',
  },
];

export const INITIAL_INTERVIEWS = [
  {
    id: 'int-1',
    familyId: 'f-1',
    nannyId: 'n-6',
    fecha: 'Hoy',
    hora: '17:00 hs',
    link: 'https://meet.arrullo.ar/sala-gomez-1700',
    confirmacionFamilia: 'Confirmada',
    confirmacionNinera: 'Sin confirmar (Riesgo)',
    estado: 'En riesgo',
    notas: 'Recordatorio enviado hace 2 hs. La niñera no confirmó lectura — ideal activar Reemplazo SOS para no dejar plantada a la familia.',
    checklist: {
      puntualidad: false,
      experiencia: false,
      disponibilidad: false,
      quimica: false,
    },
  },
  {
    id: 'int-2',
    familyId: 'f-3',
    nannyId: 'n-3',
    fecha: 'Hoy',
    hora: '19:00 hs',
    link: 'https://meet.arrullo.ar/sala-herrera-1900',
    confirmacionFamilia: 'Confirmada',
    confirmacionNinera: 'Confirmada',
    estado: 'Lista',
    notas: 'Ambas partes confirmaron asistencia por WhatsApp automático. Enfoque en nivel de inglés y retiro escolar.',
    checklist: {
      puntualidad: true,
      experiencia: true,
      disponibilidad: true,
      quimica: false,
    },
  },
  {
    id: 'int-3',
    familyId: 'f-2',
    nannyId: 'n-1',
    fecha: 'Mañana',
    hora: '10:30 hs',
    link: 'https://meet.arrullo.ar/sala-martinez-1030',
    confirmacionFamilia: 'Confirmada',
    confirmacionNinera: 'Confirmada',
    estado: 'Programada',
    notas: 'Match de 96%. Revisar rutina de siesta de Olivia (9 meses).',
    checklist: {
      puntualidad: false,
      experiencia: false,
      disponibilidad: false,
      quimica: false,
    },
  },
  {
    id: 'int-4',
    familyId: 'f-4',
    nannyId: 'n-4',
    fecha: '12 Nov',
    hora: '11:00 hs',
    link: 'https://meet.arrullo.ar/sala-quiroga-1100',
    confirmacionFamilia: 'Confirmada',
    confirmacionNinera: 'Confirmada',
    estado: 'Completada',
    notas: '¡Excelente química! Familia aprobó en el acto y comenzó el lunes siguiente.',
    checklist: {
      puntualidad: true,
      experiencia: true,
      disponibilidad: true,
      quimica: true,
    },
  },
];

export const INITIAL_BILLING = [
  {
    id: 'b-1',
    periodo: 'Semana 11–15 Nov',
    familyId: 'f-4',
    nannyId: 'n-4',
    horas: 25,
    tarifaNinera: 5500,
    comisionAgenciaPorHora: 800,
    modelo: 'Comisión + Membresía',
    estadoFamilia: 'Pagado',
    estadoNinera: 'Transferido',
    metodoPago: 'Split Mercado Pago',
    comprobanteNro: 'AR-2026-0142',
    fechaPago: '16/11/2026',
  },
  {
    id: 'b-2',
    periodo: 'Semana 11–15 Nov',
    familyId: 'f-3',
    nannyId: 'n-3',
    horas: 8,
    tarifaNinera: 5200,
    comisionAgenciaPorHora: 750,
    modelo: 'Comisión 15%',
    estadoFamilia: 'Pagado',
    estadoNinera: 'Por transferir',
    metodoPago: 'Transferencia Bancaria',
    comprobanteNro: 'AR-2026-0143',
    fechaPago: '17/11/2026',
  },
  {
    id: 'b-3',
    periodo: 'Turno Sábado 14 Nov',
    familyId: 'f-5',
    nannyId: 'n-5',
    horas: 5,
    tarifaNinera: 4200,
    comisionAgenciaPorHora: 650,
    modelo: 'Turno Eventual',
    estadoFamilia: 'Pendiente',
    estadoNinera: 'Por transferir',
    metodoPago: 'Link de Pago',
    comprobanteNro: 'AR-2026-0144',
    fechaPago: 'Pendiente',
  },
  {
    id: 'b-4',
    periodo: 'Semana 04–08 Nov',
    familyId: 'f-4',
    nannyId: 'n-4',
    horas: 25,
    tarifaNinera: 5500,
    comisionAgenciaPorHora: 800,
    modelo: 'Comisión + Membresía',
    estadoFamilia: 'Pagado',
    estadoNinera: 'Transferido',
    metodoPago: 'Split Mercado Pago',
    comprobanteNro: 'AR-2026-0138',
    fechaPago: '09/11/2026',
  },
];

export const INITIAL_TICKETS = [
  {
    id: 't-1',
    asunto: 'Niñera no confirmó entrevista y se perdió la vez anterior',
    categoria: 'Inasistencia / Cancelación',
    prioridad: 'Alta',
    estado: 'Abierto',
    reportadoPor: 'Familia Gómez',
    tipoRemitente: 'Familia',
    emailRemitente: 'caro.gomez@ejemplo.com',
    fecha: 'Hoy • 15:10 hs',
    mensajes: [
      {
        autor: 'Carolina Gómez (Familia)',
        rol: 'externo',
        fecha: 'Hoy 15:10',
        texto: 'Hola! Hoy teníamos la entrevista virtual a las 17hs con Sofía pero todavía no veo la confirmación. La semana pasada ya nos pasó que no llegó a casa y necesito asegurar alguien para el lunes sin falta.',
      },
    ],
  },
  {
    id: 't-2',
    asunto: 'Consulta por comprobante de horas y fecha de transferencia',
    categoria: 'Pagos y Liquidación',
    prioridad: 'Media',
    estado: 'En revisión',
    reportadoPor: 'Valentina Sosa',
    tipoRemitente: 'Niñera',
    emailRemitente: 'valen.sosa@ejemplo.com',
    fecha: 'Ayer • 18:45 hs',
    mensajes: [
      {
        autor: 'Valentina Sosa (Niñera)',
        rol: 'externo',
        fecha: 'Ayer 18:45',
        texto: 'Hola! Quería consultar si ya se acreditó el pago de las 8 horas con Familia Herrera de esta semana para saber cuándo recibo mi transferencia.',
      },
      {
        autor: 'Coordinación Arrullo',
        rol: 'admin',
        fecha: 'Ayer 19:05',
        texto: '¡Hola Valen! Sí, la familia ya abonó hoy. Mañana antes del mediodía te enviamos la transferencia junto con tu resumen de horas por mail.',
      },
    ],
  },
  {
    id: 't-3',
    asunto: 'Cambio de horario de martes a miércoles',
    categoria: 'Coordinación de Turnos',
    prioridad: 'Baja',
    estado: 'Resuelto',
    reportadoPor: 'Familia Quiroga',
    tipoRemitente: 'Familia',
    emailRemitente: 'mariana.quiroga@ejemplo.com',
    fecha: '14 Nov • 11:20 hs',
    mensajes: [
      {
        autor: 'Mariana Quiroga (Familia)',
        rol: 'externo',
        fecha: '14 Nov 11:20',
        texto: 'Hola, queríamos avisar que la próxima semana los mellizos tienen pediatra el martes, así que con Agustina acordamos recuperar esas 2 horas el jueves.',
      },
      {
        autor: 'Coordinación Arrullo',
        rol: 'admin',
        fecha: '14 Nov 11:40',
        texto: '¡Perfecto Mariana! Ya dejamos asentado el ajuste en el calendario y en la liquidación semanal. Gracias por avisarnos por este canal.',
      },
    ],
  },
];

/**
 * Motor transparente de compatibilidad (Auto-Match Inteligente)
 * Evalúa Zona, Turnos, Experiencia por edad, Requisitos y Presupuesto.
 */
export function calculateMatch(nanny, family) {
  if (!nanny || !family) {
    return { total: 0, breakdown: [], highlights: [] };
  }

  // 1. Zona (28 pts)
  let zonaScore = 0;
  let zonaLabel = 'Zona alejada';
  if (nanny.zona === family.zona) {
    zonaScore = 28;
    zonaLabel = `Mismo barrio (${family.zona})`;
  } else if (
    nanny.barriosCercanos?.includes(family.zona) ||
    NEIGHBORING_ZONAS[family.zona]?.includes(nanny.zona)
  ) {
    zonaScore = 22;
    zonaLabel = `Barrio cercano (${nanny.zona})`;
  } else {
    zonaScore = 8;
    zonaLabel = `Traslado desde ${nanny.zona}`;
  }

  // 2. Disponibilidad horaria (27 pts)
  const reqTurnos = family.turnosNecesarios || [];
  const matchedTurnos = reqTurnos.filter((t) => nanny.disponibilidad.includes(t));
  const turnoRatio = reqTurnos.length > 0 ? matchedTurnos.length / reqTurnos.length : 1;
  const turnoScore = Math.round(turnoRatio * 27);
  const turnoLabel =
    turnoRatio === 1
      ? `Disponible en ${matchedTurnos.join(' y ')}`
      : matchedTurnos.length > 0
      ? `Disponibilidad parcial (${matchedTurnos.join(', ')})`
      : 'No coincide horario';

  // 3. Requisitos y edad (25 pts)
  const reqs = family.requisitos || [];
  const matchedReqs = reqs.filter((r) => nanny.especialidades.includes(r));
  const reqRatio = reqs.length > 0 ? matchedReqs.length / reqs.length : 1;
  const reqScore = Math.round(reqRatio * 25);
  const reqLabel =
    matchedReqs.length === reqs.length
      ? `Cumple ${reqs.length}/${reqs.length} requisitos`
      : `Cumple ${matchedReqs.length}/${reqs.length} requisitos`;

  // 4. Presupuesto (12 pts)
  let budgetScore = 12;
  let budgetLabel = 'Dentro del presupuesto';
  const diff = nanny.tarifaHora - family.presupuestoHora;
  if (diff <= 0) {
    budgetScore = 12;
    budgetLabel = 'Dentro del presupuesto';
  } else if (diff <= 400) {
    budgetScore = 8;
    budgetLabel = `+$${diff.toLocaleString('es-AR')}/h sobre tope`;
  } else {
    budgetScore = 3;
    budgetLabel = `Supera tope (+$${diff.toLocaleString('es-AR')}/h)`;
  }

  // 5. Confianza y Verificación (8 pts)
  const v = nanny.verificada || {};
  const verifiedCount = [v.dni, v.antecedentes, v.referencias, v.entrevista].filter(Boolean).length;
  const trustScore = Math.round((verifiedCount / 4) * 6 + (nanny.puntualidad >= 95 ? 2 : 0));

  const total = Math.min(99, Math.max(25, zonaScore + turnoScore + reqScore + budgetScore + trustScore));

  const breakdown = [
    { key: 'zona', label: 'Ubicación', score: Math.round((zonaScore / 28) * 100), detail: zonaLabel },
    { key: 'horario', label: 'Disponibilidad', score: Math.round((turnoScore / 27) * 100), detail: turnoLabel },
    { key: 'requisitos', label: 'Necesidades y edades', score: Math.round((reqScore / 25) * 100), detail: reqLabel },
    { key: 'presupuesto', label: 'Presupuesto', score: Math.round((budgetScore / 12) * 100), detail: budgetLabel },
    { key: 'confianza', label: 'Verificación y puntualidad', score: Math.round((trustScore / 8) * 100), detail: `${verifiedCount}/4 checks • ${nanny.puntualidad}% puntual` },
  ];

  const highlights = [zonaLabel, turnoLabel, ...matchedReqs.slice(0, 2)];

  return {
    total,
    breakdown,
    highlights,
    matchedReqs,
    missingReqs: reqs.filter((r) => !nanny.especialidades.includes(r)),
  };
}

export function formatARS(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}
