"use server";

import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/config";

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "success" | "pending" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "message", string>>;
  /** What was submitted, returned on error so the form can refill itself:
      React resets a form after every action, valid or not. */
  values?: ContactValues;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const t = await getTranslations("ContactPage");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = t("required");
  if (!email) errors.email = t("required");
  else if (!emailPattern.test(email)) errors.email = t("invalidEmail");
  if (!message) errors.message = t("required");

  const payload = { name, email, phone, organization, message };

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: t("error"), errors, values: payload };
  }

  if (!siteConfig.contactFormEndpoint) {
    return {
      status: "pending",
      // DRAFT — պատվիրատուի հաստատման կարիք ունի (success)
      message: t("success"),
      errors: {},
    };
  }

  try {
    const response = await fetch(siteConfig.contactFormEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return { status: "error", message: t("error"), errors: {}, values: payload };
    }
    return { status: "success", message: t("forwarded"), errors: {} };
  } catch {
    return { status: "error", message: t("error"), errors: {}, values: payload };
  }
}
