import type { Page } from "../types";

// Cards without a `logo` show the name as text. To add a logo, save it to
// public/images/sponsors/ and add e.g. logo: "/images/sponsors/ameren.png".
// Names below were read off a screenshot — double-check spelling before launch.
export const currentSponsors: Page = {
  slug: "current-sponsors",
  title: "Current Donors & Sponsors",
  description: "The universities, organizations, and individuals whose support makes IJAS possible.",
  hero: { title: "Current Donors & Sponsors" },
  blocks: [
    { type: "sectionHeader", tone: "navy", title: "University Hosts" },
    {
      type: "richText",
      centered: true,
      markdown: `**Thank you to all of our incredible Donors & Sponsors, your support makes IJAS possible!**`,
    },
    {
      type: "logoGrid",
      size: "lg",
      items: [
        { name: "University of Illinois Urbana-Champaign" },
        { name: "Bradley University" },
        { name: "Southern Illinois University Carbondale" },
      ],
    },

    // ── 2026 ─────────────────────────────────────────────────
    { type: "sectionHeader", tone: "light", title: "2026 Donors and Event Sponsors" },
    {
      type: "logoGrid",
      title: "Platinum Sponsors:",
      size: "md",
      items: [
        { name: "University of Illinois Urbana-Champaign" },
        { name: "Illinois State Academy of Science" },
      ],
    },
    {
      type: "logoGrid",
      title: "Gold Sponsors:",
      items: [
        { name: "Ameren Illinois" },
        { name: "Experience Champaign-Urbana" },
        { name: "Matthew & Emily Dawson" },
      ],
    },
    {
      type: "logoGrid",
      title: "Silver Sponsors:",
      items: [
        { name: "Accelsius" },
        { name: "Illinois Soybean Association" },
        { name: "EssayGrader" },
        { name: "Illinois Water Environment Association" },
        { name: "Jay and Jeremy Hoffmann Memorial Fund" },
        { name: "Ball" },
      ],
    },
    {
      type: "logoGrid",
      title: "Bronze Sponsors:",
      items: [
        { name: "Kevin Keehn" },
        { name: "Lokesh Family" },
        { name: "Ali Uslu" },
        { name: "Jann Hawkins" },
        { name: "Perfection Plating" },
        { name: "American Water Works Association – Illinois Section" },
        { name: "Illinois Academy of Audiology" },
        { name: "Hanson" },
        { name: "Maurer-Stutz" },
        { name: "IPRB" },
        { name: "Illinois Psychological Association" },
        { name: "Illinois Environmental Protection Agency" },
        { name: "Association of Environmental & Engineering Geologists" },
        { name: "American Nuclear Society" },
      ],
    },
    {
      type: "logoGrid",
      title: "EPIC Partners:",
      items: [
        { name: "ASCE Central Illinois Section" },
        { name: "Illinois Department of Natural Resources" },
        { name: "Cruce Agricultural Aviation" },
      ],
    },
    {
      type: "logoGrid",
      title: "Special Award Sponsors:",
      items: [
        { name: "The Morton Arboretum" },
        { name: "Chicago Fire" },
        { name: "The Lemelson Foundation" },
      ],
    },
    {
      type: "logoGrid",
      title: "Friends of IJAS:",
      size: "sm",
      items: [
        { name: "Griffins' Catering" },
        { name: "Bev Friend" },
        { name: "Jonathan Langton" },
        { name: "Jay Hoffman" },
        { name: "Oriental Trading" },
        { name: "Museum of Science and Industry, Chicago" },
      ],
    },

    // ── Past ─────────────────────────────────────────────────
    { type: "sectionHeader", tone: "light", title: "Past Donors & Sponsors" },
    {
      type: "logoGrid",
      size: "sm",
      items: [
        // TODO: first two logos were unreadable in the screenshot — fill in names
        { name: "Past sponsor 1" },
        { name: "Past sponsor 2" },
        { name: "Discover Peoria" },
        { name: "The DeVry Foundation" },
        { name: "Thoughtwave" },
        { name: "Illinois Pathways" },
        { name: "ASCE Central Illinois Section" },
        { name: "Decatur Area Convention & Visitors Bureau" },
        { name: "National Anti-Vivisection Society" },
        { name: "American Association of Zoo Keepers" },
        { name: "Illinois State Geological Survey" },
        { name: "USG" },
        { name: "Omron" },
        { name: "Apple Dental" },
        { name: "Daigger Scientific" },
        { name: "The Cohen Family" },
        { name: "Peaceable Primate Sanctuary" },
        { name: "Takeda" },
        { name: "BASF" },
        { name: "Northrop Grumman" },
        { name: "Oberweis Farms" },
      ],
    },
  ],
};