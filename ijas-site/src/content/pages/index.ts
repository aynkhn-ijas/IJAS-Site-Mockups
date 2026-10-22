import type { Page } from "../types";
import { isef } from "./isef";
import { judges } from "./judges";
import { membership } from "./membership";
import { newsletter } from "./newsletter";
import { sponsorship } from "./sponsorship";
import { donations } from "./donations";
import { currentSponsors } from "./current-sponsors";
import { runners } from "./runners";
import { rules } from "./rules";
import { officeHours } from "./office-hours";
import { regionalExpositions } from "./regional-expositions";
import { state } from "./state";

export const pages: Record<string, Page> = {
  [isef.slug]: isef,
  [judges.slug]: judges,
  [membership.slug]: membership,
  [newsletter.slug]: newsletter,
  [sponsorship.slug]: sponsorship,
  [donations.slug]: donations,
  [currentSponsors.slug]: currentSponsors,
  [runners.slug]: runners,
  [rules.slug]: rules,
  [officeHours.slug]: officeHours,
  [regionalExpositions.slug]: regionalExpositions,
  [state.slug]: state,
};