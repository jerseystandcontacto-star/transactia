'use client';

import { useTransition } from 'react';
import { updateLeadStatus } from '../actions';

type Lead = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  status: string;
};

const STATUS_OPTIONS = ['Nuevo', 'Contactado', 'Cerrado'] as const;

const STATUS_BADGE: Record<string, string> = {
  Nuevo: 'bg-gray-100 text-gray-700',
  Contactado: 'bg-blue-100 text-blue-700',
  Cerrado: 'bg-green-100 text-green-700',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE[status] ?? 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

function StatusDropdown({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateLeadStatus(lead.id, newStatus);
    });
  };

  return (
    <select
      defaultValue={lead.status}
      onChange={handleChange}
      disabled={isPending}
      className="text-xs border border-gray-200 rounded px-2 py-1.5 text-gray-700 outline-none focus:border-gray-400 disabled:opacity-50 cursor-pointer transition-colors"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Mexico_City',
  });
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 text-sm">
        No hay leads registrados todavía.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            {['Fecha', 'Nombre', 'Empresa', 'Email', 'Teléfono', 'Mensaje', 'Estado'].map((h) => (
              <th
                key={h}
                className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
            >
              <td className="px-4 py-4 text-gray-500 whitespace-nowrap text-xs">
                {formatDate(lead.created_at)}
              </td>
              <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                {lead.name}
              </td>
              <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {lead.company || <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                <a href={`mailto:${lead.email}`} className="hover:text-gray-900 transition-colors">
                  {lead.email}
                </a>
              </td>
              <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {lead.phone || <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-4 text-gray-600 max-w-xs">
                <span className="block truncate max-w-[240px]" title={lead.message}>
                  {lead.message}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  <StatusBadge status={lead.status} />
                  <StatusDropdown lead={lead} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
