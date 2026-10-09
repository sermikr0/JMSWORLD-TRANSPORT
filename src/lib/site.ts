/**
 * Single source of truth for verified company information.
 * Everything shown on the site, in metadata and in structured data reads from here.
 */
export const site = {
  legalName: "JMSWORLD TRANSPORT LLC",
  shortName: "JMSWORLD",
  tagline: "Moving Freight. Building Trust.",
  description:
    "JMSWORLD TRANSPORT LLC is a transportation company based in Norwood, Ohio. Request a freight quote or contact our team. USDOT 3642835 · MC 1252524.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  phone: {
    display: "+1 (513) 960-0090",
    e164: "+15139600090",
  },
  address: {
    street: "1701 Mills Ave",
    city: "Norwood",
    region: "OH",
    regionLong: "Ohio",
    postalCode: "45212",
    country: "US",
    line: "1701 Mills Ave, Norwood, OH 45212",
    full: "1701 Mills Ave, Norwood, OH 45212, USA",
  },
  usdot: "3642835",
  mc: "1252524",
  fmcsa: {
    // Official FMCSA SAFER company snapshot for this USDOT number.
    snapshot:
      "https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=3642835",
    // SAFER search portal, in case the direct query format changes.
    search: "https://safer.fmcsa.dot.gov/CompanySnapshot.aspx",
    // FMCSA Licensing & Insurance public search.
    licensing:
      "https://li-public.fmcsa.dot.gov/LIVIEW/pkg_carrquery.prc_carrlist",
  },
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=1701+Mills+Ave%2C+Norwood%2C+OH+45212",
    place:
      "https://www.google.com/maps/search/?api=1&query=1701+Mills+Ave%2C+Norwood%2C+OH+45212",
  },
} as const;

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/compliance", label: "Compliance" },
    { href: "/privacy", label: "Privacy" },
  ],
  getStarted: [
    { href: "/quote", label: "Request a Quote" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const telHref = `tel:${site.phone.e164}`;
