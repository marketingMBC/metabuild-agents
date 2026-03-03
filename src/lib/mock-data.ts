// ============================================================
// Metabuild Smart — Mock Data (basado en clientes reales)
// ============================================================

import type { Agent, Conversation, Contact, Message, Lead, Automation, TeamMember, KPI, KnowledgeDocument, FAQ, CannedResponse, InternalNote, Notification } from './types';

// ── Agentes ──────────────────────────────────────────────────
export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sofía',
    type: 'ventas',
    status: 'active',
    avatar: '👩‍💼',
    channels: ['whatsapp', 'instagram', 'web'],
    description: 'Agente de ventas especializada en captación inmobiliaria y arriendo de departamentos. Maneja consultas de propiedades, agenda visitas y califica leads.',
    conversationsTotal: 1847,
    conversationsToday: 23,
    responseTime: '< 30s',
    satisfactionRate: 94.2,
    createdAt: '2025-08-15',
    lastActive: '2026-02-27T10:30:00',
    personality: 'Profesional, empática y orientada a resultados',
    language: 'es',
    tags: ['inmobiliaria', 'ventas', 'leads'],
  },
  {
    id: 'agent-2',
    name: 'Carlos',
    type: 'soporte',
    status: 'active',
    avatar: '👨‍⚕️',
    channels: ['whatsapp', 'email'],
    description: 'Agente de soporte para centros de salud. Gestiona agendamiento de horas, consultas de costos, convenios Fonasa/Isapre y reagendamientos.',
    conversationsTotal: 2340,
    conversationsToday: 31,
    responseTime: '< 15s',
    satisfactionRate: 96.8,
    createdAt: '2025-09-01',
    lastActive: '2026-02-27T10:28:00',
    personality: 'Paciente, claro y profesional en salud',
    language: 'es',
    tags: ['salud', 'agendamiento', 'soporte'],
  },
  {
    id: 'agent-3',
    name: 'Luna',
    type: 'rrss',
    status: 'active',
    avatar: '🌙',
    channels: ['instagram', 'facebook'],
    description: 'Agente de redes sociales que responde DMs, gestiona comentarios y convierte seguidores en leads. Tono casual y cercano.',
    conversationsTotal: 956,
    conversationsToday: 15,
    responseTime: '< 45s',
    satisfactionRate: 91.5,
    createdAt: '2025-10-20',
    lastActive: '2026-02-27T10:25:00',
    personality: 'Cercana, creativa y con tono juvenil',
    language: 'es',
    tags: ['rrss', 'instagram', 'engagement'],
  },
  {
    id: 'agent-4',
    name: 'Admin Pro',
    type: 'admin',
    status: 'active',
    avatar: '🏢',
    channels: ['whatsapp', 'email'],
    description: 'Agente de administración de edificios. Gestiona reportes de desperfectos, consultas de gastos comunes, reservas de espacios y comunicados.',
    conversationsTotal: 1205,
    conversationsToday: 18,
    responseTime: '< 20s',
    satisfactionRate: 93.1,
    createdAt: '2025-07-10',
    lastActive: '2026-02-27T10:32:00',
    personality: 'Formal, eficiente y resolutivo',
    language: 'es',
    tags: ['edificios', 'administración', 'bi-rent'],
  },
  {
    id: 'agent-5',
    name: 'FintecBot',
    type: 'operaciones',
    status: 'paused',
    avatar: '🤖',
    channels: ['email', 'web'],
    description: 'Agente de operaciones internas para FintecHile. Automatiza reportes diarios, alertas de compliance y seguimiento de tareas del equipo.',
    conversationsTotal: 487,
    conversationsToday: 0,
    responseTime: '< 10s',
    satisfactionRate: 97.3,
    createdAt: '2025-11-05',
    lastActive: '2026-02-26T18:00:00',
    personality: 'Preciso, técnico y orientado a datos',
    language: 'es',
    tags: ['fintech', 'operaciones', 'compliance'],
  },
];

// ── Contactos ────────────────────────────────────────────────
const contacts: Contact[] = [
  { id: 'c-1', name: 'María González', phone: '+56 9 1234 5678', email: 'maria.gonzalez@gmail.com', tags: ['propietaria', 'torre-a'], notes: 'Depto 1204, Torre A. Reportó filtración baño en nov-2025.', createdAt: '2025-06-15', lastInteraction: '2026-02-27T09:15:00' },
  { id: 'c-2', name: 'Pedro Muñoz', phone: '+56 9 8765 1234', email: 'pmunoz@outlook.com', tags: ['arrendatario', 'torre-b'], notes: 'Arrendatario depto 503. Consulta frecuente gastos comunes.', createdAt: '2025-08-20', lastInteraction: '2026-02-27T08:45:00' },
  { id: 'c-3', name: 'Claudia Reyes', phone: '+56 9 5555 1234', tags: ['paciente', 'fonasa'], notes: 'Paciente neurología. Fonasa tramo B.', createdAt: '2025-09-10', lastInteraction: '2026-02-27T10:00:00' },
  { id: 'c-4', name: 'Roberto Silva', phone: '+56 9 4444 5678', email: 'rsilva@empresa.cl', tags: ['lead-caliente', 'inmobiliaria'], notes: 'Interesado en depto 2 dorm sector oriente. Presupuesto 5500 UF.', createdAt: '2026-01-15', lastInteraction: '2026-02-27T09:30:00' },
  { id: 'c-5', name: 'Ana Torres', instagram: '@anatorres.fit', tags: ['influencer', 'potencial'], notes: 'Contactó por Instagram. 15K seguidores fitness.', createdAt: '2026-02-10', lastInteraction: '2026-02-26T22:15:00' },
  { id: 'c-6', name: 'Josefa Martínez', phone: '+56 9 3333 7890', tags: ['apoderada', 'educación'], notes: 'Apoderada de Tomás Martínez, 3° básico.', createdAt: '2025-03-01', lastInteraction: '2026-02-27T07:30:00' },
  { id: 'c-7', name: 'Felipe Rojas', phone: '+56 9 2222 4567', email: 'frojas@fintechile.cl', tags: ['empleado', 'fintech'], notes: 'Jefe de operaciones FintecHile.', createdAt: '2025-11-10', lastInteraction: '2026-02-26T17:45:00' },
  { id: 'c-8', name: 'Valentina Pizarro', phone: '+56 9 6666 8901', tags: ['paciente', 'isapre'], notes: 'Paciente kinesiología. Isapre Colmena.', createdAt: '2025-12-01', lastInteraction: '2026-02-27T09:50:00' },
  { id: 'c-9', name: 'Diego Fernández', phone: '+56 9 7777 2345', email: 'diego.f@gmail.com', instagram: '@diegof_arq', tags: ['lead', 'inversionista'], notes: 'Busca depto inversión. Tiene 2 propiedades.', createdAt: '2026-02-01', lastInteraction: '2026-02-27T10:10:00' },
  { id: 'c-10', name: 'Carolina Vega', phone: '+56 9 8888 3456', tags: ['propietaria', 'junta-directiva'], notes: 'Presidenta junta directiva Edificio Los Alerces.', createdAt: '2025-05-01', lastInteraction: '2026-02-27T08:00:00' },
  { id: 'c-11', name: 'Ignacio López', phone: '+56 9 1111 5678', email: 'ilopez@parquecordillera.cl', tags: ['municipalidad', 'medio-ambiente'], notes: 'Encargado visitas Parque Cordillera.', createdAt: '2025-10-15', lastInteraction: '2026-02-26T16:30:00' },
  { id: 'c-12', name: 'Francisca Soto', instagram: '@fran.soto', tags: ['lead', 'moda'], notes: 'Interesada en servicios de marketing IA.', createdAt: '2026-02-20', lastInteraction: '2026-02-27T00:30:00' },
  { id: 'c-13', name: 'Andrés Campos', phone: '+56 9 9999 1234', tags: ['paciente', 'fonasa'], notes: 'Paciente traumatología. Reagendó 2 veces.', createdAt: '2025-11-20', lastInteraction: '2026-02-27T10:20:00' },
  { id: 'c-14', name: 'Camila Herrera', phone: '+56 9 3456 7890', email: 'c.herrera@olefoot.cl', tags: ['deportes', 'cliente'], notes: 'Coordinadora de eventos Ole Foot.', createdAt: '2026-01-10', lastInteraction: '2026-02-26T19:00:00' },
  { id: 'c-15', name: 'Matías Ríos', phone: '+56 9 6543 2109', tags: ['lead', 'inmobiliaria'], notes: 'Consulta por arriendo oficina centro.', createdAt: '2026-02-25', lastInteraction: '2026-02-27T10:05:00' },
];

// ── Helper para mensajes ─────────────────────────────────────
function msg(id: string, convId: string, sender: 'user' | 'agent' | 'system', senderName: string, content: string, timestamp: string, channel: 'whatsapp' | 'instagram' | 'facebook' | 'email' | 'web' = 'whatsapp'): Message {
  return { id, conversationId: convId, sender, senderName, content, timestamp, read: true, channel };
}

// ── Conversaciones ───────────────────────────────────────────
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    contact: contacts[0],
    agentId: 'agent-4',
    agentName: 'Admin Pro',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: 'El técnico visitará su departamento mañana entre 9:00 y 11:00.',
    lastMessageTime: '2026-02-27T09:15:00',
    unreadCount: 0,
    tags: ['mantenimiento', 'urgente'],
    priority: 'high',
    messages: [
      msg('m-1-1', 'conv-1', 'user', 'María González', 'Hola, tengo una filtración en el baño principal. Ya la había reportado en noviembre y volvió.', '2026-02-27T08:30:00'),
      msg('m-1-2', 'conv-1', 'agent', 'Admin Pro', 'Buenos días María. Lamento que el problema haya vuelto. Voy a escalar esto directamente con el equipo de mantenimiento como prioridad alta.', '2026-02-27T08:30:25'),
      msg('m-1-3', 'conv-1', 'user', 'María González', 'Gracias. Ya está mojando el piso del living. Necesito que vengan hoy si es posible.', '2026-02-27T08:32:00'),
      msg('m-1-4', 'conv-1', 'agent', 'Admin Pro', 'Entiendo la urgencia. He contactado al gasfíter de turno. ¿Puede recibir visita hoy entre 14:00 y 16:00?', '2026-02-27T08:32:20'),
      msg('m-1-5', 'conv-1', 'user', 'María González', 'Sí, perfecto. Estaré en casa.', '2026-02-27T08:33:00'),
      msg('m-1-6', 'conv-1', 'agent', 'Admin Pro', 'El técnico visitará su departamento mañana entre 9:00 y 11:00.', '2026-02-27T09:15:00'),
    ],
  },
  {
    id: 'conv-2',
    contact: contacts[1],
    agentId: 'agent-4',
    agentName: 'Admin Pro',
    channel: 'whatsapp',
    status: 'waiting',
    lastMessage: '¿Pueden detallarme qué incluye el gasto común de febrero?',
    lastMessageTime: '2026-02-27T08:45:00',
    unreadCount: 1,
    tags: ['gastos-comunes'],
    priority: 'medium',
    messages: [
      msg('m-2-1', 'conv-2', 'user', 'Pedro Muñoz', 'Hola, me llegó el cobro de gastos comunes y subió $15.000 respecto al mes pasado. ¿Pueden detallarme qué incluye el gasto común de febrero?', '2026-02-27T08:45:00'),
    ],
  },
  {
    id: 'conv-3',
    contact: contacts[2],
    agentId: 'agent-2',
    agentName: 'Carlos',
    channel: 'whatsapp',
    status: 'resolved',
    lastMessage: 'Perfecto, su hora queda agendada. Le enviaremos un recordatorio el día anterior.',
    lastMessageTime: '2026-02-27T10:00:00',
    unreadCount: 0,
    tags: ['agendamiento', 'neurología'],
    priority: 'low',
    messages: [
      msg('m-3-1', 'conv-3', 'user', 'Claudia Reyes', 'Hola, necesito agendar una hora con el Dr. Salinas para neurología.', '2026-02-27T09:40:00'),
      msg('m-3-2', 'conv-3', 'agent', 'Carlos', 'Hola Claudia, con gusto te ayudo. El Dr. Salinas tiene disponibilidad el jueves 6 de marzo a las 10:00 o el viernes 7 a las 15:30. ¿Cuál te acomoda?', '2026-02-27T09:40:15'),
      msg('m-3-3', 'conv-3', 'user', 'Claudia Reyes', 'El jueves a las 10:00 está bien. ¿Cuánto cuesta la consulta con Fonasa?', '2026-02-27T09:42:00'),
      msg('m-3-4', 'conv-3', 'agent', 'Carlos', 'Con Fonasa tramo B el copago es de $6.500. La consulta incluye evaluación completa. ¿Confirmo la hora?', '2026-02-27T09:42:12'),
      msg('m-3-5', 'conv-3', 'user', 'Claudia Reyes', 'Sí, confirmo. Gracias.', '2026-02-27T09:43:00'),
      msg('m-3-6', 'conv-3', 'agent', 'Carlos', 'Perfecto, su hora queda agendada. Le enviaremos un recordatorio el día anterior.', '2026-02-27T10:00:00'),
    ],
  },
  {
    id: 'conv-4',
    contact: contacts[3],
    agentId: 'agent-1',
    agentName: 'Sofía',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: '¿Le gustaría agendar una visita presencial? Tenemos disponibilidad este sábado.',
    lastMessageTime: '2026-02-27T09:30:00',
    unreadCount: 0,
    tags: ['lead-caliente', 'visita'],
    priority: 'high',
    messages: [
      msg('m-4-1', 'conv-4', 'user', 'Roberto Silva', 'Hola, vi el departamento de 2 dormitorios en Las Condes que publicaron. ¿Sigue disponible?', '2026-02-27T09:20:00'),
      msg('m-4-2', 'conv-4', 'agent', 'Sofía', '¡Hola Roberto! Sí, el departamento en Av. Apoquindo sigue disponible. Son 65m², 2 dormitorios, 2 baños, estacionamiento y bodega. Valor 5.200 UF. ¿Te cuento más detalles?', '2026-02-27T09:20:18'),
      msg('m-4-3', 'conv-4', 'user', 'Roberto Silva', 'Sí, me interesa. ¿Tiene buena orientación? Y el edificio, ¿es nuevo?', '2026-02-27T09:22:00'),
      msg('m-4-4', 'conv-4', 'agent', 'Sofía', 'El departamento tiene orientación nor-poniente con muy buena luz natural. El edificio es de 2024, tiene piscina, gimnasio, quincho y sala de cowork. Los gastos comunes son aprox. $95.000.', '2026-02-27T09:22:15'),
      msg('m-4-5', 'conv-4', 'user', 'Roberto Silva', 'Suena bien. ¿Puedo verlo?', '2026-02-27T09:25:00'),
      msg('m-4-6', 'conv-4', 'agent', 'Sofía', '¿Le gustaría agendar una visita presencial? Tenemos disponibilidad este sábado.', '2026-02-27T09:30:00'),
    ],
  },
  {
    id: 'conv-5',
    contact: contacts[4],
    agentId: 'agent-3',
    agentName: 'Luna',
    channel: 'instagram',
    status: 'active',
    lastMessage: '¡Claro! Te mando toda la info por DM 🚀',
    lastMessageTime: '2026-02-26T22:15:00',
    unreadCount: 2,
    tags: ['instagram', 'lead'],
    priority: 'medium',
    messages: [
      msg('m-5-1', 'conv-5', 'user', 'Ana Torres', 'Hola! Vi su post sobre automatización con IA. Me interesa para mi marca de fitness 💪', '2026-02-26T22:00:00', 'instagram'),
      msg('m-5-2', 'conv-5', 'agent', 'Luna', '¡Hola Ana! Qué bueno que te interesó 😊 Tenemos soluciones perfectas para marcas fitness. ¿Qué tipo de automatización buscas? ¿Atención al cliente, ventas o contenido?', '2026-02-26T22:00:30', 'instagram'),
      msg('m-5-3', 'conv-5', 'user', 'Ana Torres', 'Sobre todo atención al cliente. Me escriben mucho por DM preguntando por planes de entrenamiento y no doy abasto 😅', '2026-02-26T22:05:00', 'instagram'),
      msg('m-5-4', 'conv-5', 'agent', 'Luna', '¡Claro! Te mando toda la info por DM 🚀', '2026-02-26T22:15:00', 'instagram'),
    ],
  },
  {
    id: 'conv-6',
    contact: contacts[5],
    agentId: 'agent-2',
    agentName: 'Carlos',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: 'El profesor jefe de Tomás confirmó la reunión para el jueves a las 16:30.',
    lastMessageTime: '2026-02-27T07:30:00',
    unreadCount: 0,
    tags: ['educación', 'reunión'],
    priority: 'low',
    messages: [
      msg('m-6-1', 'conv-6', 'user', 'Josefa Martínez', 'Buenos días. Necesito justificar la inasistencia de mi hijo Tomás el lunes. Tuvo hora médica.', '2026-02-27T07:15:00'),
      msg('m-6-2', 'conv-6', 'agent', 'Carlos', 'Buenos días Josefa. Para justificar la inasistencia necesitamos el certificado médico. Puede enviarlo como foto por este mismo chat o al correo del colegio.', '2026-02-27T07:15:12'),
      msg('m-6-3', 'conv-6', 'user', 'Josefa Martínez', 'Perfecto, lo adjunto ahora. También quería pedir reunión con el profesor jefe.', '2026-02-27T07:20:00'),
      msg('m-6-4', 'conv-6', 'agent', 'Carlos', 'El profesor jefe de Tomás confirmó la reunión para el jueves a las 16:30.', '2026-02-27T07:30:00'),
    ],
  },
  {
    id: 'conv-7',
    contact: contacts[7],
    agentId: 'agent-2',
    agentName: 'Carlos',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: '¿Le acomoda el martes 4 a las 11:00 con la Dra. Morales?',
    lastMessageTime: '2026-02-27T09:50:00',
    unreadCount: 1,
    tags: ['agendamiento', 'kinesiología'],
    priority: 'medium',
    messages: [
      msg('m-7-1', 'conv-7', 'user', 'Valentina Pizarro', 'Hola, quiero reagendar mi hora de kinesiología. No puedo ir el viernes.', '2026-02-27T09:45:00'),
      msg('m-7-2', 'conv-7', 'agent', 'Carlos', 'Hola Valentina. Sin problema, cancelaré su hora del viernes. Tenemos disponibilidad el martes 4 o miércoles 5 de marzo.', '2026-02-27T09:45:15'),
      msg('m-7-3', 'conv-7', 'agent', 'Carlos', '¿Le acomoda el martes 4 a las 11:00 con la Dra. Morales?', '2026-02-27T09:50:00'),
    ],
  },
  {
    id: 'conv-8',
    contact: contacts[8],
    agentId: 'agent-1',
    agentName: 'Sofía',
    channel: 'web',
    status: 'active',
    lastMessage: 'Con ese perfil, le recomiendo nuestros departamentos en Ñuñoa y Providencia. ¿Le envío las fichas?',
    lastMessageTime: '2026-02-27T10:10:00',
    unreadCount: 0,
    tags: ['inversionista', 'web'],
    priority: 'high',
    messages: [
      msg('m-8-1', 'conv-8', 'user', 'Diego Fernández', 'Busco un departamento para inversión. Ya tengo 2 propiedades y quiero diversificar.', '2026-02-27T10:00:00', 'web'),
      msg('m-8-2', 'conv-8', 'agent', 'Sofía', '¡Hola Diego! Excelente decisión. Para orientarte mejor: ¿busca arriendo o plusvalía? ¿Tiene preferencia de zona?', '2026-02-27T10:00:20', 'web'),
      msg('m-8-3', 'conv-8', 'user', 'Diego Fernández', 'Arriendo. Preferiblemente zona con demanda universitaria.', '2026-02-27T10:05:00', 'web'),
      msg('m-8-4', 'conv-8', 'agent', 'Sofía', 'Con ese perfil, le recomiendo nuestros departamentos en Ñuñoa y Providencia. ¿Le envío las fichas?', '2026-02-27T10:10:00', 'web'),
    ],
  },
  {
    id: 'conv-9',
    contact: contacts[9],
    agentId: 'agent-4',
    agentName: 'Admin Pro',
    channel: 'email',
    status: 'active',
    lastMessage: 'Adjunto el acta de la última sesión y la cotización del proveedor de mantención de ascensores.',
    lastMessageTime: '2026-02-27T08:00:00',
    unreadCount: 0,
    tags: ['junta-directiva', 'ascensores'],
    priority: 'medium',
    messages: [
      msg('m-9-1', 'conv-9', 'user', 'Carolina Vega', 'Necesito el acta de la última reunión de la junta directiva y la cotización que discutimos del mantenimiento de ascensores.', '2026-02-26T23:30:00', 'email'),
      msg('m-9-2', 'conv-9', 'agent', 'Admin Pro', 'Adjunto el acta de la última sesión y la cotización del proveedor de mantención de ascensores.', '2026-02-27T08:00:00', 'email'),
    ],
  },
  {
    id: 'conv-10',
    contact: contacts[10],
    agentId: 'agent-2',
    agentName: 'Carlos',
    channel: 'whatsapp',
    status: 'resolved',
    lastMessage: 'Las visitas guiadas se realizan sábados y domingos. Reservé 12 cupos para el sábado 8.',
    lastMessageTime: '2026-02-26T16:30:00',
    unreadCount: 0,
    tags: ['parque', 'reserva-grupal'],
    priority: 'low',
    messages: [
      msg('m-10-1', 'conv-10', 'user', 'Ignacio López', 'Necesito reservar una visita grupal al Parque Cordillera para 12 personas el próximo sábado.', '2026-02-26T16:00:00'),
      msg('m-10-2', 'conv-10', 'agent', 'Carlos', 'Las visitas guiadas se realizan sábados y domingos. Reservé 12 cupos para el sábado 8.', '2026-02-26T16:30:00'),
    ],
  },
  {
    id: 'conv-11',
    contact: contacts[11],
    agentId: 'agent-3',
    agentName: 'Luna',
    channel: 'instagram',
    status: 'waiting',
    lastMessage: '¿Cuánto cuesta el plan básico?',
    lastMessageTime: '2026-02-27T00:30:00',
    unreadCount: 1,
    tags: ['pricing', 'lead'],
    priority: 'medium',
    messages: [
      msg('m-11-1', 'conv-11', 'user', 'Francisca Soto', 'Hola! Me encanta lo que hacen. ¿Cuánto cuesta el plan básico?', '2026-02-27T00:30:00', 'instagram'),
    ],
  },
  {
    id: 'conv-12',
    contact: contacts[12],
    agentId: 'agent-2',
    agentName: 'Carlos',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: 'Entiendo, Dr. Campos. La próxima hora disponible en traumatología es el lunes 3 a las 9:00.',
    lastMessageTime: '2026-02-27T10:20:00',
    unreadCount: 0,
    tags: ['reagendamiento', 'traumatología'],
    priority: 'medium',
    messages: [
      msg('m-12-1', 'conv-12', 'user', 'Andrés Campos', 'Necesito cambiar mi hora otra vez, disculpe. Tuve una emergencia laboral.', '2026-02-27T10:15:00'),
      msg('m-12-2', 'conv-12', 'agent', 'Carlos', 'Entiendo, Dr. Campos. La próxima hora disponible en traumatología es el lunes 3 a las 9:00.', '2026-02-27T10:20:00'),
    ],
  },
  {
    id: 'conv-13',
    contact: contacts[13],
    agentId: 'agent-1',
    agentName: 'Sofía',
    channel: 'email',
    status: 'resolved',
    lastMessage: 'Cotización enviada. Incluye arriendo de cancha, catering y equipamiento para 40 personas.',
    lastMessageTime: '2026-02-26T19:00:00',
    unreadCount: 0,
    tags: ['evento', 'ole-foot'],
    priority: 'medium',
    messages: [
      msg('m-13-1', 'conv-13', 'user', 'Camila Herrera', 'Necesitamos una cotización para un evento corporativo en sus instalaciones. 40 personas, incluiría arriendo de cancha y catering.', '2026-02-26T15:00:00', 'email'),
      msg('m-13-2', 'conv-13', 'agent', 'Sofía', 'Cotización enviada. Incluye arriendo de cancha, catering y equipamiento para 40 personas.', '2026-02-26T19:00:00', 'email'),
    ],
  },
  {
    id: 'conv-14',
    contact: contacts[14],
    agentId: 'agent-1',
    agentName: 'Sofía',
    channel: 'whatsapp',
    status: 'active',
    lastMessage: 'Tenemos oficinas desde 25m² en el centro. ¿Cuántas personas trabajarían ahí?',
    lastMessageTime: '2026-02-27T10:05:00',
    unreadCount: 1,
    tags: ['arriendo', 'oficina'],
    priority: 'medium',
    messages: [
      msg('m-14-1', 'conv-14', 'user', 'Matías Ríos', 'Hola, estoy buscando una oficina en arriendo en el centro de Santiago.', '2026-02-27T10:00:00'),
      msg('m-14-2', 'conv-14', 'agent', 'Sofía', 'Tenemos oficinas desde 25m² en el centro. ¿Cuántas personas trabajarían ahí?', '2026-02-27T10:05:00'),
    ],
  },
  {
    id: 'conv-15',
    contact: contacts[1],
    agentId: 'agent-4',
    agentName: 'Admin Pro',
    channel: 'whatsapp',
    status: 'resolved',
    lastMessage: 'La reserva del salón multiuso para el sábado 15 de marzo queda confirmada de 15:00 a 19:00.',
    lastMessageTime: '2026-02-25T14:00:00',
    unreadCount: 0,
    tags: ['reserva', 'salón'],
    priority: 'low',
    messages: [
      msg('m-15-1', 'conv-15', 'user', 'Pedro Muñoz', 'Quiero reservar el salón multiuso para un cumpleaños el sábado 15 de marzo, de 15:00 a 19:00.', '2026-02-25T13:30:00'),
      msg('m-15-2', 'conv-15', 'agent', 'Admin Pro', 'La reserva del salón multiuso para el sábado 15 de marzo queda confirmada de 15:00 a 19:00.', '2026-02-25T14:00:00'),
    ],
  },
];

// ── Leads ────────────────────────────────────────────────────
export const leads: Lead[] = [
  { id: 'lead-1', contactName: 'Roberto Silva', company: 'Independiente', email: 'rsilva@empresa.cl', phone: '+56 9 4444 5678', channel: 'whatsapp', stage: 'calificado', value: 5200, agentId: 'agent-1', agentName: 'Sofía', tags: ['inmobiliaria', '2-dorm'], notes: 'Presupuesto 5500 UF. Interesado en Las Condes.', createdAt: '2026-01-15', lastActivity: '2026-02-27T09:30:00', score: 85 },
  { id: 'lead-2', contactName: 'Diego Fernández', company: 'DF Inversiones', email: 'diego.f@gmail.com', phone: '+56 9 7777 2345', channel: 'web', stage: 'propuesta', value: 8500, agentId: 'agent-1', agentName: 'Sofía', tags: ['inversionista', 'múltiple'], notes: 'Inversionista con 2 propiedades. Busca arriendo zona universitaria.', createdAt: '2026-02-01', lastActivity: '2026-02-27T10:10:00', score: 92 },
  { id: 'lead-3', contactName: 'Ana Torres', company: 'Ana Torres Fitness', email: 'ana@anatorres.fit', phone: '+56 9 5555 9999', channel: 'instagram', stage: 'contactado', value: 149, agentId: 'agent-3', agentName: 'Luna', tags: ['influencer', 'fitness'], notes: 'Interesada en plan Growth para automatizar DMs.', createdAt: '2026-02-10', lastActivity: '2026-02-26T22:15:00', score: 68 },
  { id: 'lead-4', contactName: 'Francisca Soto', email: 'fran@fransoto.cl', phone: '+56 9 8888 1111', channel: 'instagram', stage: 'nuevo', value: 49, agentId: 'agent-3', agentName: 'Luna', tags: ['moda', 'starter'], notes: 'Preguntó por plan básico.', createdAt: '2026-02-20', lastActivity: '2026-02-27T00:30:00', score: 35 },
  { id: 'lead-5', contactName: 'Matías Ríos', email: 'mrios@gmail.com', phone: '+56 9 6543 2109', channel: 'whatsapp', stage: 'nuevo', value: 450, agentId: 'agent-1', agentName: 'Sofía', tags: ['oficina', 'arriendo'], notes: 'Busca oficina en el centro.', createdAt: '2026-02-25', lastActivity: '2026-02-27T10:05:00', score: 42 },
  { id: 'lead-6', contactName: 'Camila Herrera', company: 'Ole Foot', email: 'c.herrera@olefoot.cl', phone: '+56 9 3456 7890', channel: 'email', stage: 'propuesta', value: 2500, agentId: 'agent-1', agentName: 'Sofía', tags: ['evento', 'corporativo'], notes: 'Cotización evento corporativo 40 personas enviada.', createdAt: '2026-01-10', lastActivity: '2026-02-26T19:00:00', score: 78 },
  { id: 'lead-7', contactName: 'Josué Mendoza', company: 'Bi-Rent', email: 'josue@bi-rent.cl', phone: '+56 9 1234 0000', channel: 'whatsapp', stage: 'cerrado', value: 399, agentId: 'agent-4', agentName: 'Admin Pro', tags: ['edificios', 'enterprise'], notes: 'Firmó plan Enterprise para 3 edificios.', createdAt: '2025-07-10', lastActivity: '2026-02-20T10:00:00', score: 100 },
  { id: 'lead-8', contactName: 'Dr. Salinas', company: 'Neurocupa', email: 'salinas@neurocupa.cl', phone: '+56 9 2222 0000', channel: 'email', stage: 'cerrado', value: 149, agentId: 'agent-2', agentName: 'Carlos', tags: ['salud', 'growth'], notes: 'Plan Growth para centro neurológico.', createdAt: '2025-09-01', lastActivity: '2026-02-15T09:00:00', score: 100 },
  { id: 'lead-9', contactName: 'Mali Educación', company: 'Colegio Los Robles', email: 'mali@colegiolosrobles.cl', phone: '+56 9 3333 0000', channel: 'whatsapp', stage: 'calificado', value: 149, agentId: 'agent-2', agentName: 'Carlos', tags: ['educación', 'growth'], notes: 'Interesado en automatizar comunicación apoderados.', createdAt: '2025-11-01', lastActivity: '2026-02-22T14:00:00', score: 75 },
  { id: 'lead-10', contactName: 'Felipe Rojas', company: 'FintecHile', email: 'frojas@fintechile.cl', phone: '+56 9 2222 4567', channel: 'web', stage: 'cerrado', value: 399, agentId: 'agent-5', agentName: 'FintecBot', tags: ['fintech', 'enterprise'], notes: 'Plan Enterprise para operaciones internas.', createdAt: '2025-11-10', lastActivity: '2026-02-26T17:45:00', score: 100 },
  { id: 'lead-11', contactName: 'Ignacio López', company: 'Parque Cordillera', email: 'ilopez@parquecordillera.cl', phone: '+56 9 1111 5678', channel: 'whatsapp', stage: 'contactado', value: 149, agentId: 'agent-2', agentName: 'Carlos', tags: ['municipalidad', 'growth'], notes: 'Evaluando automatización de reservas de visitas.', createdAt: '2026-01-20', lastActivity: '2026-02-26T16:30:00', score: 55 },
  { id: 'lead-12', contactName: 'CIR Los Lagos', company: 'Centro Integral Rehabilitación', email: 'info@cirloslagos.cl', phone: '+56 9 4444 0000', channel: 'email', stage: 'calificado', value: 149, agentId: 'agent-2', agentName: 'Carlos', tags: ['salud', 'rehabilitación'], notes: 'Centro de rehabilitación en Puerto Montt. Buscan agendamiento automatizado.', createdAt: '2026-02-05', lastActivity: '2026-02-25T11:00:00', score: 70 },
  { id: 'lead-13', contactName: 'Sebastián Quiroz', email: 'squiroz@gmail.com', phone: '+56 9 5555 3333', channel: 'whatsapp', stage: 'nuevo', value: 49, agentId: 'agent-1', agentName: 'Sofía', tags: ['consulta', 'starter'], notes: 'Consultó precios desde WhatsApp.', createdAt: '2026-02-26', lastActivity: '2026-02-26T20:00:00', score: 25 },
  { id: 'lead-14', contactName: 'Daniela Paz', company: 'Estudio DP', email: 'dani@estudiodp.cl', phone: '+56 9 6666 4444', channel: 'instagram', stage: 'contactado', value: 149, agentId: 'agent-3', agentName: 'Luna', tags: ['diseño', 'growth'], notes: 'Estudio de diseño interesado en chatbot para clientes.', createdAt: '2026-02-18', lastActivity: '2026-02-26T15:00:00', score: 60 },
  { id: 'lead-15', contactName: 'Tomás Vergara', company: 'Vergara & Asoc.', email: 'tvergara@abogados.cl', phone: '+56 9 7777 5555', channel: 'web', stage: 'nuevo', value: 149, agentId: 'agent-1', agentName: 'Sofía', tags: ['legal', 'growth'], notes: 'Bufete de abogados buscando automatización de consultas iniciales.', createdAt: '2026-02-27', lastActivity: '2026-02-27T08:30:00', score: 40 },
];

// ── Automatizaciones ─────────────────────────────────────────
export const automations: Automation[] = [
  {
    id: 'auto-1', name: 'Bienvenida WhatsApp', description: 'Envía mensaje de bienvenida personalizado cuando un contacto nuevo escribe por WhatsApp.', category: 'bienvenida', trigger: 'message_received', enabled: true, executionsTotal: 3420, executionsToday: 12, successRate: 99.1, lastExecuted: '2026-02-27T10:15:00', createdAt: '2025-08-15',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Mensaje recibido', description: 'Canal: WhatsApp, Contacto nuevo' },
      { id: 'n2', type: 'condition', label: 'Es contacto nuevo', description: 'Sin conversaciones previas' },
      { id: 'n3', type: 'action', label: 'Enviar bienvenida', description: 'Mensaje personalizado + menú opciones' },
    ],
  },
  {
    id: 'auto-2', name: 'Follow-up 24h', description: 'Si una conversación queda sin respuesta del cliente por 24 horas, envía un seguimiento automático.', category: 'seguimiento', trigger: 'conversation_idle', enabled: true, executionsTotal: 1856, executionsToday: 5, successRate: 94.3, lastExecuted: '2026-02-27T08:00:00', createdAt: '2025-09-01',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Conversación inactiva', description: '24 horas sin respuesta' },
      { id: 'n2', type: 'condition', label: 'No es resuelta', description: 'Estado: activa o en espera' },
      { id: 'n3', type: 'action', label: 'Enviar follow-up', description: 'Mensaje amigable de seguimiento' },
    ],
  },
  {
    id: 'auto-3', name: 'Escalación a humano', description: 'Cuando el agente IA detecta frustración o el usuario pide hablar con una persona, escala la conversación.', category: 'escalacion', trigger: 'message_received', enabled: true, executionsTotal: 234, executionsToday: 2, successRate: 100, lastExecuted: '2026-02-27T09:45:00', createdAt: '2025-09-15',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Mensaje recibido', description: 'Cualquier canal' },
      { id: 'n2', type: 'condition', label: 'Detecta frustración', description: 'Sentimiento negativo o solicitud explícita' },
      { id: 'n3', type: 'action', label: 'Escalar a humano', description: 'Notifica al equipo + transfiere conversación' },
    ],
  },
  {
    id: 'auto-4', name: 'Lead Scoring automático', description: 'Asigna puntuación a leads según canal, interacciones, empresa y valor potencial.', category: 'scoring', trigger: 'lead_created', enabled: true, executionsTotal: 890, executionsToday: 3, successRate: 97.8, lastExecuted: '2026-02-27T10:05:00', createdAt: '2025-10-01',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Lead creado/actualizado', description: 'Nuevo lead o cambio de etapa' },
      { id: 'n2', type: 'action', label: 'Calcular score', description: 'Basado en canal, empresa, valor, interacciones' },
      { id: 'n3', type: 'action', label: 'Asignar etiqueta', description: 'Hot/Warm/Cold según score' },
    ],
  },
  {
    id: 'auto-5', name: 'Recordatorio de cita', description: 'Envía recordatorio por WhatsApp 24 horas antes de una cita agendada.', category: 'recordatorio', trigger: 'time_based', enabled: true, executionsTotal: 2100, executionsToday: 8, successRate: 98.5, lastExecuted: '2026-02-27T07:00:00', createdAt: '2025-09-01',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Programado', description: '24h antes de la cita' },
      { id: 'n2', type: 'action', label: 'Enviar recordatorio', description: 'WhatsApp con detalles de la cita' },
      { id: 'n3', type: 'action', label: 'Confirmar asistencia', description: 'Botón Confirmar / Reagendar' },
    ],
  },
  {
    id: 'auto-6', name: 'Notificación lead caliente', description: 'Notifica al equipo de ventas cuando un lead alcanza score > 80.', category: 'notificacion', trigger: 'tag_added', enabled: true, executionsTotal: 156, executionsToday: 1, successRate: 100, lastExecuted: '2026-02-27T09:30:00', createdAt: '2025-10-15',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Score > 80', description: 'Lead marcado como caliente' },
      { id: 'n2', type: 'action', label: 'Notificar equipo', description: 'Email + push notification' },
      { id: 'n3', type: 'action', label: 'Asignar agente', description: 'Asigna agente de ventas senior' },
    ],
  },
  {
    id: 'auto-7', name: 'Bienvenida Instagram', description: 'Responde automáticamente a nuevos DMs en Instagram con mensaje personalizado.', category: 'bienvenida', trigger: 'message_received', enabled: true, executionsTotal: 678, executionsToday: 4, successRate: 98.2, lastExecuted: '2026-02-27T00:30:00', createdAt: '2025-10-20',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'DM recibido', description: 'Canal: Instagram' },
      { id: 'n2', type: 'condition', label: 'Primera interacción', description: 'Sin historial previo' },
      { id: 'n3', type: 'action', label: 'Responder con menú', description: 'Saludo + opciones principales' },
    ],
  },
  {
    id: 'auto-8', name: 'Follow-up post-venta', description: 'Envía encuesta de satisfacción 48h después de cerrar una conversación.', category: 'seguimiento', trigger: 'conversation_idle', enabled: true, executionsTotal: 1230, executionsToday: 6, successRate: 92.1, lastExecuted: '2026-02-27T06:00:00', createdAt: '2025-11-01',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Conversación resuelta', description: '48h después del cierre' },
      { id: 'n2', type: 'action', label: 'Enviar encuesta', description: 'Escala 1-5 + comentario' },
      { id: 'n3', type: 'action', label: 'Registrar feedback', description: 'Guarda en perfil del contacto' },
    ],
  },
  {
    id: 'auto-9', name: 'Alerta gastos comunes', description: 'Notifica a residentes cuando se publica el nuevo cobro mensual de gastos comunes.', category: 'notificacion', trigger: 'time_based', enabled: true, executionsTotal: 450, executionsToday: 0, successRate: 99.5, lastExecuted: '2026-02-01T09:00:00', createdAt: '2025-07-15',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Día 1 del mes', description: 'Primer día hábil' },
      { id: 'n2', type: 'action', label: 'Generar detalle', description: 'Resumen de gastos del mes' },
      { id: 'n3', type: 'action', label: 'Enviar por WhatsApp', description: 'Mensaje masivo a residentes' },
    ],
  },
  {
    id: 'auto-10', name: 'Recordatorio reagendamiento', description: 'Si un paciente canceló, envía opciones de nuevas horas disponibles a las 48h.', category: 'recordatorio', trigger: 'time_based', enabled: false, executionsTotal: 340, executionsToday: 0, successRate: 88.7, lastExecuted: '2026-02-25T10:00:00', createdAt: '2025-12-01',
    nodes: [
      { id: 'n1', type: 'trigger', label: 'Cita cancelada', description: '48h después de cancelación' },
      { id: 'n2', type: 'condition', label: 'Sin nueva cita', description: 'Paciente no ha reagendado' },
      { id: 'n3', type: 'action', label: 'Ofrecer horarios', description: 'Envía 3 opciones disponibles' },
    ],
  },
];

// ── Equipo ───────────────────────────────────────────────────
export const teamMembers: TeamMember[] = [
  { id: 'tm-1', name: 'Rodrigo Requena', email: 'rodrigo@metabuild.cl', role: 'admin', lastActive: '2026-02-27T10:30:00', assignedAgents: ['agent-1', 'agent-2', 'agent-3', 'agent-4', 'agent-5'] },
  { id: 'tm-2', name: 'Catalina Vidal', email: 'catalina@metabuild.cl', role: 'manager', lastActive: '2026-02-27T09:00:00', assignedAgents: ['agent-1', 'agent-3'] },
  { id: 'tm-3', name: 'Tomás Araya', email: 'tomas@metabuild.cl', role: 'agent', lastActive: '2026-02-27T10:15:00', assignedAgents: ['agent-2'] },
  { id: 'tm-4', name: 'Javiera Pinto', email: 'javiera@metabuild.cl', role: 'agent', lastActive: '2026-02-26T18:30:00', assignedAgents: ['agent-4'] },
];

// ── KPIs ─────────────────────────────────────────────────────
export const dashboardKPIs: KPI[] = [
  { label: 'Conversaciones hoy', value: 87, change: 12.5, changeLabel: 'vs ayer', icon: 'MessageSquare' },
  { label: 'Leads activos', value: 42, change: 8.3, changeLabel: 'esta semana', icon: 'Users' },
  { label: 'Tasa de respuesta', value: '98.2%', change: 1.2, changeLabel: 'vs semana pasada', icon: 'Zap' },
  { label: 'Tiempo respuesta', value: '< 25s', change: -15.0, changeLabel: 'mejora vs mes', icon: 'Clock' },
  { label: 'Satisfacción', value: '94.7%', change: 2.1, changeLabel: 'vs mes pasado', icon: 'Star' },
  { label: 'Conversiones', value: '23.4%', change: 5.6, changeLabel: 'este mes', icon: 'TrendingUp' },
];

// ── Actividad (últimos 7 días) ───────────────────────────────
export const activityData = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  conversations: [72, 85, 91, 78, 95, 45, 32],
  leads: [8, 12, 6, 10, 14, 3, 2],
};

// ── Peak Hours (heatmap 7x24) ────────────────────────────────
export const peakHoursData: number[][] = [
  [2,1,0,0,0,1,3,8,15,22,25,20,18,22,25,20,15,12,8,5,3,2,1,1],
  [1,1,0,0,0,2,4,10,18,25,28,24,20,24,28,22,16,14,10,6,4,3,2,1],
  [2,1,0,0,0,1,3,9,16,24,26,22,19,23,27,21,17,13,9,5,3,2,1,1],
  [1,0,0,0,0,2,5,11,19,26,30,25,21,25,29,23,18,15,11,7,4,3,1,1],
  [2,1,0,0,0,1,4,12,20,28,32,27,23,26,30,24,19,16,12,8,5,3,2,1],
  [1,1,0,0,0,0,2,5,10,14,16,15,12,13,14,12,8,6,4,3,2,1,1,0],
  [0,0,0,0,0,0,1,3,6,8,10,9,8,9,10,8,5,4,3,2,1,1,0,0],
];

// ── Funnel de conversión ─────────────────────────────────────
export const conversionFunnel = [
  { stage: 'Visitantes web', count: 12450, percentage: 100 },
  { stage: 'Conversaciones iniciadas', count: 3240, percentage: 26 },
  { stage: 'Leads capturados', count: 890, percentage: 7.1 },
  { stage: 'Leads calificados', count: 345, percentage: 2.8 },
  { stage: 'Propuestas enviadas', count: 156, percentage: 1.3 },
  { stage: 'Clientes cerrados', count: 42, percentage: 0.34 },
];

// ── Knowledge Base ─────────────────────────────────────────
export const knowledgeDocuments: KnowledgeDocument[] = [
  { id: 'kd-1', title: 'Manual de Procedimientos Inmobiliarios', type: 'pdf', size: '2.4 MB', status: 'ready', agentIds: ['agent-1'], uploadedAt: '2025-12-01', updatedAt: '2026-02-15' },
  { id: 'kd-2', title: 'Protocolo de Atención Centro Médico', type: 'pdf', size: '1.8 MB', status: 'ready', agentIds: ['agent-2'], uploadedAt: '2025-11-15', updatedAt: '2026-01-20' },
  { id: 'kd-3', title: 'Guía de Respuestas Redes Sociales', type: 'doc', size: '850 KB', status: 'ready', agentIds: ['agent-3'], uploadedAt: '2026-01-10', updatedAt: '2026-02-10' },
  { id: 'kd-4', title: 'Reglamento Interno Edificio Los Alerces', type: 'pdf', size: '3.1 MB', status: 'ready', agentIds: ['agent-4'], uploadedAt: '2025-08-01', updatedAt: '2026-02-01' },
  { id: 'kd-5', title: 'Políticas de Compliance FintecHile', type: 'pdf', size: '4.2 MB', status: 'processing', agentIds: ['agent-5'], uploadedAt: '2026-02-25', updatedAt: '2026-02-25' },
  { id: 'kd-6', title: 'FAQ Website metabuild.cl', type: 'url', url: 'https://metabuild.cl/faq', status: 'ready', agentIds: ['agent-1', 'agent-3'], uploadedAt: '2026-02-20', updatedAt: '2026-02-20' },
];

export const faqs: FAQ[] = [
  { id: 'faq-1', question: '¿Cuáles son los horarios de atención?', answer: 'Nuestros agentes de IA están disponibles 24/7. El equipo humano atiende de lunes a viernes, 9:00 a 18:00.', category: 'General', agentIds: ['agent-1', 'agent-2', 'agent-3'], createdAt: '2025-10-01', updatedAt: '2026-01-15' },
  { id: 'faq-2', question: '¿Cómo agendo una cita médica?', answer: 'Puede agendar escribiendo por WhatsApp al +56 9 8765 4321 o a través del chat web. El agente le mostrará las horas disponibles.', category: 'Salud', agentIds: ['agent-2'], createdAt: '2025-09-15', updatedAt: '2026-02-10' },
  { id: 'faq-3', question: '¿Aceptan Fonasa e Isapre?', answer: 'Sí, trabajamos con Fonasa todos los tramos y las principales Isapres: Colmena, Cruz Blanca, Banmédica y Consalud.', category: 'Salud', agentIds: ['agent-2'], createdAt: '2025-09-15', updatedAt: '2025-12-01' },
  { id: 'faq-4', question: '¿Cuánto cuestan los gastos comunes?', answer: 'El monto varía según el edificio y departamento. Puede consultar el detalle actualizado escribiéndonos por WhatsApp.', category: 'Administración', agentIds: ['agent-4'], createdAt: '2025-08-01', updatedAt: '2026-02-01' },
  { id: 'faq-5', question: '¿Cómo puedo ver una propiedad?', answer: 'Agenda una visita presencial o virtual a través de nuestro agente Sofía. Disponibilidad de lunes a sábado.', category: 'Inmobiliaria', agentIds: ['agent-1'], createdAt: '2025-12-01', updatedAt: '2026-02-15' },
  { id: 'faq-6', question: '¿Qué planes ofrecen?', answer: 'Tenemos 3 planes: Starter ($49 USD/mes), Growth ($149 USD/mes) y Enterprise ($399 USD/mes). Cada uno incluye diferentes cantidades de agentes y conversaciones.', category: 'Ventas', agentIds: ['agent-1', 'agent-3'], createdAt: '2026-01-01', updatedAt: '2026-02-20' },
];

export const cannedResponses: CannedResponse[] = [
  { id: 'cr-1', shortcut: '/saludo', title: 'Saludo inicial', content: '¡Hola! Bienvenido/a a {empresa}. ¿En qué puedo ayudarte hoy?', category: 'General', agentIds: [] },
  { id: 'cr-2', shortcut: '/horarios', title: 'Horarios de atención', content: 'Nuestro horario de atención es de lunes a viernes, 9:00 a 18:00. Los agentes IA están disponibles 24/7.', category: 'General', agentIds: [] },
  { id: 'cr-3', shortcut: '/espera', title: 'Solicitud de espera', content: 'Permítame un momento mientras reviso la información. Le respondo enseguida.', category: 'General', agentIds: [] },
  { id: 'cr-4', shortcut: '/precio', title: 'Consulta de precios', content: 'Con gusto le comparto la información de precios. ¿Podría indicarme qué producto o servicio le interesa?', category: 'Ventas', agentIds: ['agent-1'] },
  { id: 'cr-5', shortcut: '/agendar', title: 'Agendar cita', content: 'Para agendar su cita, necesito: nombre completo, RUT, y preferencia de horario. ¿Me puede proporcionar estos datos?', category: 'Salud', agentIds: ['agent-2'] },
  { id: 'cr-6', shortcut: '/despedida', title: 'Despedida', content: '¡Gracias por contactarnos! Si necesita algo más, no dude en escribirnos. ¡Que tenga un excelente día! 😊', category: 'General', agentIds: [] },
  { id: 'cr-7', shortcut: '/escalacion', title: 'Transferir a humano', content: 'Entiendo su consulta. Voy a transferirle con un agente de nuestro equipo que podrá ayudarle mejor. Un momento por favor.', category: 'Escalación', agentIds: [] },
  { id: 'cr-8', shortcut: '/visita', title: 'Agendar visita propiedad', content: 'Para agendar una visita, tenemos disponibilidad de lunes a sábado. ¿Qué día y horario le acomoda?', category: 'Inmobiliaria', agentIds: ['agent-1'] },
];

export const internalNotes: InternalNote[] = [
  { id: 'note-1', conversationId: 'conv-1', authorId: 'tm-1', authorName: 'Rodrigo Requena', content: 'Esta es la segunda vez que reporta la filtración. Priorizar reparación definitiva.', timestamp: '2026-02-27T09:00:00' },
  { id: 'note-2', conversationId: 'conv-4', authorId: 'tm-2', authorName: 'Catalina Vidal', content: 'Lead caliente. Roberto ya visitó otra propiedad la semana pasada. Hacer seguimiento personal.', timestamp: '2026-02-27T09:35:00' },
  { id: 'note-3', conversationId: 'conv-5', authorId: 'tm-2', authorName: 'Catalina Vidal', content: 'Ana Torres tiene 15K seguidores. Evaluar partnership/descuento especial.', timestamp: '2026-02-26T22:20:00' },
  { id: 'note-4', conversationId: 'conv-8', authorId: 'tm-1', authorName: 'Rodrigo Requena', content: 'Inversionista con perfil alto. Preparar paquete de propiedades premium.', timestamp: '2026-02-27T10:15:00' },
];

export const notifications: Notification[] = [
  { id: 'notif-1', type: 'warning', title: 'Escalación pendiente', message: 'La conversación con María González requiere atención humana.', read: false, timestamp: '2026-02-27T09:15:00', link: '/dashboard/conversations' },
  { id: 'notif-2', type: 'success', title: 'Lead calificado', message: 'Diego Fernández alcanzó score 92. Lead caliente asignado a Sofía.', read: false, timestamp: '2026-02-27T10:10:00', link: '/dashboard/leads' },
  { id: 'notif-3', type: 'info', title: 'Nuevo documento procesado', message: 'FAQ Website metabuild.cl está listo para usar.', read: true, timestamp: '2026-02-26T14:00:00', link: '/dashboard/knowledge' },
  { id: 'notif-4', type: 'error', title: 'FintecBot pausado', message: 'El agente FintecBot fue pausado por error de configuración.', read: true, timestamp: '2026-02-26T18:00:00', link: '/dashboard/agents' },
  { id: 'notif-5', type: 'success', title: 'Automatización exitosa', message: 'Bienvenida WhatsApp ejecutada 12 veces hoy sin errores.', read: true, timestamp: '2026-02-27T10:15:00', link: '/dashboard/automations' },
];
