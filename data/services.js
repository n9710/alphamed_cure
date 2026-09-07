/**
 * Phase 1 Development Services Data
 * 
 * NOTE: This is structured development data representing Alphamed Cure's B2B services.
 * In future phases, service offerings and details can be managed via the database/CMS.
 * Content is strictly defensible and healthcare-focused without unverified claims.
 */

export const SERVICES = [
  {
    id: 'institutional-procurement',
    title: 'Hospital & Institutional Procurement',
    slug: 'institutional-procurement',
    icon: '🏥',
    shortDesc: 'Centralized bulk procurement programs tailored for hospitals, surgical clinics, and licensed pharmacy networks.',
    fullDesc: 'Alphamed Cure coordinates directly with institutional purchasing committees to supply scheduled pharmaceutical formulations, emergency surgical consumables, and recurring medical equipment. We support standardized institutional tender procedures, customized delivery schedules, and consolidated invoice management.',
    features: [
      'Consolidated institutional purchasing orders',
      'Batch-reserved inventory for continuous clinical operations',
      'Dedicated institutional procurement specialists',
      'Formal quotation and contract pricing agreements',
    ],
  },
  {
    id: 'cold-chain-logistics',
    title: 'Temperature-Controlled Supply Chain',
    slug: 'cold-chain-logistics',
    icon: '❄️',
    shortDesc: 'Validated 2°C to 8°C cold-chain handling for vaccines, biologicals, and temperature-sensitive therapeutics.',
    fullDesc: 'Temperature integrity is critical to pharmaceutical potency and patient safety. Our supply chain utilizes insulated, validated packaging with calibrated continuous data loggers to ensure zero thermal excursions from distribution hub to hospital receiving dock.',
    features: [
      'Calibrated digital temperature data loggers included with shipments',
      'Strict 2°C – 8°C and ambient controlled protocols',
      'Pre-qualified insulated thermal shipping containers',
      'Immediate temperature audit reports upon facility handover',
    ],
  },
  {
    id: 'pharmacy-packaging-labels',
    title: 'Pharmacy Supplies & Clinical Barcoding',
    slug: 'pharmacy-packaging-labels',
    icon: '🏷️',
    shortDesc: 'High-spec USP glass vials, tamper-evident seals, and cryogenic thermal transfer labeling solutions.',
    fullDesc: 'We supply specialized dispensing and compounding products essential for cleanroom and hospital pharmacy workflows. From USP Type I borosilicate serum vials to smudge-proof thermal barcode labels engineered for cryogenic storage, our supplies meet rigorous healthcare packaging requirements.',
    features: [
      'USP Type I borosilicate glass vials and elastomeric stoppers',
      'Cryogenic and chemical-resistant thermal transfer label rolls',
      'Custom sizing compatible with hospital barcode scanning systems',
      'Tamper-evident shrink bands and flip-off safety seals',
    ],
  },
  {
    id: 'dme-equipment-supply',
    title: 'Durable Medical Equipment Logistics',
    slug: 'dme-equipment-supply',
    icon: '🛏️',
    shortDesc: 'Sourcing and supply of essential clinical durable equipment, patient monitors, and facility infrastructure.',
    fullDesc: 'Alphamed Cure facilitates institutional access to durable medical equipment needed in post-operative care, intensive care units, and patient recovery wards. We work with certified manufacturers to provide reliable, multi-parameter monitoring and clinical support hardware.',
    features: [
      'Multi-parameter patient monitors and diagnostic stations',
      'Infusion management systems and clinical stands',
      'Full technical documentation and user operation manuals',
      'Manufacturer warranty coordination and spare part channels',
    ],
  },
  {
    id: 'regulatory-documentation',
    title: 'Quality Assurance & Regulatory Support',
    slug: 'regulatory-documentation',
    icon: '📋',
    shortDesc: 'Complete batch traceability, Certificates of Analysis (COA), and regulatory dossier verification.',
    fullDesc: 'Every shipment handled by Alphamed Cure is backed by complete documentation. Hospital pharmacy audit committees receive verified Certificates of Analysis, batch release documentation, and sterility test results to facilitate internal quality reviews.',
    features: [
      'Lot-specific Certificate of Analysis (COA) provided with all orders',
      'Traceable supply lineage from certified manufacturing plants',
      'Batch recall readiness and pharmacovigilance logging',
      'Assistance with institutional vendor compliance audits',
    ],
  },
  {
    id: 'emergency-replenishment',
    title: 'Emergency Stock Replenishment Desk',
    slug: 'emergency-replenishment',
    icon: '⚡',
    shortDesc: 'Expedited dispatch assistance for critical hospital shortages and high-priority surgical requirements.',
    fullDesc: 'When clinical facilities face unexpected supply disruptions or urgent patient volume spikes, our emergency desk prioritizes dispatch for life-saving antibiotics, airway consumables, and sterile barrier sets.',
    features: [
      'Priority order queuing for acute clinical shortages',
      'Rapid stock verification across inventory hubs',
      'Direct liaison with hospital pharmacy directors',
      'Transparent status updates throughout dispatch and transit',
    ],
  },
];
