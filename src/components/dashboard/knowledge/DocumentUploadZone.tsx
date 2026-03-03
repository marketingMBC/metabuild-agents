'use client';

import { Upload, FileText } from 'lucide-react';

export default function DocumentUploadZone() {
  return (
    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-cyan/30 transition-colors cursor-pointer group">
      <div className="w-14 h-14 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan/20 transition-colors">
        <Upload size={24} className="text-cyan" />
      </div>
      <p className="text-sm font-medium text-white mb-1">Arrastra archivos aquí</p>
      <p className="text-xs text-white/40">o haz click para seleccionar</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <FileText size={12} />
          PDF
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <FileText size={12} />
          DOC
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <FileText size={12} />
          TXT
        </div>
      </div>
      <p className="text-[10px] text-white/20 mt-2">Máximo 10MB por archivo</p>
    </div>
  );
}
