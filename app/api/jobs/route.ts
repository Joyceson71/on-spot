import { NextResponse } from 'next/server';
import { createSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(jobs || []);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serverClient = await createSupabaseServerClient();
    const adminClient = getSupabaseAdminClient();

    // Check user session
    const {
      data: { session },
    } = await serverClient.auth.getSession();

    const insertPayload: any = {
      title: body.title,
      category: body.category,
      category_display: body.category_display || body.category,
      dealer_name: body.dealer_name || session?.user?.email?.split('@')[0] || 'Dealer',
      dealer_rating: body.dealer_rating || 5.0,
      image_url:
        body.image_url ||
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      pay: body.pay,
      pay_type: body.pay_type || 'Per Shift',
      raw_pay: body.raw_pay || 800,
      venue_name: body.venue_name || null,
      location: body.location,
      lat: body.lat || null,
      lng: body.lng || null,
      date: body.date,
      date_type: body.date_type || 'upcoming',
      time: body.time,
      reporting_time: body.reporting_time || null,
      duration_hours: body.duration_hours || null,
      slots_total: body.slots_total || 1,
      slots_filled: 0,
      urgent: Boolean(body.urgent),
      instant_pay: Boolean(body.instant_pay),
      gender_req: body.gender_req || 'any',
      perks: Array.isArray(body.perks) ? body.perks : [],
      requirements: body.requirements || null,
      dress_code: body.dress_code || null,
      description: body.description || null,
      phone: body.phone || null,
      status: 'active',
      dealer_id: session?.user?.id || body.dealer_id || null,
    };

    // Use admin client if available (bypasses unauthenticated RLS for guest posts), otherwise session client
    const clientToUse = adminClient || serverClient;

    const { data: job, error } = await clientToUse
      .from('jobs')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(job, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
