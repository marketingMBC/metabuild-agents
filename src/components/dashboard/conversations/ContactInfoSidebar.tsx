'use client';

import { Phone, Mail, Instagram, Tag, Calendar, FileText } from 'lucide-react';
import type { Contact } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Avatar from '../shared/Avatar';

interface ContactInfoSidebarProps {
  contact: Contact;
}

export default function ContactInfoSidebar({ contact }: ContactInfoSidebarProps) {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">
      {/* Profile */}
      <div className="flex flex-col items-center text-center pt-2">
        <Avatar name={contact.name} size="lg" />
        <h3 className="text-sm font-semibold text-white mt-3">{contact.name}</h3>
        <p className="text-xs text-white/40 mt-0.5">
          Contacto desde {formatDate(contact.createdAt)}
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium">Información</p>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Phone size={14} className="text-white/30" />
            {contact.phone}
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Mail size={14} className="text-white/30" />
            {contact.email}
          </div>
        )}
        {contact.instagram && (
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Instagram size={14} className="text-white/30" />
            {contact.instagram}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium flex items-center gap-1">
          <Tag size={12} /> Etiquetas
        </p>
        <div className="flex flex-wrap gap-1">
          {contact.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan/10 text-cyan/80">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium flex items-center gap-1">
          <FileText size={12} /> Notas
        </p>
        <p className="text-xs text-white/50 leading-relaxed">{contact.notes}</p>
      </div>

      {/* Activity */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium flex items-center gap-1">
          <Calendar size={12} /> Actividad
        </p>
        <div className="text-xs text-white/40 space-y-1">
          <p>Última interacción: {formatDate(contact.lastInteraction)}</p>
          <p>Creado: {formatDate(contact.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
