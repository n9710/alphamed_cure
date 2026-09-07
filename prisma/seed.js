const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Alphamed Cure database with Phase 1 canonical data...');

  // 1. Create Admin & Test Accounts
  const adminPasswordHash = await bcrypt.hash('Admin@Alphamed2026!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@alphamedcure.com' },
    update: {},
    create: {
      email: 'admin@alphamedcure.com',
      passwordHash: adminPasswordHash,
      firstName: 'Alok',
      lastName: 'Sharma',
      company: 'Alphamed Cure Corporate',
      phone: '+91 98765 43210',
      role: 'admin',
      status: 'verified',
      emailVerifiedAt: new Date(),
    },
  });

  const customerPasswordHash = await bcrypt.hash('Customer@2026!', 10);
  const verifiedCustomer = await prisma.user.upsert({
    where: { email: 'procurement@cityhospital.org' },
    update: {},
    create: {
      email: 'procurement@cityhospital.org',
      passwordHash: customerPasswordHash,
      firstName: 'Dr. Rajesh',
      lastName: 'Menon',
      company: 'City Multi-Speciality Hospital',
      phone: '+91 98111 22334',
      role: 'customer',
      status: 'verified',
      emailVerifiedAt: new Date(),
    },
  });

  // 2. Canonical Categories (as specified in project specs)
  const categoriesData = [
    {
      name: 'Pharmaceutical Products',
      slug: 'pharmaceutical-products',
      description: 'Hospital-grade intravenous formulations, critical care antibiotics, and essential therapeutic medications.',
      sortOrder: 1,
    },
    {
      name: 'Medical Products',
      slug: 'medical-products',
      description: 'Surgical consumables, sterile sutures, diagnostic devices, and clinical patient care instruments.',
      sortOrder: 2,
    },
    {
      name: 'DME (Durable Medical Equipment)',
      slug: 'dme-durable-medical-equipment',
      description: 'Hospital beds, patient mobility aids, infusion pumps, and long-term clinical monitoring equipment.',
      sortOrder: 3,
    },
    {
      name: 'Pharmacy Supplies',
      slug: 'pharmacy-supplies',
      description: 'Compounding accessories, prescription packaging, dispensing bottles, and pharmacy workflow essentials.',
      sortOrder: 4,
    },
    {
      name: 'Vials',
      slug: 'vials',
      description: 'USP Type I borosilicate glass vials, amber serum vials, sterile crimp seals, and lyophilization containers.',
      sortOrder: 5,
    },
    {
      name: 'Thermal Labels',
      slug: 'thermal-labels',
      description: 'Cryogenic-resistant thermal transfer labels, direct thermal prescription labels, and clinical barcode rolls.',
      sortOrder: 6,
    },
    {
      name: 'PPE (Personal Protective Equipment)',
      slug: 'ppe-personal-protective-equipment',
      description: 'Chemotherapy-rated nitrile gloves, surgical face masks, sterile gowns, and infection control barriers.',
      sortOrder: 7,
    },
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = created;
  }

  // 3. Products with price isolation records
  const productsData = [
    // Pharmaceutical Products
    {
      name: 'Meropenem Trihydrate Injection IP 1g',
      slug: 'meropenem-trihydrate-injection-1g',
      sku: 'MED-INJ-MERO-1000',
      categorySlug: 'pharmaceutical-products',
      shortDesc: 'Broad-spectrum carbapenem antibiotic for severe hospital-acquired bacterial infections.',
      description: 'Meropenem for Injection IP 1g is a sterile broad-spectrum carbapenem antibiotic indicated for the treatment of complicated intra-abdominal infections, skin structure infections, and bacterial meningitis in adult and pediatric hospital patients. Formulated in accordance with IP/USP pharmacopeial monographs with full Certificate of Analysis.',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Active Pharmaceutical Ingredient': 'Meropenem Trihydrate IP eq. to Anhydrous Meropenem 1000mg',
        'Dosage Form': 'Sterile Powder for Reconstitution (IV Infusion / Bolus)',
        'Therapeutic Class': 'Carbapenem Antibacterial',
        'Storage Temperature': 'Store below 25°C, protect from moisture and light',
        'Packaging': 'USP Type I glass vial with 20mm chlorobutyl rubber stopper',
        'Regulatory Grade': 'Hospital Formulary / Institutional Supply Only',
      },
      tags: ['antibiotic', 'injectable', 'icu', 'carbapenem'],
      priceINR: 420.00,
      priceUSD: 5.10,
      unit: 'vial',
      minOrderQty: 50,
    },
    {
      name: 'Ceftriaxone Sodium Injection IP 1g',
      slug: 'ceftriaxone-sodium-injection-1g',
      sku: 'MED-INJ-CEFT-1000',
      categorySlug: 'pharmaceutical-products',
      shortDesc: 'Third-generation cephalosporin antibiotic for respiratory and systemic infections.',
      description: 'Ceftriaxone Sodium for Injection IP 1g is an essential hospital antibiotic used across inpatient wards for lower respiratory tract infections, acute bacterial otitis media, urinary tract infections, and surgical prophylaxis.',
      isFeatured: false,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Active Ingredient': 'Ceftriaxone Sodium IP eq. to Ceftriaxone 1000mg',
        'Administration': 'Intravenous (IV) or Intramuscular (IM)',
        'Storage': 'Store below 25°C protected from light',
        'Packaging': 'Single-dose vial with sterile water for injection (WFI)',
      },
      tags: ['antibiotic', 'injectable', 'cephalosporin'],
      priceINR: 85.00,
      priceUSD: 1.05,
      unit: 'vial',
      minOrderQty: 100,
    },

    // Medical Products
    {
      name: 'Polyglactin 910 Braided Absorbable Suture USP 3-0',
      slug: 'polyglactin-910-braided-absorbable-suture',
      sku: 'SURG-SUT-PG910-30',
      categorySlug: 'medical-products',
      shortDesc: 'Synthetic absorbable sterile surgical suture with 3/8 circle reverse cutting needle.',
      description: 'Engineered for smooth tissue passage, high initial tensile strength, and predictable absorption profile across general soft tissue approximation, ophthalmic procedures, and gastrointestinal surgery. Sterilized via Ethylene Oxide (EO).',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Material': 'Poly(glycolide-co-L-lactide) [Glacomer 91]',
        'Suture Size': 'USP 3-0 (Metric 2.0)',
        'Needle Length': '19mm 3/8 Circle Reverse Cutting Prime Needle',
        'Sterilization': 'Ethylene Oxide (EO) validated to ISO 11135',
        'Box Quantity': 'Pack of 36 individually wrapped sterile pouches',
      },
      tags: ['suture', 'surgical', 'operating theatre', 'absorbable'],
      priceINR: 1850.00,
      priceUSD: 22.50,
      unit: 'box of 36',
      minOrderQty: 10,
    },

    // DME (Durable Medical Equipment)
    {
      name: 'Multi-Parameter Patient Monitor 12.1-Inch Color TFT',
      slug: 'multi-parameter-patient-monitor-12-inch',
      sku: 'EQUIP-MON-MPM12',
      categorySlug: 'dme-durable-medical-equipment',
      shortDesc: 'Comprehensive 6-parameter ICU & bedside monitor with arrhythmia analysis and Defib proof.',
      description: 'The Alphamed Series MPM-12 delivers high-precision real-time monitoring of ECG (3/5 Lead), SpO2, NIBP, Respiration, Dual Temperature, and PR. Features arrhythmia detection, ST-segment analysis, and 120-hour graphic trend review. Defibrillator and electro-surgical unit protected.',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Display': '12.1-inch High Resolution Anti-glare Color TFT LCD (800x600)',
        'Standard Parameters': 'ECG, RESP, NIBP, SpO2, 2-TEMP, PR',
        'Safety Compliance': 'IEC 60601-1, CE Class IIb, Defibrillation Proof Type CF',
        'Battery': 'Rechargeable internal lithium-ion (4+ hours continuous operation)',
        'Data Connectivity': 'RJ45 Ethernet, HL7 protocol support for hospital HIS/EMR',
      },
      tags: ['icu', 'monitor', 'dme', 'cardiology'],
      priceINR: 48500.00,
      priceUSD: 585.00,
      unit: 'unit',
      minOrderQty: 1,
    },

    // Pharmacy Supplies
    {
      name: 'Amber Glass Prescription Dropper Bottles 30ml',
      slug: 'amber-glass-prescription-dropper-bottles-30ml',
      sku: 'PHARM-BOT-AMB-30',
      categorySlug: 'pharmacy-supplies',
      shortDesc: 'USP Type III amber glass dropper bottles with calibrated glass pipettes.',
      description: 'Protects light-sensitive pharmaceutical liquids and compounding solutions from ultraviolet degradation. Supplied with child-resistant, tamper-evident dropper caps.',
      isFeatured: false,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Capacity': '30 ml (1 fl oz)',
        'Glass Type': 'USP Type III Amber Soda-Lime Glass',
        'Closure': 'Child-resistant tamper-evident glass dropper assembly',
        'Case Pack': 'Case of 72 units with protective dividers',
      },
      tags: ['bottles', 'pharmacy', 'compounding', 'packaging'],
      priceINR: 1450.00,
      priceUSD: 17.50,
      unit: 'case of 72',
      minOrderQty: 5,
    },

    // Vials
    {
      name: 'USP Type I Clear Tubular Injection Vials 10ml',
      slug: 'usp-type-1-clear-tubular-injection-vials-10ml',
      sku: 'VIAL-CLR-T1-10ML',
      categorySlug: 'vials',
      shortDesc: 'Neutral borosilicate USP Type I glass vials for pharmaceutical injectables.',
      description: 'High chemical resistance, low alkali extraction, and exceptional thermal shock tolerance make these 10ml vials ideal for lyophilized powders, sterile antibiotic solutions, and vaccine formulations.',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Nominal Volume': '10 ml',
        'Finish Diameter': '20 mm Crimp Neck Standard',
        'Glass Formulation': 'USP Type I Neutral Borosilicate 5.1 Glass',
        'Total Height': '53.5 mm ± 0.5 mm',
        'Packaging': 'Cleanroom packed in sterile shrink-wrapped polypropylene trays (252 pcs/tray)',
      },
      tags: ['vials', 'borosilicate', 'injectable', 'pharmacy packaging'],
      priceINR: 2200.00,
      priceUSD: 26.50,
      unit: 'tray of 252',
      minOrderQty: 4,
    },

    // Thermal Labels
    {
      name: 'Cryogenic Thermal Transfer Prescription Labels 2" x 1"',
      slug: 'cryogenic-thermal-transfer-prescription-labels-2x1',
      sku: 'LBL-TH-CRYO-2010',
      categorySlug: 'thermal-labels',
      shortDesc: 'Deep-freeze resistant thermal labels engineered for cryogenic storage down to -80°C.',
      description: 'Formulated with clinical-grade emulsion acrylic adhesive that adheres securely to polypropylene tubes, borosilicate vials, and blood bags. Smudge-proof under alcohol, moisture, and ethylene oxide sterilization.',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Dimensions': '2.0" Width x 1.0" Height (50.8mm x 25.4mm)',
        'Service Temperature': '-80°C to +93°C (-112°F to +200°F)',
        'Core Size': '1.0" Core (compatible with Zebra, Sato, and TSC desktop printers)',
        'Roll Count': '1,500 labels per roll, perforated between labels',
      },
      tags: ['labels', 'thermal', 'cryogenic', 'barcoding'],
      priceINR: 1150.00,
      priceUSD: 14.00,
      unit: 'roll of 1500',
      minOrderQty: 5,
    },

    // PPE (Personal Protective Equipment)
    {
      name: 'Medical-Grade Nitrile Examination Gloves (Chemo-Tested)',
      slug: 'medical-grade-nitrile-examination-gloves',
      sku: 'PPE-GLV-NITR-MD',
      categorySlug: 'ppe-personal-protective-equipment',
      shortDesc: 'Powder-free textured nitrile gloves tested for resistance to chemotherapy drugs (ASTM D6978).',
      description: 'Manufactured with high-elasticity synthetic nitrile polymer to eliminate Type I latex allergy risks while providing superior tactile sensitivity and puncture barrier protection. Conforms to ASTM D6319 and EN 455 standards.',
      isFeatured: true,
      images: ['/assets/alphamed_cure_logo.png'],
      specifications: {
        'Material': '100% Synthetic Nitrile Butadiene Rubber (NBR)',
        'AQL Level': '1.5 Pin-hole inspection standard',
        'Color & Finish': 'Medical Blue, micro-textured fingertips for enhanced wet grip',
        'Standards': 'ASTM D6978, ASTM D6319, EN 455 Parts 1-4, FDA 510(k)',
        'Packaging': '100 gloves per dispenser box, 10 boxes per master case (1,000 gloves)',
      },
      tags: ['ppe', 'gloves', 'nitrile', 'infection control', 'chemo-rated'],
      priceINR: 4200.00,
      priceUSD: 51.00,
      unit: 'case of 1000',
      minOrderQty: 2,
    },
  ];

  for (const item of productsData) {
    const { categorySlug, priceINR, priceUSD, unit, minOrderQty, ...productInfo } = item;
    const category = categories[categorySlug];

    if (!category) {
      console.warn(`Category ${categorySlug} not found. Skipping product ${item.name}`);
      continue;
    }

    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        ...productInfo,
        categoryId: category.id,
      },
      create: {
        ...productInfo,
        categoryId: category.id,
      },
    });

    // Upsert isolated Price record
    await prisma.productPrice.upsert({
      where: { productId: product.id },
      update: {
        priceINR,
        priceUSD,
        unit,
        minOrderQty,
      },
      create: {
        productId: product.id,
        priceINR,
        priceUSD,
        unit,
        minOrderQty,
      },
    });
  }

  console.log(`Seeding complete: ${categoriesData.length} categories, ${productsData.length} products with isolated pricing, 2 accounts.`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
