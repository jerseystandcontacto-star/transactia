import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import LeadsTable from './components/LeadsTable';
import LogoutButton from './components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[admin] Failed to fetch leads:', error.message);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 select-none">
            Transactia
          </span>
          <span className="text-gray-200 select-none">/</span>
          <h1 className="text-sm font-semibold text-gray-900">Leads</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
          <LogoutButton />
        </div>
      </header>

      {/* Stats bar */}
      <div className="border-b border-gray-100 px-6 lg:px-10 py-4 flex items-center gap-8">
        {(['Nuevo', 'Contactado', 'Cerrado'] as const).map((status) => {
          const count = (leads ?? []).filter((l) => l.status === status).length;
          return (
            <div key={status} className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-900">{count}</span>
              <span className="text-xs text-gray-400">{status}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xl font-semibold text-gray-900">{(leads ?? []).length}</span>
          <span className="text-xs text-gray-400">Total</span>
        </div>
      </div>

      {/* Table */}
      <main className="px-2 lg:px-4 py-6">
        <LeadsTable leads={leads ?? []} />
      </main>
    </div>
  );
}
