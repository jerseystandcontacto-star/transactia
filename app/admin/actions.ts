'use server';

import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(id: string, status: string) {
  const { error } = await getSupabaseAdmin()
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin');
}
