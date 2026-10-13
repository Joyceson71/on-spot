import { NextResponse } from 'next/server';
import { createSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serverClient = await createSupabaseServerClient();
    const adminClient = getSupabaseAdminClient();

    const {
      data: { session },
    } = await serverClient.auth.getSession();

    const userId = session?.user?.id || body.user_id;
    const jobId = body.job_id;

    if (!jobId) {
      return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    const clientToUse = adminClient || serverClient;

    // Check if user is auth or if guest
    const isUuid = (str: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

    if (userId && isUuid(userId) && isUuid(jobId)) {
      const { data: application, error } = await clientToUse
        .from('applications')
        .insert({
          job_id: jobId,
          user_id: userId,
          status: 'Applied',
          notes: body.notes || null,
        })
        .select()
        .single();

      if (error && !error.message.includes('duplicate key')) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      // Increment slots_filled on job
      const { data: currentJob } = await clientToUse
        .from('jobs')
        .select('slots_filled')
        .eq('id', jobId)
        .single();

      if (currentJob) {
        await clientToUse
          .from('jobs')
          .update({ slots_filled: (currentJob.slots_filled || 0) + 1 })
          .eq('id', jobId);
      }

      return NextResponse.json(application || { success: true }, { status: 201 });
    }

    // Guest fallback (no valid auth UUID)
    if (isUuid(jobId)) {
      const { data: currentJob } = await clientToUse
        .from('jobs')
        .select('slots_filled')
        .eq('id', jobId)
        .single();

      if (currentJob) {
        await clientToUse
          .from('jobs')
          .update({ slots_filled: (currentJob.slots_filled || 0) + 1 })
          .eq('id', jobId);
      }
    }

    return NextResponse.json({ success: true, guest: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
