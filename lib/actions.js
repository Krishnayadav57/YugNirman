"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getAdmin,
  setAdminPassword,
  updateSettings,
  addService,
  updateService,
  deleteService,
  addPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateBooking,
  deleteBooking,
  updateMessage,
  deleteMessage,
} from "@/lib/db";
import { createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

// ---------- Auth ----------
export async function loginAction(prevState, formData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString() || "";
  const admin = getAdmin();

  if (!username || username !== admin.username) {
    return { error: "Invalid username or password." };
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return { error: "Invalid username or password." };
  }
  const token = await createSessionToken(username);
  setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  clearSessionCookie();
  redirect("/admin/login");
}

export async function changePasswordAction(prevState, formData) {
  await requireAdmin();
  const current = formData.get("current")?.toString() || "";
  const next = formData.get("next")?.toString() || "";
  const admin = getAdmin();
  const valid = await bcrypt.compare(current, admin.passwordHash);
  if (!valid) return { error: "Current password is incorrect." };
  if (next.length < 8) return { error: "New password must be at least 8 characters." };
  const hash = await bcrypt.hash(next, 10);
  setAdminPassword(hash);
  return { success: "Password updated." };
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
