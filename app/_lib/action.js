"use server";

import { auth, signIn, signOut } from "./auth";
import { updateGuest as updateGuestAPI } from "../_lib/data-service";
import { createBooking as createBookingAPI } from "../_lib/data-service";
import { deleteBooking as deleteBookingAPI } from "../_lib/data-service";
import { getBookings as getBookingsAPI } from "../_lib/data-service";
import { updateBooking as updateBookingAPI } from "../_lib/data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  // refer: http://localhost:3000/api/auth/providers
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // always treat all the inputs as unsafe (always start with authorization)
  const session = await auth();

  if (!session) throw new Error("Unauthorized Access");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const regex = /^\d{12}$/;

  if (!regex.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  // console.log(updateData);

  updateGuestAPI(session.user.guestId, updateData);

  // revalidate the catch, so the catch of this path will be claer and fetch again
  // make the data always fresh (up to date)
  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized Access");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  // console.log(newBooking);
  createBookingAPI(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinId}`);
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized Access");

  const guestBookings = await getBookingsAPI(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  deleteBookingAPI(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");

  const session = await auth();
  if (!session) throw new Error("Unauthorized Access");

  const guestBookings = await getBookingsAPI(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updatedData = { numGuests, observations };

  updateBookingAPI(bookingId, updatedData);
  redirect("/account/reservations");
}
