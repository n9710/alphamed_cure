/**
 * Alphamed Cure — Services Data
 *
 * Business model: Sales · Service · Support · Healthcare Solutions
 * Three pillars: SALES | SERVICE | SUPPORT
 *
 * ponytail: static data, no DB/CMS for services. Upgrade path: add a Service
 * model to Prisma schema and fetch via lib/services.js when needed.
 */

export const SERVICES = [
  // SALES PILLAR
  {
    id: 'sales-management',
    slug: 'sales-management',
    pillar: 'Sales',
    title: 'Sales Management',
    icon: '📈',
    shortDesc:
      'End-to-end sales coordination for healthcare businesses — from lead engagement to order closure.',
    fullDesc:
      'Alphamed Cure manages the full sales cycle on behalf of healthcare product businesses. We engage qualified leads, present product capabilities, coordinate pricing discussions, and support the close process — so your business grows without the overhead of a full in-house sales team.',
    features: [
      'Lead engagement and qualification',
      'Product presentation and capability communication',
      'Pricing coordination and negotiation support',
      'Order closure and handover',
    ],
  },
  {
    id: 'lead-support',
    slug: 'lead-support',
    pillar: 'Sales',
    title: 'Lead Support',
    icon: '🎯',
    shortDesc:
      'Structured follow-up and nurturing for healthcare business leads, ensuring no opportunity is missed.',
    fullDesc:
      'We provide dedicated lead follow-up, relationship management, and opportunity tracking. Our team ensures consistent, professional communication with prospective clients while maintaining accurate records of every interaction.',
    features: [
      'Systematic lead follow-up routines',
      'Relationship building with prospective clients',
      'Opportunity tracking and reporting',
      'Professional communication standards',
    ],
  },
  {
    id: 'business-support',
    slug: 'business-support',
    pillar: 'Sales',
    title: 'Business Support',
    icon: '🤝',
    shortDesc:
      'Operational and strategic support to help healthcare businesses run efficiently and scale.',
    fullDesc:
      'Beyond sales, Alphamed Cure helps healthcare businesses with the operational work that keeps things moving — coordinating with suppliers, managing internal processes, and providing the support infrastructure that lets business owners focus on growth.',
    features: [
      'Business process coordination',
      'Supplier and vendor communication',
      'Operational support and administration',
      'Scalable support structures',
    ],
  },

  // SERVICE PILLAR
  {
    id: 'product-management',
    slug: 'product-management',
    pillar: 'Service',
    title: 'Product Management',
    icon: '📦',
    shortDesc:
      'Organized management of product portfolios — from listing and documentation to availability tracking.',
    fullDesc:
      'We help healthcare businesses maintain an organized, up-to-date product portfolio. This includes product data management, catalog organization, availability tracking, and ensuring product information is accurate and accessible for sales and customer service.',
    features: [
      'Product catalog organization and maintenance',
      'Availability and stock coordination',
      'Product data accuracy management',
      'Category and documentation management',
    ],
  },
  {
    id: 'product-sourcing',
    slug: 'product-sourcing',
    pillar: 'Service',
    title: 'Product Sourcing & Coordination',
    icon: '🔍',
    shortDesc:
      'Identifying and coordinating reliable sources for healthcare products that meet client requirements.',
    fullDesc:
      'Alphamed Cure supports businesses in identifying appropriate suppliers and coordinating the sourcing process for healthcare products. We handle supplier communication, requirement matching, and coordination — ensuring the right products reach the right clients.',
    features: [
      'Supplier identification and vetting',
      'Requirement-to-product matching',
      'Sourcing coordination and communication',
      'Delivery and timeline follow-up',
    ],
  },
  {
    id: 'order-inquiry-management',
    slug: 'order-inquiry-management',
    pillar: 'Service',
    title: 'Order & Inquiry Management',
    icon: '📋',
    shortDesc:
      'Handling inbound product inquiries and managing orders from receipt through to fulfillment.',
    fullDesc:
      'We manage inbound product inquiries professionally and ensure every order is tracked, coordinated, and fulfilled correctly. Our team handles the communication, documentation, and follow-up that keeps clients informed throughout the order process.',
    features: [
      'Inbound inquiry handling and response',
      'Order tracking and coordination',
      'Documentation and record keeping',
      'Fulfillment follow-up and status updates',
    ],
  },

  // SUPPORT PILLAR
  {
    id: 'customer-communication',
    slug: 'customer-communication',
    pillar: 'Support',
    title: 'Calling & Customer Communication',
    icon: '📞',
    shortDesc:
      'Professional outbound calling and inbound communication management for healthcare businesses.',
    fullDesc:
      'Alphamed Cure provides dedicated calling and communication services — handling outbound sales calls, inbound inquiries, follow-up routines, and general customer communication with the professionalism that healthcare clients expect.',
    features: [
      'Outbound calling and outreach',
      'Inbound call handling and response',
      'Professional communication standards',
      'Follow-up scheduling and execution',
    ],
  },
  {
    id: 'customer-service',
    slug: 'customer-service',
    pillar: 'Support',
    title: 'Customer Service & Support',
    icon: '💬',
    shortDesc:
      'Responsive customer service that resolves queries, handles concerns, and maintains client relationships.',
    fullDesc:
      'We act as the customer service function for healthcare businesses that need reliable, professional support. From resolving product queries to handling concerns and maintaining long-term client relationships, our team represents your business with care.',
    features: [
      'Query resolution and client support',
      'Concern handling and escalation management',
      'Ongoing relationship maintenance',
      'Customer satisfaction follow-up',
    ],
  },
  {
    id: 'business-process-support',
    slug: 'business-process-support',
    pillar: 'Support',
    title: 'Business Process Support',
    icon: '⚙️',
    shortDesc:
      'Supporting healthcare businesses with the internal processes that keep operations running smoothly.',
    fullDesc:
      'From administrative coordination to internal process management, Alphamed Cure provides the business process support that frees leadership to focus on growth. We handle the operational work behind the scenes.',
    features: [
      'Administrative and coordination support',
      'Internal process management',
      'Documentation and reporting',
      'Operational continuity support',
    ],
  },
];

/** Convenience: get services grouped by pillar */
export const SERVICE_PILLARS = ['Sales', 'Service', 'Support'];

export function getServicesByPillar() {
  return SERVICE_PILLARS.reduce((acc, pillar) => {
    acc[pillar] = SERVICES.filter((s) => s.pillar === pillar);
    return acc;
  }, {});
}
