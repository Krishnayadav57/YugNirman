import { createAdminClient } from "@/utils/supabase/admin";

function mapService(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    icon: row.icon,
    shortDesc: row.short_desc,
    description: row.description,
    features: row.features || [],
    startingPrice: row.starting_price,
  };
}

function mapPortfolio(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    tags: row.tags || [],
    liveUrl: row.live_url,
    githubUrl: row.github_url,
    createdAt: row.created_at,
  };
}

function mapTestimonial(row) {
  if (!row) return null;
  return { id: row.id, name: row.name, role: row.role, quote: row.quote, rating: row.rating, createdAt: row.created_at };
}

function mapBooking(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    serviceId: row.service_id,
    budget: row.budget,
    timeline: row.timeline,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapMessage(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}

function mapSettings(row) {
  if (!row) return null;
  return {
    companyName: row.company_name,
    tagline: row.tagline,
    mission: row.mission,
    vision: row.vision,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp,
    address: row.address,
    mapEmbedUrl: row.map_embed_url,
    legal: row.legal || {},
    socials: row.socials || {},
  };
}

// ---------- Settings ----------
export async function getSettings() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("settings").select("*").eq("id", "main").single();
  if (error) throw error;
  return mapSettings(data);
}

export async function updateSettings(patch) {
  const supabase = createAdminClient();
  const current = await getSettings();
  const update = {
    company_name: patch.companyName ?? current.companyName,
    tagline: patch.tagline ?? current.tagline,
    mission: patch.mission ?? current.mission,
    vision: patch.vision ?? current.vision,
    email: patch.email ?? current.email,
    phone: patch.phone ?? current.phone,
    whatsapp: patch.whatsapp ?? current.whatsapp,
    address: patch.address ?? current.address,
    map_embed_url: patch.mapEmbedUrl ?? current.mapEmbedUrl,
    legal: { ...current.legal, ...(patch.legal || {}) },
    socials: { ...current.socials, ...(patch.socials || {}) },
  };
  const { data, error } = await supabase.from("settings").update(update).eq("id", "main").select().single();
  if (error) throw error;
  return mapSettings(data);
}

// ---------- Services ----------
export async function getServices() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapService);
}

export async function getServiceBySlug(slug) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("services").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return mapService(data);
}

export async function addService(data) {
  const supabase = createAdminClient();
  const id = `svc_${crypto.randomUUID().slice(0, 8)}`;
  const { data: row, error } = await supabase
    .from("services")
    .insert({
      id,
      title: data.title,
      slug: data.slug,
      icon: data.icon,
      short_desc: data.shortDesc,
      description: data.description,
      features: data.features || [],
      starting_price: data.startingPrice,
    })
    .select()
    .single();
  if (error) throw error;
  return mapService(row);
}

export async function updateService(id, data) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("services")
    .update({
      title: data.title,
      slug: data.slug,
      icon: data.icon,
      short_desc: data.shortDesc,
      description: data.description,
      features: data.features || [],
      starting_price: data.startingPrice,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapService(row);
}

export async function deleteService(id) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---------- Portfolio ----------
export async function getPortfolio() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapPortfolio);
}

export async function addPortfolioItem(data) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("portfolio")
    .insert({
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      live_url: data.liveUrl || null,
      github_url: data.githubUrl || null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapPortfolio(row);
}

export async function deletePortfolioItem(id) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---------- Testimonials ----------
export async function getTestimonials() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapTestimonial);
}

export async function addTestimonial(data) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("testimonials")
    .insert({ name: data.name, role: data.role, quote: data.quote, rating: data.rating || 5 })
    .select()
    .single();
  if (error) throw error;
  return mapTestimonial(row);
}

export async function deleteTestimonial(id) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---------- Bookings ----------
export async function getBookings() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapBooking);
}

export async function addBooking(data) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("bookings")
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || null,
      service_id: data.serviceId,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.message || null,
      status: "new",
    })
    .select()
    .single();
  if (error) throw error;
  return mapBooking(row);
}

export async function updateBooking(id, data) {
  const supabase = createAdminClient();
  const update = {};
  if (data.status) update.status = data.status;
  const { data: row, error } = await supabase.from("bookings").update(update).eq("id", id).select().single();
  if (error) throw error;
  return mapBooking(row);
}

export async function deleteBooking(id) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ---------- Messages ----------
export async function getMessages() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapMessage);
}

export async function addMessage(data) {
  const supabase = createAdminClient();
  const { data: row, error } = await supabase
    .from("messages")
    .insert({ name: data.name, email: data.email, subject: data.subject, message: data.message, read: false })
    .select()
    .single();
  if (error) throw error;
  return mapMessage(row);
}

export async function updateMessage(id, data) {
  const supabase = createAdminClient();
  const update = {};
  if (typeof data.read === "boolean") update.read = data.read;
  const { data: row, error } = await supabase.from("messages").update(update).eq("id", id).select().single();
  if (error) throw error;
  return mapMessage(row);
}

export async function deleteMessage(id) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
  return true;
}
