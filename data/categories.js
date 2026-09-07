/**
 * Phase 1 Development Categories Data
 * 
 * NOTE: This is development and fallback data for Alphamed Cure.
 * In production, categories are retrieved dynamically from the PostgreSQL database via Prisma.
 * This file maintains the canonical initial categories defined in the project specification.
 */

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Pharmaceutical Products',
    slug: 'pharmaceutical-products',
    description: 'Hospital-grade intravenous formulations, critical care antibiotics, and essential therapeutic medications.',
    icon: '💉',
    sortOrder: 1,
  },
  {
    id: 'cat-2',
    name: 'Medical Products',
    slug: 'medical-products',
    description: 'Surgical consumables, sterile sutures, diagnostic devices, and clinical patient care instruments.',
    icon: '🩺',
    sortOrder: 2,
  },
  {
    id: 'cat-3',
    name: 'DME (Durable Medical Equipment)',
    slug: 'dme-durable-medical-equipment',
    description: 'Hospital beds, patient mobility aids, infusion pumps, and long-term clinical monitoring equipment.',
    icon: '🛏️',
    sortOrder: 3,
  },
  {
    id: 'cat-4',
    name: 'Pharmacy Supplies',
    slug: 'pharmacy-supplies',
    description: 'Compounding accessories, prescription packaging, dispensing bottles, and pharmacy workflow essentials.',
    icon: '💊',
    sortOrder: 4,
  },
  {
    id: 'cat-5',
    name: 'Vials',
    slug: 'vials',
    description: 'USP Type I borosilicate glass vials, amber serum vials, sterile crimp seals, and lyophilization containers.',
    icon: '🧪',
    sortOrder: 5,
  },
  {
    id: 'cat-6',
    name: 'Thermal Labels',
    slug: 'thermal-labels',
    description: 'Cryogenic-resistant thermal transfer labels, direct thermal prescription labels, and clinical barcode rolls.',
    icon: '🏷️',
    sortOrder: 6,
  },
  {
    id: 'cat-7',
    name: 'PPE (Personal Protective Equipment)',
    slug: 'ppe-personal-protective-equipment',
    description: 'Chemotherapy-rated nitrile gloves, surgical face masks, sterile gowns, and infection control barriers.',
    icon: '🧤',
    sortOrder: 7,
  },
];
