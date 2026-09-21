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
    description: 'Clean, modern corporate websites designed to build brand trust, present services clearly, and capture leads.',
    color: 'blue',
  },
  {
    id: 2,
    icon: Code,
    title: 'WordPress Development',
    description: 'Flexible, easy-to-manage WordPress websites with custom themes, CMS integration, and content hubs.',
    color: 'indigo',
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: 'Shopify Development',
    description: 'Modern Shopify online stores with custom themes, product catalogs, and multi-currency checkout.',
    color: 'purple',
  },
  {
    id: 4,
    icon: Search,
    title: 'SEO Services',
    description: 'Technical SEO optimization, content structure, and performance improvements to increase organic search visibility.',
    color: 'cyan',
  },
  {
    id: 5,
    icon: Palette,
    title: 'Graphic Design',
    description: 'Professional brand identity design, logos, social media graphics, and marketing assets.',
    color: 'violet',
  },
  {
    id: 6,
    icon: Server,
    title: 'Hosting & Domain',
    description: 'Managed domain registration, web hosting, SSL security certificates, DNS configuration, and business email.',
    color: 'sky',
  },
  {
    id: 7,
    icon: Wrench,
    title: 'Website Maintenance',
    description: 'Ongoing website maintenance, security updates, automated backups, and performance monitoring.',
    color: 'blue',
  },
  {
    id: 8,
    icon: Layers,
    title: 'Custom Web Application',
    description: 'Tailored web software, client portals, and custom web applications for specific business workflows.',
    color: 'emerald',
  },
]

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: 'Business Website',
    title: 'Modern Corporate Website',
    description: 'Modern corporate website with clean UI design, responsive service pages, and integrated contact form.',
    image: corporateImg,
    tag: 'Featured Project',
    type: 'corporate',
  },
  {
    id: 2,
    category: 'E-commerce Store',
    title: 'Modern Online Store',
    description: 'Full-featured Shopify e-commerce store with product catalog, cart functionality, and mobile checkout.',
    image: ecommerceImg,
    tag: 'Featured Project',
    type: 'ecommerce',
  },
  {
    id: 3,
    category: 'Logistics & Transport',
    title: 'Haq Transport Network',
    description: 'Official website for HAQ Group, showcasing nationwide logistics, transport services, and company profile.',
    image: haqTransportImg,
    tag: 'Featured Project',
    type: 'transport',
  },
  {
    id: 4,
    category: 'Restaurant & Local Business',
    title: 'Premium Restaurant Experience',
    description: 'Hospitality website featuring visual dining menu, online reservation inquiries, and brand story.',
    image: restaurantImg,
    tag: 'Featured Project',
    type: 'restaurant',
  },
  {
    id: 5,
    category: 'SaaS Dashboard',
    title: 'Modern Business Dashboard',
    description: 'Analytics dashboard UI design with key performance indicators, charts, and management controls.',
    image: dashboardImg,
    tag: 'Featured Project',
    type: 'dashboard',
  },
  {
    id: 6,
    category: 'Landing Page',
    title: 'High-Converting Landing Experience',
    description: 'Focused landing page design optimized for fast loading, key features showcase, and lead generation.',
    image: landingImg,
    tag: 'Featured Project',
    type: 'landing',
  },
]

export const WHY_US = [
  {
    number: '01',
    title: 'Business-Focused',
    description: 'We design digital solutions centered around your practical business goals and customer needs.',
  },
  {
    number: '02',
    title: 'Modern UI/UX Design',
    description: 'Clean, professional, and user-friendly interfaces crafted to make a strong impression.',
  },
  {
    number: '03',
    title: 'Mobile-First Responsive',
    description: 'Optimized layouts ensuring a smooth experience across smartphones, tablets, and desktops.',
  },
  {
    number: '04',
    title: 'SEO-Friendly Structure',
    description: 'Built with clean semantic code, meta tags, and fast load speeds for search engines.',
  },
  {
    number: '05',
    title: 'Reliable Ongoing Support',
    description: 'Dedicated support, updates, and website maintenance after your site goes live.',
  },
  {
    number: '06',
    title: 'Transparent Pricing',
    description: 'Clear, straightforward investment structures without hidden fees or unexpected costs.',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding your business goals, target audience, and project requirements.',
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Structuring sitemap, user flow, and content layout for the project.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Creating clean, modern UI/UX design concepts for your approval.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Building your responsive website with clean, optimized code.',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'Checking speed, mobile responsiveness, forms, and cross-browser compatibility.',
  },
  {
    number: '06',
    title: 'Launch & Support',
    description: 'Deploying your website live and providing post-launch support.',
  },
]

export const PRICING = [
  {
    id: 1,
    title: 'Business Website',
    price: 'Rs. 15,000',
    priceUsd: '$299',
    period: '',
    note: 'Starting Price',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Up to 5 Custom Pages',
      'Responsive Mobile Design',
      'Contact Form Integration',
      'SEO-Ready Setup',
    ],
  },
  {
    id: 2,
    title: 'WordPress Website',
    price: 'Rs. 20,000',
    priceUsd: '$399',
    period: '',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Custom Theme Design',
      'CMS Content Integration',
      'Blog Setup',
      'Security & Speed Setup',
    ],
  },
  {
    id: 3,
    title: 'Shopify Store',
    price: 'Rs. 35,000',
    priceUsd: '$599',
    period: '',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Product Catalog Setup',
      'Payment Gateway Integration',
      'Inventory Configuration',
      'Mobile Shopping Experience',
    ],
  },
  {
    id: 4,
    title: 'SEO Services',
    price: 'Rs. 15,000',
    priceUsd: '$249',
    period: '/month',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Technical SEO Audit',
      'On-Page Optimization',
      'Keyword Research',
      'Monthly Progress Report',
    ],
  },
  {
    id: 5,
    title: 'Graphic Design',
    price: 'Rs. 2,000',
    priceUsd: '$49',
    period: '+',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Vector Logo Design (3 Concepts)',
      'Brand Identity Guide',
      'Social Media Assets',
      'Print & Web Files',
    ],
  },
  {
    id: 6,
    title: 'Hosting & Domain',
    price: 'Rs. 16,000',
    priceUsd: '$149',
    period: '/year',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Managed Web Hosting',
      'Domain Registration',
      'SSL Security Certificate',
      'Business Email Setup',
    ],
  },
  {
    id: 7,
    title: 'Website Maintenance',
    price: 'Rs. 5,000',
    priceUsd: '$79',
    period: '/month',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Regular Core & Plugin Updates',
      'Security Monitoring',
      'Scheduled Backups',
      'Performance Checks',
    ],
  },
  {
    id: 8,
    title: 'Custom Web App',
    price: 'Rs. 45,000',
    priceUsd: '$999',
    period: '',
    note: 'Starting Price',
    highlight: false,
    features: [
      'Full-Stack Web Architecture',
      'API & Database Integration',
      'Admin Dashboard',
      'User Authentication',
    ],
  },
]

export const QUALITY_FEATURES = [
  { title: 'Secure Development', desc: 'Built with modern web security best practices and form protection.' },
  { title: 'Responsive Layouts', desc: 'Flawless display across mobile phones, tablets, and desktop computers.' },
  { title: 'Fast Load Speeds', desc: 'Optimized images, lightweight code, and fast page rendering.' },
  { title: 'SEO-Friendly Code', desc: 'Semantic HTML5 structure and clean metadata tags for search engine crawlers.' },
  { title: 'Reliable Hosting Setup', desc: 'Dependable hosting infrastructure for consistent site uptime.' },
  { title: 'Post-Launch Support', desc: 'Regular updates, security backups, and ongoing technical support.' },
]

export const FAQ_ITEMS = [
  {
    question: 'How long does it take to build a website?',
    answer: 'Timelines generally range from 5 to 7 business days for standard business websites, and 8 to 15 business days for larger custom applications or e-commerce stores depending on scope.',
  },
  {
    question: 'Do you provide domain and hosting services?',
    answer: 'Yes. We provide complete domain registration, web hosting setup, SSL certificates, and business email configuration.',
  },
  {
    question: 'Can you build an e-commerce or Shopify store?',
    answer: 'Yes. We build Shopify and custom e-commerce stores with product catalogs, payment gateway integration, and mobile checkout.',
  },
  {
    question: 'Is SEO included with website development?',
    answer: 'Yes. Basic SEO setup (semantic HTML, meta tags, mobile optimization, fast speeds) is included. Full ongoing SEO services are also available.',
  },
  {
    question: 'Do you offer ongoing website maintenance?',
    answer: 'Yes. We offer monthly maintenance plans for security updates, automated backups, content updates, and technical support.',
  },
  {
    question: 'Can I request a custom quote or package?',
    answer: 'Yes. Contact us with your specific requirements and we will provide a detailed quote and scope breakdown.',
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
    "Hello NEXORA DIGITAL, I'm interested in your services and would like to discuss my project."
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
  'Custom Scope',
]

export const BUDGET_RANGES_USD = [
  'Under $100',
  '$100 – $299',
  '$299 – $599',
  '$599 – $999',
  '$999+',
  'Custom Scope',
]

export const BUDGET_RANGES = BUDGET_RANGES_PKR
