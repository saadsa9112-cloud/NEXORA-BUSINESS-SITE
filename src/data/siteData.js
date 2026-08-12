import {
  Globe, Code, ShoppingCart, Search, Palette, Server, Wrench
} from 'lucide-react'
import corporateImg from '../assets/portfolio/corporate.jpg'
import ecommerceImg from '../assets/portfolio/ecommerce.jpg'
import wordpressImg from '../assets/portfolio/wordpress.jpg'
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
]

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    category: 'Business Website',
    title: 'Modern Corporate Website',
    description: 'A clean, conversion-focused corporate presence with service pages, team section and lead capture.',
    image: corporateImg,
    tag: 'Featured Concept',
    type: 'corporate',
  },
  {
    id: 2,
    category: 'E-commerce Store',
    title: 'Modern Online Store',
    description: 'Full-featured Shopify store with product grids, cart functionality and a seamless checkout flow.',
    image: ecommerceImg,
    tag: 'Featured Concept',
    type: 'ecommerce',
  },
  {
    id: 3,
    category: 'WordPress Website',
    title: 'Professional Business Website',
    description: 'WordPress-powered business site with editorial blog, services overview and portfolio.',
    image: wordpressImg,
    tag: 'Featured Concept',
    type: 'wordpress',
  },
  {
    id: 4,
    category: 'Restaurant & Local Business',
    title: 'Premium Restaurant Experience',
    description: 'High-end restaurant website with visual menu, online reservations and brand storytelling.',
    image: restaurantImg,
    tag: 'Featured Concept',
    type: 'restaurant',
  },
  {
    id: 5,
    category: 'SaaS Dashboard',
    title: 'Modern Business Dashboard',
    description: 'Data-rich analytics dashboard with KPI cards, charts and an intuitive management interface.',
    image: dashboardImg,
    tag: 'Featured Concept',
    type: 'dashboard',
  },
  {
    id: 6,
    category: 'Landing Page',
    title: 'High-Converting Landing Experience',
    description: 'Conversion-optimised landing page with bold hero, feature highlights and integrated pricing.',
    image: landingImg,
    tag: 'Featured Concept',
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
    title: 'Discovery',
    description: 'We understand your business, audience and goals.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We plan the right structure and digital solution.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We create the visual experience and user journey.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build, integrate and optimize your website.',
  },
  {
    number: '05',
    title: 'Testing',
    description: 'We test responsiveness, functionality, speed and usability.',
  },
  {
    number: '06',
    title: 'Launch',
    description: 'Your website goes live and is ready for growth.',
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
    features: ['Responsive Design', 'Up to 5 Pages', 'Contact Form', 'SEO Setup', 'Basic Hosting Setup'],
  },
  {
    id: 2,
    title: 'WordPress Website',
    price: 'Rs. 20,000',
    period: '',
    note: 'Starting From',
    highlight: false,
    features: ['Custom Theme', 'CMS Integration', 'Blog Setup', 'Plugin Configuration', 'Admin Training'],
  },
  {
    id: 3,
    title: 'Shopify Store',
    price: 'Rs. 35,000',
    period: '',
    note: 'Starting From',
    highlight: false,
    features: ['Product Catalogue', 'Payment Integration', 'Inventory Setup', 'Order Management', 'Mobile Optimized'],
  },
  {
    id: 4,
    title: 'SEO Services',
    price: 'Rs. 15,000',
    period: '/month',
    note: 'Starting From',
    highlight: false,
    features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Monthly Reporting', 'Content Guidance'],
  },
  {
    id: 5,
    title: 'Graphic Design',
    price: 'Rs. 2,000',
    period: '+',
    note: 'Starting From',
    highlight: false,
    features: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Marketing Materials', 'File Formats Included'],
  },
  {
    id: 6,
    title: 'Hosting & Domain',
    price: 'Rs. 16,000',
    period: '/year',
    note: 'Starting From',
    highlight: false,
    features: ['Managed Hosting', 'Domain Registration', 'SSL Certificate', 'Email Setup', 'Uptime Monitoring'],
  },
  {
    id: 7,
    title: 'Website Maintenance',
    price: 'Rs. 5,000',
    period: '/month',
    note: 'Starting From',
    highlight: false,
    features: ['Regular Updates', 'Security Monitoring', 'Backups', 'Performance Checks', 'Priority Support'],
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
