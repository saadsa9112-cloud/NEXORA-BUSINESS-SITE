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
    description: 'Modern, responsive websites designed around your business goals.',
    color: 'blue',
  },
  {
    id: 2,
    icon: Code,
    title: 'WordPress Development',
    description: 'Professional, flexible and easy-to-manage WordPress websites.',
    color: 'indigo',
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: 'Shopify Development',
    description: 'Modern online stores designed for a smooth and professional shopping experience.',
    color: 'purple',
  },
  {
    id: 4,
    icon: Search,
    title: 'SEO Services',
    description: 'Improve search visibility and attract relevant organic traffic.',
    color: 'cyan',
  },
  {
    id: 5,
    icon: Palette,
    title: 'Graphic Design',
    description: 'Professional visual designs that strengthen your brand identity.',
    color: 'violet',
  },
  {
    id: 6,
    icon: Server,
    title: 'Hosting & Domain',
    description: 'Reliable hosting and domain solutions for your online presence.',
    color: 'sky',
  },
  {
    id: 7,
    icon: Wrench,
    title: 'Website Maintenance',
    description: 'Updates, backups, security and performance support after launch.',
    color: 'blue',
  },
  {
    id: 8,
    icon: Layers,
    title: 'Custom Web Application',
    description: 'Tailored web applications, portals and custom software solutions for complex business workflows.',
    color: 'emerald',
  },
]

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: 'Business Website',
    title: 'Modern Corporate Website',
    description: 'A clean, conversion-focused corporate presence with service pages, team section and lead capture.',
    image: corporateImg,
    tag: 'Featured Project',
    type: 'corporate',
  },
  {
    id: 2,
    category: 'E-commerce Store',
    title: 'Modern Online Store',
    description: 'Full-featured Shopify store with product grids, cart functionality and a seamless checkout flow.',
    image: ecommerceImg,
    tag: 'Featured Project',
    type: 'ecommerce',
  },
  {
    id: 3,
    category: 'Logistics & Transport',
    title: 'HAQ Transport Network',
    description: 'Real-world corporate logistics platform for HAQ Group featuring fleet management, cargo solutions, and freight quotes.',
    image: haqTransportImg,
    tag: 'Featured Project',
    type: 'transport',
  },
  {
    id: 4,
    category: 'Restaurant & Local Business',
    title: 'Premium Restaurant Experience',
    description: 'High-end restaurant website with visual menu, online reservations and brand storytelling.',
    image: restaurantImg,
    tag: 'Featured Project',
    type: 'restaurant',
  },
  {
    id: 5,
    category: 'SaaS Dashboard',
    title: 'Modern Business Dashboard',
    description: 'Data-rich analytics dashboard with KPI cards, charts and an intuitive management interface.',
    image: dashboardImg,
    tag: 'Featured Project',
    type: 'dashboard',
  },
  {
    id: 6,
    category: 'Landing Page',
    title: 'High-Converting Landing Experience',
    description: 'Conversion-optimised landing page with bold hero, feature highlights and integrated pricing.',
    image: landingImg,
    tag: 'Featured Project',
    type: 'landing',
  },
]

export const WHY_US = [
  {
    number: '01',
    title: 'Business-Focused',
    description: 'We design around your actual business goals.',
  },
  {
    number: '02',
    title: 'Modern Design',
    description: 'Clean, professional and conversion-focused interfaces.',
  },
  {
    number: '03',
    title: 'Mobile First',
    description: 'Smooth experiences across phones, tablets and desktops.',
  },
  {
    number: '04',
    title: 'SEO Ready',
    description: 'Built with search visibility and performance in mind.',
  },
  {
    number: '05',
    title: 'Reliable Support',
    description: 'Support continues after your website goes live.',
  },
  {
    number: '06',
    title: 'Transparent Pricing',
    description: 'Clear starting prices without unnecessary complexity.',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your business, audience & goals.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Structuring the sitemap & digital solution.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Creating the modern UI/UX experience.',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Building & optimizing your responsive site.',
  },
  {
    number: '05',
    title: 'Test',
    description: 'Ensuring speed, security & usability.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Deploying live & preparing for growth.',
  },
]

export const PRICING = [
  {
    id: 1,
    title: 'Business Website',
    price: 'Rs. 15,000',
    period: '',
    note: 'Starting From',
    highlight: true,
    badge: 'Recommended',
    features: [
      'Up to 5 Pages',
      'Responsive Design',
      'Contact Form',
      'SEO-Ready Setup',
    ],
  },
  {
    id: 2,
    title: 'WordPress Website',
    price: 'Rs. 20,000',
    period: '',
    note: 'Starting From',
    highlight: false,
    features: [
      'Custom Theme',
      'CMS Integration',
      'Blog Setup',
      'Plugin Configuration',
    ],
  },
  {
    id: 3,
    title: 'Shopify Store',
    price: 'Rs. 35,000',
    period: '',
    note: 'Starting From',
    highlight: false,
    features: [
      'Product Catalogue',
      'Payment Integration',
      'Inventory Setup',
      'Mobile Optimized',
    ],
  },
  {
    id: 4,
    title: 'SEO Services',
    price: 'Rs. 15,000',
    period: '/month',
    note: 'Starting From',
    highlight: false,
    features: [
      'Keyword Research',
      'On-Page SEO',
      'Technical SEO',
      'Monthly Reporting',
    ],
  },
  {
    id: 5,
    title: 'Graphic Design',
    price: 'Rs. 2,000',
    period: '+',
    note: 'Starting From',
    highlight: false,
    features: [
      'Logo Design',
      'Brand Identity',
      'Social Graphics',
      'Marketing Materials',
    ],
  },
  {
    id: 6,
    title: 'Hosting & Domain',
    price: 'Rs. 16,000',
    period: '/year',
    note: 'Starting From',
    highlight: false,
    features: [
      'Managed Hosting',
      'Domain Registration',
      'SSL Certificate',
      'Email Setup',
    ],
  },
  {
    id: 7,
    title: 'Website Maintenance',
    price: 'Rs. 5,000',
    period: '/month',
    note: 'Starting From',
    highlight: false,
    features: [
      'Regular Updates',
      'Security Monitoring',
      'Backups',
      'Performance Checks',
    ],
  },
  {
    id: 8,
    title: 'Custom Web App',
    price: 'Rs. 45,000',
    period: '',
    note: 'Starting From',
    highlight: false,
    features: [
      'Custom Architecture',
      'API & Database Setup',
      'Scalable Backend',
      'Admin Dashboard',
    ],
  },
]

export const QUALITY_FEATURES = [
  { title: 'Secure Development', desc: 'Built with modern security standards.' },
  { title: 'Responsive Experience', desc: 'Flawless across all devices and screen sizes.' },
  { title: 'Performance Optimized', desc: 'Fast load times and smooth interactions.' },
  { title: 'SEO-Friendly Structure', desc: 'Clean code and semantic HTML for search engines.' },
  { title: 'Reliable Hosting', desc: 'Stable infrastructure for consistent uptime.' },
  { title: 'Post-Launch Support', desc: 'Ongoing assistance after your website goes live.' },
]

export const FAQ_ITEMS = [
  {
    question: 'How long does a website take?',
    answer: 'Project timelines depend on the scope, content and requirements of each project.',
  },
  {
    question: 'Do you provide hosting and domain?',
    answer: 'Yes. Hosting and domain packages are available separately.',
  },
  {
    question: 'Can you build an e-commerce website?',
    answer: 'Yes. We provide Shopify development and e-commerce solutions based on project requirements.',
  },
  {
    question: 'Is SEO included with website development?',
    answer: 'Basic SEO-ready setup can be included depending on the selected package. Full SEO services are available separately.',
  },
  {
    question: 'Do you provide website maintenance?',
    answer: 'Yes. Monthly maintenance plans are available for updates, security, backups and performance support.',
  },
  {
    question: 'Can I request a custom package?',
    answer: 'Yes. Contact us and we can create a package based on your specific requirements.',
  },
]

export const CONTACT = {
  phone: '0345-3937195',
  whatsapp: '923453937195',
  email: 'hello.nexoradigitals@gmail.com',
  domain: 'nexoradigitalsol.com',
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

export const BUDGET_RANGES = [
  'Under Rs. 15,000',
  'Rs. 15,000 – Rs. 25,000',
  'Rs. 25,000 – Rs. 50,000',
  'Rs. 50,000+',
  'Not Sure',
]
