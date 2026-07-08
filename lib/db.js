import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function readDb() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDb(db) {
  const tmp = DB_PATH + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), "utf-8");
  fs.renameSync(tmp, DB_PATH);
}

// ---------- Settings ----------
export function getSettings() {
  return readDb().settings;
}
export function updateSettings(patch) {
  const db = readDb();
  db.settings = { ...db.settings, ...patch, socials: { ...db.settings.socials, ...(patch.socials || {}) } };
  writeDb(db);
  return db.settings;
}

// ---------- Generic collection helpers ----------
function getCollection(name) {
  return readDb()[name] || [];
}
function addItem(name, item) {
  const db = readDb();
  const record = { id: `${name.slice(0, 3)}_${nanoid(10)}`, createdAt: new Date().toISOString(), ...item };
  db[name] = [record, ...(db[name] || [])];
  writeDb(db);
  return record;
}
function updateItem(name, id, patch) {
  const db = readDb();
  let updated = null;
  db[name] = (db[name] || []).map((it) => {
    if (it.id === id) {
      updated = { ...it, ...patch };
      return updated;
    }
    return it;
  });
  writeDb(db);
  return updated;
}
function deleteItem(name, id) {
  const db = readDb();
  db[name] = (db[name] || []).filter((it) => it.id !== id);
  writeDb(db);
  return true;
}

// ---------- Services ----------
export const getServices = () => getCollection("services");
export const getServiceBySlug = (slug) => getServices().find((s) => s.slug === slug);
export const addService = (data) => addItem("services", data);
export const updateService = (id, data) => updateItem("services", id, data);
export const deleteService = (id) => deleteItem("services", id);

// ---------- Portfolio ----------
export const getPortfolio = () => getCollection("portfolio");
export const addPortfolioItem = (data) => addItem("portfolio", data);
export const updatePortfolioItem = (id, data) => updateItem("portfolio", id, data);
export const deletePortfolioItem = (id) => deleteItem("portfolio", id);

// ---------- Testimonials ----------
export const getTestimonials = () => getCollection("testimonials");
export const addTestimonial = (data) => addItem("testimonials", data);
export const updateTestimonial = (id, data) => updateItem("testimonials", id, data);
export const deleteTestimonial = (id) => deleteItem("testimonials", id);

// ---------- Bookings ----------
export const getBookings = () => getCollection("bookings");
export const addBooking = (data) => addItem("bookings", { ...data, status: "new" });
export const updateBooking = (id, data) => updateItem("bookings", id, data);
export const deleteBooking = (id) => deleteItem("bookings", id);

// ---------- Contact Messages ----------
export const getMessages = () => getCollection("messages");
export const addMessage = (data) => addItem("messages", { ...data, read: false });
export const updateMessage = (id, data) => updateItem("messages", id, data);
export const deleteMessage = (id) => deleteItem("messages", id);
