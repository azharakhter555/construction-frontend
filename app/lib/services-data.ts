// lib/services-data.ts

export interface ServiceDetail {
  slug: string;
  label: string;
  tagline: string;
  shortDescription: string;
  heroTitle: string;
  heroDescription: string;
  image: string;
  overview: string[];
  features: { title: string; description: string }[];
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const SERVICES_DETAIL: ServiceDetail[] = [
  // ============================================================
  // 1. SUSPENDED CEILINGS
  // ============================================================
  {
    slug: "suspended-ceilings",
    label: "Suspended Ceilings",
    tagline: "Suspended Ceilings in Dublin",
    shortDescription:
      "Professional suspended ceiling installation across Dublin and Ireland. From standard grid systems to bespoke feature ceilings with integrated lighting and acoustic performance.",
    heroTitle: 'Suspended Ceiling <span class="text-secondary">Installation</span> in Dublin',
    heroDescription:
      "Five Star Property Maintenance install suspended ceilings across Dublin and Ireland — from standard grid systems in busy offices to bespoke acoustic and feature ceilings in retail, healthcare and education. Every install is measured on-site, quoted clearly, and finished to a professional standard.",
    image: "/assets/services/suspended-ceilings.jpg",
    overview: [
      "Suspended ceilings are a fast, cost-effective way to hide services above (wiring, ductwork, sprinklers), improve acoustics, and create a clean, modern finish. They also give you full access to services above the ceiling for maintenance — no destructive work required.",
      "We install all types of suspended ceiling systems: standard mineral fibre grid, metal tile, acoustic, moisture-resistant, and fire-rated. If you need a specific tile type or a system that meets a particular acoustic or fire standard, we can source and install it.",
    ],
    features: [
      {
        title: "Standard Grid Systems",
        description:
          "Classic 600x600 mineral fibre or metal tile grids — the workhorse of commercial ceilings. Quick to install, easy to maintain, and cost-effective.",
      },
      {
        title: "Acoustic Ceilings",
        description:
          "High-performance acoustic tiles that reduce noise transfer between floors and improve speech clarity in open-plan spaces, meeting rooms and classrooms.",
      },
      {
        title: "Fire-Rated Systems",
        description:
          "Suspended ceilings tested and certified to fire resistance standards, with integrated fire sealing where required for full building compliance.",
      },
      {
        title: "Moisture-Resistant Tiles",
        description:
          "Vinyl-coated and moisture-resistant tiles for bathrooms, kitchens, canteens and healthcare environments where humidity is a factor.",
      },
      {
        title: "Integrated Lighting",
        description:
          "Recessed downlights, LED panels, linear lighting and emergency lighting fully integrated into the ceiling grid — no compromises on finish.",
      },
      {
        title: "Service Access",
        description:
          "Access panels and hinged tiles fitted as standard, so plumbers, electricians and IT can get to services above without damaging the ceiling.",
      },
    ],
    benefits: [
      "Free call-out, measure-up and quotation",
      "Sample tiles shown on-site before you commit",
      "Minimal disruption to your operations",
      "Full compliance with building regulations",
      "Clean, tidy finish — full site cleanup included",
      "Fully insured, Safe Pass certified crew",
    ],
    process: [
      {
        step: "01",
        title: "Free call-out",
        description:
          "We visit your site, measure the space, and discuss tile options and any acoustic or fire requirements.",
      },
      {
        step: "02",
        title: "Sample tiles & quote",
        description:
          "We bring sample tiles on-site, so you can see and feel the finish before deciding. You get a clear, itemised quote.",
      },
      {
        step: "03",
        title: "Professional installation",
        description:
          "Our team installs the ceiling system on the agreed dates — working around your business hours where needed.",
      },
      {
        step: "04",
        title: "Final walkthrough",
        description:
          "We walk the finished ceiling with you, check every detail, and clean up the site before we leave.",
      },
    ],
    faqs: [
      {
        question: "How long does a suspended ceiling installation take?",
        answer:
          "Most standard installations are completed in 2–5 days, depending on the total area and complexity. We confirm the exact timeline in your quote and stick to it.",
      },
      {
        question: "Can you install a ceiling while my office is still open?",
        answer:
          "Yes. We often work evenings or weekends, or section off areas so business can continue. We'll plan the schedule around your operations.",
      },
      {
        question: "Do suspended ceilings reduce noise?",
        answer:
          "Yes, with the right acoustic tiles. A standard grid ceiling helps, but high-performance acoustic tiles make a noticeable difference between floors and rooms.",
      },
      {
        question: "What's the difference between a suspended ceiling and a plasterboard ceiling?",
        answer:
          "Suspended ceilings use a metal grid and removable tiles — easy access to services above. Plasterboard ceilings are solid, seamless and give a more premium finish but cost more and require cutting for access.",
      },
      {
        question: "Can you match an existing ceiling tile?",
        answer:
          "In most cases yes. Bring a sample or tell us the tile pattern and we'll source a match. Some discontinued tiles may not be an exact match — we'll tell you upfront.",
      },
    ],
    relatedSlugs: ["plasterboard-ceilings", "commercial-ceiling-repairs", "fire-sealing"],
  },

  // ============================================================
  // 2. PLASTERBOARD CEILINGS
  // ============================================================
  {
    slug: "plasterboard-ceilings",
    label: "Plasterboard Ceilings",
    tagline: "Plasterboard Ceilings in Dublin",
    shortDescription:
      "Bespoke plasterboard and feature ceilings designed and finished to a professional standard. Clean lines, seamless finishes and full integration with lighting and services.",
    heroTitle: 'Plasterboard &amp; Feature <span class="text-secondary">Ceilings</span> in Dublin',
    heroDescription:
      "Five Star Property Maintenance install bespoke plasterboard ceilings — from simple seamless ceilings to complex feature work with floating bulkheads, coffer details and integrated lighting. Finished to a smooth, paint-ready standard every time.",
    image: "/assets/services/plasterboard-ceilings.jpg",
    overview: [
      "Plasterboard ceilings give you a seamless, solid surface with no visible grid — ideal when you want a premium finish. They're also the best choice for feature work: floating bulkheads, coffers, curved elements, and lighting details that a grid ceiling can't achieve.",
      "We handle the full job — from framing and boarding through to taping, jointing and finishing. The result is a smooth, paint-ready surface that looks clean for decades. For access to services above, we can install hidden access panels that blend into the ceiling.",
    ],
    features: [
      {
        title: "Seamless Finish",
        description:
          "No visible grid or tile lines. The ceiling becomes a single, continuous surface — ideal for premium residential and commercial spaces.",
      },
      {
        title: "Feature Ceilings",
        description:
          "Coffers, floating bulkheads, curved sections, stepped details — bespoke plasterboard work that turns a ceiling into a design feature.",
      },
      {
        title: "Integrated Lighting Details",
        description:
          "Recessed lighting slots, LED coves, and shadow gaps integrated into the plasterboard — the ceiling and lighting designed as one.",
      },
      {
        title: "Fire-Rated Plasterboard",
        description:
          "Fire-rated plasterboard systems for ceilings requiring a fire resistance rating, fully certified and compliant.",
      },
      {
        title: "Acoustic Plasterboard",
        description:
          "Acoustic plasterboard and resilient bar systems that reduce noise transfer between floors.",
      },
      {
        title: "Paint-Ready Finish",
        description:
          "Taped, jointed and sanded to a smooth finish — ready for your painter to apply the final coats.",
      },
    ],
    benefits: [
      "Free call-out, measure-up and quotation",
      "Bespoke design consultation",
      "Seamless, paint-ready finish",
      "Integrated lighting and access panels",
      "Fire-rated and acoustic options available",
      "Minimal disruption, tidy workspace",
    ],
    process: [
      {
        step: "01",
        title: "Design consultation",
        description:
          "We discuss your vision, look at the space, and talk through feature options — bulkheads, lighting, shape.",
      },
      {
        step: "02",
        title: "Measure-up & quote",
        description:
          "Precise measurements and a clear, itemised quote. No surprises on price or timeline.",
      },
      {
        step: "03",
        title: "Framing, boarding & finishing",
        description:
          "Metal frame, plasterboard, taping, jointing, sanding — installed to a paint-ready finish.",
      },
      {
        step: "04",
        title: "Final inspection",
        description:
          "We walk the finished ceiling with you — checking every joint, edge and detail before handover.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between plasterboard and a suspended ceiling?",
        answer:
          "Plasterboard ceilings are solid — seamless, painted, no visible grid. Suspended ceilings use a metal grid and removable tiles. Plasterboard gives a premium finish but costs more and requires access panels for services.",
      },
      {
        question: "How long does a plasterboard ceiling take?",
        answer:
          "A typical room takes 2–3 days from framing to paint-ready finish. Larger or more complex feature work takes longer — we confirm the timeline in your quote.",
      },
      {
        question: "Can I have lighting in a plasterboard ceiling?",
        answer:
          "Yes — that's one of plasterboard's strengths. Recessed downlights, LED coves, linear slots and shadow gaps all integrate beautifully into a plasterboard ceiling.",
      },
      {
        question: "How do I access services above a plasterboard ceiling?",
        answer:
          "We fit hidden access panels that are flush with the ceiling and blend in once painted. They open to give full access to wiring, ductwork and valves above.",
      },
      {
        question: "Does it need to be painted straight away?",
        answer:
          "Not necessarily, but we recommend painting within a few weeks to protect the finish. The ceiling is delivered paint-ready — your painter applies the top coats.",
      },
    ],
    relatedSlugs: ["suspended-ceilings", "office-partitions", "fire-sealing"],
  },

  // ============================================================
  // 3. COMMERCIAL CEILING REPAIRS
  // ============================================================
  {
    slug: "commercial-ceiling-repairs",
    label: "Commercial Ceiling Repairs",
    tagline: "Commercial Ceiling Repairs in Dublin",
    shortDescription:
      "Fast, reliable commercial ceiling repairs for Dublin businesses. We replace damaged tiles, repair grids and make safe water-damaged ceilings with minimal disruption.",
    heroTitle: 'Commercial Ceiling <span class="text-secondary">Repairs</span> in Dublin',
    heroDescription:
      "Water damage, broken tiles, sagging grids — we fix commercial ceilings fast, with minimal disruption to your business. Five Star Property Maintenance work evenings and weekends when needed, so your operations never stop.",
    image: "/assets/services/ceiling-repairs.jpg",
    overview: [
      "Ceilings take a beating in commercial spaces — leaks from above, impact damage, broken tiles, sagging grids, discoloured tiles. Left alone, small issues turn into expensive ones: further water damage, safety hazards, and a workspace that looks neglected.",
      "We handle all types of commercial ceiling repairs — single tile replacements, partial grid rebuilds, water-damaged sections, and full ceiling replacements when repair isn't cost-effective. Fast turnaround, honest advice on whether to repair or replace.",
    ],
    features: [
      {
        title: "Damaged Tile Replacement",
        description:
          "Single or bulk tile replacement — matched to your existing ceiling tiles wherever possible.",
      },
      {
        title: "Grid Repairs",
        description:
          "Damaged or sagging grid sections repaired or rebuilt — restoring the ceiling to a level, clean finish.",
      },
      {
        title: "Water Damage Repairs",
        description:
          "Full assessment after a leak or flood — removing damaged tiles, checking the grid, replacing what needs replacing.",
      },
      {
        title: "Sagging & Sag Repair",
        description:
          "Sagging ceiling sections identified and corrected — often caused by moisture, wrong tile type, or failed fixings.",
      },
      {
        title: "Emergency Response",
        description:
          "Available for urgent repairs — a phone call and we can be on-site quickly to make a ceiling safe.",
      },
      {
        title: "Repair or Replace Advice",
        description:
          "Honest assessment: when a repair is the right call, and when replacing the whole ceiling is more cost-effective.",
      },
    ],
    benefits: [
      "Fast turnaround — often same-day for smaller jobs",
      "Evening and weekend work available",
      "Matched tiles wherever possible",
      "Fully insured, Safe Pass certified crew",
      "Clear quotes before work begins",
      "Full cleanup after repair",
    ],
    process: [
      {
        step: "01",
        title: "Call & assessment",
        description:
          "Call us, describe the damage, and send a photo — we'll advise on the likely fix and cost range.",
      },
      {
        step: "02",
        title: "On-site inspection",
        description:
          "For larger or complex damage, we call out to inspect — checking the grid, tiles, and any underlying issues.",
      },
      {
        step: "03",
        title: "Repair or rebuild",
        description:
          "We carry out the repair — replacing tiles, rebuilding grid, fixing sagging sections, addressing water damage.",
      },
      {
        step: "04",
        title: "Sign-off",
        description:
          "You inspect the repair with us, confirm it looks right, and we clean up before leaving.",
      },
    ],
    faqs: [
      {
        question: "How quickly can you get to a repair?",
        answer:
          "For smaller repairs, often same-day or next-day. For urgent safety issues, call us directly and we'll get to you as quickly as we can.",
      },
      {
        question: "Can you match my existing tiles?",
        answer:
          "In most cases yes. Some tiles may be discontinued — if we can't source an exact match, we'll show you the closest options before proceeding.",
      },
      {
        question: "Will you need to close my shop/office?",
        answer:
          "Usually not. For most repairs we work around your business — evenings, weekends, or sectioned-off areas. We'll confirm the plan in advance.",
      },
      {
        question: "Is water-damaged ceiling a safety issue?",
        answer:
          "Yes — water-damaged tiles lose strength and can sag or collapse. If you've had a leak, have the ceiling inspected as soon as possible.",
      },
      {
        question: "Do you repair or replace?",
        answer:
          "Depends on the extent. Single tiles or a small grid section — repair. Widespread water damage or an ageing ceiling — replacement is usually more cost-effective long-term. We'll tell you honestly.",
      },
    ],
    relatedSlugs: ["suspended-ceilings", "fire-sealing", "shop-ceiling-installation"],
  },

  // ============================================================
  // 4. SHOP CEILING INSTALLATION
  // ============================================================
  {
    slug: "shop-ceiling-installation",
    label: "Shop Ceiling Installation",
    tagline: "Shop Ceiling Installation in Dublin",
    shortDescription:
      "Specialist ceiling solutions for retail environments. Suspended and plasterboard ceilings that enhance customer experience, improve acoustics and allow flexible lighting and signage layouts.",
    heroTitle: 'Shop Ceiling <span class="text-secondary">Installation</span> in Dublin',
    heroDescription:
      "Retail ceilings do more than hide services — they set the atmosphere, absorb noise, and support your lighting and signage. Five Star Property Maintenance install shop ceilings that lift the customer experience while keeping your business trading through the project.",
    image: "/assets/services/shop-ceilings.jpg",
    overview: [
      "A retail ceiling is one of the biggest visual surfaces in the store — and one of the most overlooked. The wrong ceiling kills atmosphere; the right one makes everything else in the store look better. It also controls acoustics (retail spaces are noisy), hides lighting and signage infrastructure, and lets you reconfigure the store layout without breaking open the ceiling.",
      "We work with shops, showrooms, cafés and restaurants across Dublin — designing and installing suspended grid ceilings, plasterboard feature ceilings, and open-grid systems that suit the brand. Installation is scheduled around business hours so you don't lose trading days.",
    ],
    features: [
      {
        title: "Suspended Grid Ceilings",
        description:
          "Standard or bespoke tile grids — cost-effective, easy to maintain, and compatible with signage and lighting changes.",
      },
      {
        title: "Feature Ceilings",
        description:
          "Plasterboard, timber, metal or open-grid ceiling features that become a design statement and reinforce brand identity.",
      },
      {
        title: "Acoustic Tiles",
        description:
          "High-absorption tiles that reduce noise levels in busy retail and hospitality spaces — critical for customer comfort.",
      },
      {
        title: "Signage Integration",
        description:
          "Ceiling-mounted signage, hanging rails, and cable management planned into the ceiling layout from day one.",
      },
      {
        title: "Lighting Layouts",
        description:
          "Track lighting, recessed spots, LED panels and feature lighting installed as part of the ceiling system.",
      },
      {
        title: "Out-of-Hours Install",
        description:
          "We work evenings, nights and weekends so your shop stays open — you don't lose trade during installation.",
      },
    ],
    benefits: [
      "Free site visit and design consultation",
      "Work around business hours",
      "Brand-matched tile and finish options",
      "Fast turnaround for shop fit-outs",
      "Fully insured, Safe Pass certified",
      "Full site cleanup at the end",
    ],
    process: [
      {
        step: "01",
        title: "Site visit & brief",
        description:
          "We visit the shop, look at the existing ceiling, discuss the brand, lighting and signage requirements.",
      },
      {
        step: "02",
        title: "Design & quote",
        description:
          "Sample tiles, layout drawings where useful, and a clear itemised quote — no surprises.",
      },
      {
        step: "03",
        title: "Install around trading hours",
        description:
          "We install out-of-hours, section off areas, or work in phases — keeping the shop open throughout.",
      },
      {
        step: "04",
        title: "Handover",
        description:
          "Full walkthrough, snag list addressed, and the site left clean and trading-ready.",
      },
    ],
    faqs: [
      {
        question: "How long does a shop ceiling installation take?",
        answer:
          "Most shop ceilings are completed in 3–5 days, depending on size and complexity. We work around your trading hours to minimise disruption.",
      },
      {
        question: "Do I need to close my shop during installation?",
        answer:
          "Not necessarily. We work out-of-hours or section off areas so you can keep trading. We've done this for many retail clients.",
      },
      {
        question: "Can you match the ceiling to my brand?",
        answer:
          "Yes — tile colours, feature panels, lighting and signage integration are all customisable to fit your brand identity.",
      },
      {
        question: "What ceilings work best for retail?",
        answer:
          "Usually suspended grid ceilings with acoustic tiles — good sound absorption, access to services, and easy to update lighting. Higher-end shops often go for plasterboard features combined with grid sections.",
      },
      {
        question: "Can you install signage and lighting too?",
        answer:
          "We install the ceiling infrastructure for signage and lighting. For the actual light fittings and signage elements, we can coordinate with your electrician and sign installer.",
      },
    ],
    relatedSlugs: ["suspended-ceilings", "plasterboard-ceilings", "commercial-ceiling-repairs"],
  },

  // ============================================================
  // 5. OFFICE PARTITIONS
  // ============================================================
  {
    slug: "office-partitions",
    label: "Office Partitions",
    tagline: "Office Partitions in Dublin",
    shortDescription:
      "Premium fire-rated and acoustic partition systems for Dublin offices. Expert design and installation of metal stud and drywall partitions that optimise workspace layout, privacy and performance.",
    heroTitle: 'Office <span class="text-secondary">Partitions</span> in Dublin',
    heroDescription:
      "Five Star Property Maintenance design and install office partitions that turn open-plan shells into productive workspaces — private offices, meeting rooms, breakout areas, and acoustic zones. Fire-rated, acoustic and glazed partition systems available.",
    image: "/assets/services/office-partitions.jpg",
    overview: [
      "Office partitions are the fastest way to carve a large open-plan floor into offices, meeting rooms and quiet zones — without the cost of a full fit-out. Done well, they feel permanent and considered. Done badly, they look like an afterthought and let noise through.",
      "We install all partition types — metal stud and plasterboard partitions for full-height privacy, fire-rated partitions for compliance, acoustic partitions to keep noise contained, and glazed partitions to preserve light and openness. Layout plans, compliance documentation and full installation handled in-house.",
    ],
    features: [
      {
        title: "Metal Stud Partitions",
        description:
          "Standard partition system — metal stud frame, plasterboard both sides, ready for painting or papering. Fast, cost-effective, and a clean finish.",
      },
      {
        title: "Fire-Rated Partitions",
        description:
          "Partitions tested and certified to the fire resistance required for your building — fully compliant and documented.",
      },
      {
        title: "Acoustic Partitions",
        description:
          "High-performance acoustic partitions with insulation and acoustic seals — stop noise transfer between meeting rooms and workspaces.",
      },
      {
        title: "Glazed Partitions",
        description:
          "Full-height glass or partial-glaze partitions — keep the light through the office while creating visual privacy.",
      },
      {
        title: "Doors & Frames",
        description:
          "Solid core, glazed or sliding door systems integrated into partitions — including fire-rated doors where required.",
      },
      {
        title: "Compliance Documentation",
        description:
          "Full fire-rating certificates and building regulation documentation provided on completion.",
      },
    ],
    benefits: [
      "Free design consultation and layout planning",
      "Fire-rated and acoustic systems available",
      "Full compliance documentation provided",
      "Minimal disruption — phased install where required",
      "Doors, glazing and finishing handled in-house",
      "Clean, professional finish",
    ],
    process: [
      {
        step: "01",
        title: "Brief & layout",
        description:
          "We visit the office, understand how the space needs to work, and sketch out partition layouts.",
      },
      {
        step: "02",
        title: "Specification & quote",
        description:
          "We specify partition type, acoustic performance, fire rating and door systems — with a clear itemised quote.",
      },
      {
        step: "03",
        title: "Installation",
        description:
          "Frame, board, glaze, doors and finishing — installed to a professional standard, phased around your operations.",
      },
      {
        step: "04",
        title: "Compliance & handover",
        description:
          "Fire certification and completion documentation provided. Full walkthrough and cleanup.",
      },
    ],
    faqs: [
      {
        question: "How long does an office partition installation take?",
        answer:
          "Depends on size. A small meeting room partition can be 1–2 days. A full office fit-out with multiple partitions, doors and glazing takes 1–2 weeks.",
      },
      {
        question: "Do I need fire-rated partitions?",
        answer:
          "In most commercial buildings yes — partition fire ratings are dictated by the building's fire strategy. We'll check the requirements and confirm in your quote.",
      },
      {
        question: "How acoustic are acoustic partitions?",
        answer:
          "A properly built acoustic partition with insulation and seals achieves around 45–55 dB — enough that normal speech from the next room isn't intelligible.",
      },
      {
        question: "Can you do glazed partitions?",
        answer:
          "Yes — full-height glass, partial-glaze, or glazed with acoustic seals. Popular for meeting rooms where you want privacy without losing the open feel.",
      },
      {
        question: "Do partitions come with doors?",
        answer:
          "Yes — we fit solid core, glazed or sliding door systems into partitions. Fire-rated doors available where the partition requires it.",
      },
    ],
    relatedSlugs: ["suspended-ceilings", "plasterboard-ceilings", "fire-sealing"],
  },

  // ============================================================
  // 6. FIRE SEALING
  // ============================================================
  {
    slug: "fire-sealing",
    label: "Fire Sealing",
    tagline: "Fire Sealing in Dublin",
    shortDescription:
      "Certified fire sealing over suspended ceilings. Protect your commercial space and stay compliant with all building and fire safety regulations.",
    heroTitle: 'Fire Sealing over Suspended <span class="text-secondary">Ceilings</span> in Dublin',
    heroDescription:
      "Five Star Property Maintenance install certified fire sealing over suspended ceilings — closing the gaps that let fire and smoke spread between compartments. Full certification provided for your fire safety file.",
    image: "/assets/services/fire-sealing.jpg",
    overview: [
      "Suspended ceilings create voids — and those voids are one of the easiest paths for fire and smoke to spread through a building. Fire sealing closes the gaps around pipes, cables, ductwork and ceiling penetrations so the compartmentation works as designed.",
      "This isn't optional work — it's a building regulation requirement, and it's one of the first things a fire officer checks during inspection. We install certified fire sealing systems that meet the required fire rating, and provide full documentation for your compliance file. If you've had any work above the ceiling recently (new wiring, plumbing, HVAC), the fire seals around those penetrations need to be checked and resealed if disturbed.",
    ],
    features: [
      {
        title: "Certified Fire Sealing",
        description:
          "Fire sealing materials and systems certified to the required fire resistance — fully compliant with Irish building regulations.",
      },
      {
        title: "Ceiling Void Sealing",
        description:
          "Sealing of ceiling voids at compartment boundaries — preventing fire and smoke movement between areas.",
      },
      {
        title: "Service Penetration Sealing",
        description:
          "Sealing around pipes, cables, conduits, ductwork and other services penetrating fire-rated ceilings.",
      },
      {
        title: "Fire-Rated Ceiling Systems",
        description:
          "Fire-rated suspended ceiling systems installed to spec — with the correct tiles, grid and perimeter detail.",
      },
      {
        title: "Compliance Documentation",
        description:
          "Certificates and photographic evidence for every seal installed — for your fire safety file and inspection.",
      },
      {
        title: "Remedial Fire Sealing",
        description:
          "Assessment and re-sealing of disturbed or failed fire seals — common after other trades have worked above the ceiling.",
      },
    ],
    benefits: [
      "Full compliance with fire safety regulations",
      "Certificates provided for every seal",
      "Fire officer inspection ready",
      "Minimal disruption to operations",
      "Works planned around your business hours",
      "Fully insured, Safe Pass certified crew",
    ],
    process: [
      {
        step: "01",
        title: "Fire sealing survey",
        description:
          "We inspect the ceiling void, identify all penetrations and compartment boundaries, and confirm what needs sealing.",
      },
      {
        step: "02",
        title: "Specification & quote",
        description:
          "We specify the correct fire sealing system for each penetration type — with a clear itemised quote.",
      },
      {
        step: "03",
        title: "Installation",
        description:
          "Certified fire sealing installed to spec — with photos taken of every seal before and after.",
      },
      {
        step: "04",
        title: "Certification",
        description:
          "Full documentation and certificates provided — ready for your fire safety file.",
      },
    ],
    faqs: [
      {
        question: "What is fire sealing and why does it matter?",
        answer:
          "Fire sealing closes the gaps around pipes, cables and services that pass through fire-rated ceilings. Without it, fire and smoke can spread between compartments — putting lives and property at risk, and failing building regulations.",
      },
      {
        question: "Is fire sealing a legal requirement?",
        answer:
          "Yes. If your building has fire-rated compartments, all penetrations through fire-rated elements must be properly sealed and certified. Fire officers check this during inspection.",
      },
      {
        question: "Do I need fire sealing above a suspended ceiling?",
        answer:
          "If the ceiling is part of a fire-rated compartment — yes. This is common in offices, retail, healthcare and multi-storey residential buildings.",
      },
      {
        question: "How often should fire seals be checked?",
        answer:
          "At least annually, and every time any work is done above the ceiling (electrical, plumbing, HVAC). Work above the ceiling often disturbs fire seals — those need to be reinstated and re-certified.",
      },
      {
        question: "Do you provide certificates?",
        answer:
          "Yes — full photographic evidence and certificates for every fire seal installed. Provided as a complete file for your compliance records.",
      },
      {
        question: "Can fire sealing be done without closing the building?",
        answer:
          "Yes. Fire sealing is one of the least disruptive trades — we work out-of-hours or in sectioned areas so your business keeps running.",
      },
    ],
    relatedSlugs: ["suspended-ceilings", "office-partitions", "commercial-ceiling-repairs"],
  },
];

// Helpers
export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_DETAIL.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES_DETAIL.map((s) => s.slug);
}

export function getRelatedServices(slugs: string[]): ServiceDetail[] {
  return slugs.map((slug) => getServiceBySlug(slug)).filter((s): s is ServiceDetail => Boolean(s));
}
