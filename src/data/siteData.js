import {
  Globe, Code, ShoppingCart, Search, Palette, Server, Wrench, Layers
} from 'lucide-react'
import corporateImg from '../assets/portfolio/corporate.jpg'
import ecommerceImg from '../assets/portfolio/ecommerce.jpg'
import haqTransportImg from '../assets/portfolio/haq-transport.jpg'
import restaurantImg from '../assets/portfolio/restaurant.jpg'
import dashboardImg from '../assets/portfolio/dashboard.jpg'
import landingImg from '../assets/portfolio/landing.jpg'

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const SERVICES = [
  {
    id: 1,
    icon: Globe,
    title: 'Business Website Development',
    description: 'High-impact corporate web platforms designed to establish market authority and capture enterprise leads.',
    color: 'blue',
  },
  {
    id: 2,
    icon: Code,
    title: 'WordPress Development',
    description: 'Enterprise-grade CMS solutions engineered for dynamic content management, security, and scalability.',
    color: 'indigo',
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: 'Shopify Development',
    description: 'Omnichannel e-commerce architectures optimized for seamless conversion, checkout flow, and global scale.',
    color: 'purple',
  },
  {
    id: 4,
    icon: Search,
    title: 'SEO Services',
    description: 'Data-driven search engine optimization and technical indexing to secure organic market leadership.',
    color: 'cyan',
  },
  {
    id: 5,
    icon: Palette,
    title: 'Graphic Design',
    description: 'Executive brand identity systems, corporate UI design, and high-impact digital marketing assets.',
    color: 'violet',
  },
  {
    id: 6,
    icon: Server,
    title: 'Hosting & Domain',
    description: 'Managed enterprise cloud infrastructure, high-availability web hosting, and SSL security configuration.',
    color: 'sky',
  },
  {
    id: 7,
    icon: Wrench,
    title: 'Website Maintenance',
    description: 'Proactive SLA maintenance, 24/7 security monitoring, performance audits, and automated backups.',
    color: 'blue',
  },
  {
    id: 8,
    icon: Layers,
    title: 'Custom Web Application',
    description: 'Bespoke full-stack web software, client portals, and custom API integrations for complex enterprise workflows.',
    color: 'emerald',
  },
]

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: 'Business Website',
    title: 'Modern Corporate Website',
    description: 'High-impact corporate web portal engineered with custom UI design, responsive service architecture, and conversion-focused lead funnels.',
    image: corporateImg,
    tag: 'Featured Project',
    type: 'corporate',
  },
  {
    id: 2,
    category: 'E-commerce Store',
    title: 'Modern Online Store',
    description: 'Custom enterprise Shopify architecture featuring dynamic product catalog, multi-currency checkout, and integrated inventory management.',
    image: ecommerceImg,
    tag: 'Featured Project',
    type: 'ecommerce',
  },
  {
    id: 3,
    category: 'Logistics & Transport',
    title: 'Haq Transport Network',
    description: 'Official corporate website for HAQ Group, highlighting nationwide heavy-freight operations, 500+ vehicle fleet management, and industrial supply chain solutions.',
    image: haqTransportImg,
    tag: 'Featured Project',
    type: 'transport',
  },
  {
    id: 4,
    category: 'Restaurant & Local Business',
    title: 'Premium Restaurant Experience',
    description: 'High-end hospitality platform featuring visual dining menus, real-time table reservations, and immersive digital brand storytelling.',
    image: restaurantImg,
    tag: 'Featured Project',
    type: 'restaurant',
  },
  {
    id: 5,
    category: 'SaaS Dashboard',
    title: 'Modern Business Dashboard',
    description: 'Real-time analytics platform with interactive KPI dashboards, telemetry charts, and an intuitive executive management interface.',
    image: dashboardImg,
    tag: 'Featured Project',
    type: 'dashboard',
  },
  {
    id: 6,
    category: 'Landing Page',
    title: 'High-Converting Landing Experience',
    description: 'Growth-focused campaign landing architecture optimized for speed, CRO conversion funnels, and direct business lead acquisition.',
    image: landingImg,
    tag: 'Featured Project',
    type: 'landing',
  },
]

export const WHY_US = [
  {
    number: '01',
    title: 'Strategic ROI Alignment',
    description: 'We architect digital platforms directly aligned with your commercial growth metrics and client acquisition goals.',
  },
  {
    number: '02',
    title: 'World-Class UI/UX',
    description: 'Executive-level aesthetic standards and user journey engineering crafted for global brand authority.',
  },
  {
    number: '03',
    title: 'Mobile-First Performance',
    description: 'Flawless responsive architecture optimized for all screen viewports, devices, and network environments.',
  },
  {
    number: '04',
    title: 'Technical SEO Built-In',
    description: 'Clean semantic markup, dynamic schema tags, and high Core Web Vitals scores for organic search dominance.',
  },
  {
    number: '05',
    title: 'Dedicated SLA Support',
    description: 'Continuous engineering assistance, proactive security patching, and uptime monitoring post-deployment.',
  },
  {
    number: '06',
    title: 'Transparent Investment',
    description: 'Clear, milestone-based pricing models with comprehensive scope deliverables and zero hidden fees.',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'In-depth analysis of business objectives, target demographics, and competitive positioning.',
  },
  {
    number: '02',
    title: 'Architecture & Planning',
    description: 'Defining technical requirements, information architecture, and structured user funnels.',
  },
  {
    number: '03',
    title: 'UI/UX Engineering',
    description: 'Crafting high-fidelity interface prototypes and bespoke corporate design systems.',
  },
  {
    number: '04',
    title: 'Development & Integration',
    description: 'Building modern, high-performance web applications using robust engineering standards.',
  },
  {
    number: '05',
    title: 'QA & Security Auditing',
    description: 'Comprehensive cross-device testing, OWASP security compliance, and speed optimization.',
  },
  {
    number: '06',
    title: 'Global Deployment',
    description: 'Seamless cloud production release, DNS orchestration, and immediate performance tracking.',
  },
]

export const PRICING = [
  {
    id: 1,
    title: 'Business Website',
    price: 'Rs. 15,000',
    priceUsd: '$299',
    period: '',
    note: 'Starting Investment',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Up to 5 Custom Pages',
      'Responsive Mobile UI',
      'Lead Capture Form',
      'Technical SEO Setup',
    ],
  },
  {
    id: 2,
    title: 'WordPress Web Platform',
    price: 'Rs. 20,000',
    priceUsd: '$399',
    period: '',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Custom Theme Architecture',
      'Full CMS Governance',
      'Blog & Content Hub',
      'Security & Speed Optimization',
    ],
  },
  {
    id: 3,
    title: 'Shopify E-Commerce Store',
    price: 'Rs. 35,000',
    priceUsd: '$599',
    period: '',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Product Catalog & Inventory',
      'Payment Gateway Integration',
      'Automated Order Tracking',
      'Conversion-Optimized UX',
    ],
  },
  {
    id: 4,
    title: 'Search Engine Optimization',
    price: 'Rs. 15,000',
    priceUsd: '$249',
    period: '/month',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Technical SEO Audit',
      'On-Page & Keyword Strategy',
      'Sitemap & Index Optimization',
      'Executive Analytics Reports',
    ],
  },
  {
    id: 5,
    title: 'Brand & Graphic Design',
    price: 'Rs. 2,000',
    priceUsd: '$49',
    period: '+',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Vector Logo Design Systems',
      'Brand Identity Standards',
      'Executive Social Assets',
      'Print & Digital Collateral',
    ],
  },
  {
    id: 6,
    title: 'Cloud Hosting & Domain',
    price: 'Rs. 16,000',
    priceUsd: '$149',
    period: '/year',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Managed Cloud Infrastructure',
      'Global Domain Provisioning',
      'SSL Security Certificate',
      'Corporate Email Suite',
    ],
  },
  {
    id: 7,
    title: 'Website SLA Maintenance',
    price: 'Rs. 5,000',
    priceUsd: '$79',
    period: '/month',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Continuous Security Patches',
      '24/7 Uptime Monitoring',
      'Automated Daily Backups',
      'Performance Audits',
    ],
  },
  {
    id: 8,
    title: 'Custom Web Application',
    price: 'Rs. 45,000',
    priceUsd: '$999',
    period: '',
    note: 'Starting Investment',
    highlight: false,
    features: [
      'Full-Stack Architecture',
      'Database & REST API Integration',
      'Scalable Backend Engine',
      'Executive Admin Dashboard',
    ],
  },
]

export const QUALITY_FEATURES = [
  { title: 'OWASP Security Standards', desc: 'Engineered with modern cybersecurity protocols and data protection.' },
  { title: 'Adaptive Responsive Design', desc: 'Flawless rendering and touch optimization across desktop, mobile, and tablet viewports.' },
  { title: 'Core Web Vitals Optimization', desc: 'Sub-second load performance, lightweight code assets, and smooth render cycles.' },
  { title: 'Technical SEO & Schema Markup', desc: 'Clean HTML5 semantic structure and structured data tags for search dominance.' },
  { title: 'Managed Cloud Infrastructure', desc: 'High-availability hosting environments guaranteeing 99.9% operational uptime.' },
  { title: 'Post-Launch SLA Maintenance', desc: 'Ongoing technical support, regular security updates, and performance monitoring.' },
]

export const FAQ_ITEMS = [
  {
    question: 'What is the typical timeline for project delivery?',
    answer: 'Delivery timelines range from 5 to 7 business days for standard corporate websites, and 10 to 20 business days for complex custom web applications and e-commerce platforms.',
  },
  {
    question: 'Do you provide managed domain and hosting infrastructure?',
    answer: 'Yes. We engineer complete cloud hosting setup, domain registration, SSL encryption certificates, and business email provisioning.',
  },
  {
    question: 'Can you build custom e-commerce and Shopify stores?',
    answer: 'Yes. We architect scalable Shopify stores and custom e-commerce applications complete with multi-currency payment integration and inventory management.',
  },
  {
    question: 'Is Technical SEO included with web development projects?',
    answer: 'Yes. Every project includes foundational technical SEO, semantic HTML markup, mobile optimization, fast page load speeds, and search console indexing.',
  },
  {
    question: 'What post-launch SLA technical maintenance is available?',
    answer: 'We provide monthly SLA maintenance covering core updates, automated backups, malware monitoring, performance checks, and minor layout modifications.',
  },
  {
    question: 'Can we request a custom project proposal or tailored package?',
    answer: 'Yes. Contact us with your project requirements and we will prepare a detailed technical proposal and scope breakdown tailored to your commercial goals.',
  },
]

export const CONTACT = {
  phone: '0345-3937195',
  whatsapp: '923453937195',
  email: 'sales.nexorahms@gmail.com',
  domain: 'nexorabyhms.netlify.app',
  facebook: 'https://www.facebook.com/profile.php?id=61592546954736',
  instagram: 'https://www.instagram.com/nexorabyhms',
  whatsappMessage: encodeURIComponent(
    "Hello NEXORA DIGITAL (by HMS), I'm interested in your services and would like to discuss my project."
  ),
}

export const SERVICES_LIST = [
  'Business Website Development',
  'WordPress Development',
  'Shopify Development',
  'SEO Services',
  'Graphic Design',
  'Hosting & Domain',
  'Website Maintenance',
  'Other',
]

export const BUDGET_RANGES_PKR = [
  'Under Rs. 15,000',
  'Rs. 15,000 – Rs. 35,000',
  'Rs. 35,000 – Rs. 75,000',
  'Rs. 75,000+',
  'Custom Enterprise Scope',
]

export const BUDGET_RANGES_USD = [
  'Under $100',
  '$100 – $299',
  '$299 – $599',
  '$599 – $999',
  '$999+',
  'Custom Enterprise Scope',
]

export const BUDGET_RANGES = BUDGET_RANGES_PKR

