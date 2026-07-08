"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  updateSettings,
  addService,
  updateService,
  deleteService,
  addPortfolioItem,
  deletePortfolioItem,
  addTestimonial,
  deleteTestimonial,
  updateBooking,
  deleteBooking,
  updateMessage,
  deleteMessage,
} from "@/lib/db";

async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") throw new Error("Unauthorized");
  return user;
}

// ---------- Admin auth ----------
export async function loginAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString() || "";
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Invalid email or password." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "This account doesn't have admin access." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------- Customer auth ----------
export async function userSignupAction(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString() || "";
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) return { error: error.message };
  return { success: "Account created. Check your email to confirm, then sign in." };
}

export async function userLoginAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString() || "";
  const redirectTo = formData.get("redirectTo")?.toString() || "/account";

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Invalid email or password." };

  redirect(redirectTo);
}

export async function userLogoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ---------- Settings ----------
export async function updateSettingsAction(formData) {
  await requireAdmin();
  const patch = {
    companyName: formData.get("companyName")?.toString(),
    tagline: formData.get("tagline")?.toString(),
    mission: formData.get("mission")?.toString(),
    vision: formData.get("vision")?.toString(),
    email: formData.get("email")?.toString(),
    phone: formData.get("phone")?.toString(),
    whatsapp: formData.get("whatsapp")?.toString(),
    address: formData.get("address")?.toString(),
    mapEmbedUrl: formData.get("mapEmbedUrl")?.toString(),
    legal: {
      registrationNo: formData.get("registrationNo")?.toString() || "",
      panNo: formData.get("panNo")?.toString() || "",
      vatNo: formData.get("vatNo")?.toString() || "",
      registeredAddress: formData.get("registeredAddress")?.toString() || "",
    },
    socials: {
      facebook: formData.get("facebook")?.toString() || "",
      instagram: formData.get("instagram")?.toString() || "",
      linkedin: formData.get("linkedin")?.toString() || "",
      x: formData.get("x")?.toString() || "",
      youtube: formData.get("youtube")?.toString() || "",
      github: formData.get("github")?.toString() || "",
      tiktok: formData.get("tiktok")?.toString() || "",
      whatsapp: formData.get("whatsappLink")?.toString() || "",
    },
  };
  updateSettings(patch);
  revalidatePath("/", "layout");
}

// ---------- Services ----------
export async function createServiceAction(formData) {
  await requireAdmin();
  addService({
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    icon: formData.get("icon")?.toString(),
    shortDesc: formData.get("shortDesc")?.toString(),
    description: formData.get("description")?.toString(),
    features: (formData.get("features")?.toString() || "").split(",").map((f) => f.trim()).filter(Boolean),
    startingPrice: formData.get("startingPrice")?.toString(),
  });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function editServiceAction(id, formData) {
  await requireAdmin();
  updateService(id, {
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    icon: formData.get("icon")?.toString(),
    shortDesc: formData.get("shortDesc")?.toString(),
    description: formData.get("description")?.toString(),
    features: (formData.get("features")?.toString() || "").split(",").map((f) => f.trim()).filter(Boolean),
    startingPrice: formData.get("startingPrice")?.toString(),
  });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function removeServiceAction(id) {
  await requireAdmin();
  deleteService(id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

// ---------- Portfolio ----------
export async function createPortfolioAction(formData) {
  await requireAdmin();
  addPortfolioItem({
    title: formData.get("title")?.toString(),
    description: formData.get("description")?.toString(),
    tags: (formData.get("tags")?.toString() || "").split(",").map((t) => t.trim()).filter(Boolean),
    liveUrl: formData.get("liveUrl")?.toString(),
    githubUrl: formData.get("githubUrl")?.toString(),
  });
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

export async function removePortfolioAction(id) {
  await requireAdmin();
  deletePortfolioItem(id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
}

// ---------- Testimonials ----------
export async function createTestimonialAction(formData) {
  await requireAdmin();
  addTestimonial({
    name: formData.get("name")?.toString(),
    role: formData.get("role")?.toString(),
    quote: formData.get("quote")?.toString(),
    rating: Number(formData.get("rating")) || 5,
  });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function removeTestimonialAction(id) {
  await requireAdmin();
  deleteTestimonial(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// ---------- Bookings ----------
export async function updateBookingStatusAction(id, formData) {
  await requireAdmin();
  const status = formData.get("status")?.toString();
  updateBooking(id, { status });
  revalidatePath("/admin/bookings");
}

export async function removeBookingAction(id) {
  await requireAdmin();
  deleteBooking(id);
  revalidatePath("/admin/bookings");
}

// ---------- Messages ----------
export async function markMessageReadAction(id, read) {
  await requireAdmin();
  updateMessage(id, { read });
  revalidatePath("/admin/messages");
}

export async function removeMessageAction(id) {
  await requireAdmin();
  deleteMessage(id);
  revalidatePath("/admin/messages");
}
