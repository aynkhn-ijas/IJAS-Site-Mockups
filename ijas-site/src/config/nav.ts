// The site's navigation, in one place. Header uses it now; Footer can use it too.
// Add a page to the menu by adding a line here — no component changes needed.

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Membership", href: "/membership" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  { label: "Students", href: "/students" },
  { label: "Teachers", href: "/teachers" },
  {
    label: "Support",
    children: [
      { label: "Become a Sponsor", href: "/sponsorship" },
      { label: "Donate to IJAS", href: "/donations" },
      { label: "Current Sponsors", href: "/current-sponsors" },
    ],
  },
  {
    label: "Volunteer",
    children: [
      // TODO: confirm "Volunteer" is the Judges page on the live site
      { label: "Volunteer", href: "/judges" },
      { label: "Student Runners", href: "/runners" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Resources", href: "/resources" },
      { label: "Rules & Forms", href: "/rules" },
      { label: "Office Hours/How-To-Videos", href: "/office-hours" },
      { label: "Category Guide", href: "/category-guide" },
      // TODO: real URL (probably the members portal)
      { label: "Find My School Number", href: "#" },
    ],
  },
  {
    label: "Competition",
    children: [
      { label: "Regional Science Fairs", href: "/regional-expositions" },
      { label: "State Exposition 2027", href: "/state" },
      { label: "Additional Contests", href: "/contests" },
      { label: "IJAS – ISEF", href: "/isef" },
    ],
  },
];

export const hasChildren = (item: NavItem): item is { label: string; children: NavLink[] } => "children" in item;