/**
 * Single source of truth for all site content.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: 'Ilyes Bouchlaghem',
  role: 'Backend & Platform Engineer',
  subRole: 'DevOps · Cloud',
  location: 'Abu Dhabi, UAE',
  relocation: 'Open to relocate',
  citizenship: 'French citizen — EU/EEA + Switzerland work-authorized, no sponsorship needed',
  email: 'contact@ibouch.com',
  phone: '+971 52 819 0224',
  linkedin: 'https://linkedin.com/in/ilyes-bouchlaghem',
  github: 'https://github.com/ibouch',
  languages: ['French (native)', 'English (full professional)'],
}

export const site = {
  coords: '24.4539°N 54.3773°E',
  timezone: 'GST · UTC+4',
  version: 'v1.0.0',
  established: 'EST. 2026',
  domain: 'ibouch.com',
}

export const bootLines = [
  'mount /usr/ilyes/experience .......... 8y',
  'attach postgres · fastapi · terraform',
  'start observability — grafana:3000',
  'route contact@ibouch.com → inbox',
  'init interface — v1.0.0',
]

export const navLinks = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'what-i-do', label: 'What I Do', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'projects', label: 'Projects', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

export const heroTyped = [
  'production backend systems.',
  'cloud infrastructure as code.',
  'realtime APIs at scale.',
  'observability stacks.',
  'AI serving platforms.',
]

export const stats = [
  { value: '8+', label: 'years of engineering' },
  { value: '17', label: 'services shipped solo in one platform' },
  { value: '1000s', label: 'of users served daily' },
  { value: 'Top 1%', label: 'of applicants at École 42' },
]

export const about = {
  paragraphs: [
    `I'm a self-taught Backend & Platform Engineer with 8+ years of experience shipping
    production-grade systems end-to-end — from API design and data modeling to
    Terraform-provisioned cloud infrastructure and the Grafana dashboards that keep it honest.`,
    `At 42 Abu Dhabi I designed and solo-built Meta-IQ, a 17-service containerized data
    platform that replaced a manual Excel/Typeform workflow and now consolidates data for
    thousands of users. Before that, I spent three years as a freelance solutions architect
    in Paris building realtime backends used by thousands of concurrent players.`,
    `Right now I'm going deeper into Kubernetes (CKA) and AI/LLM serving infrastructure —
    vLLM, vector databases, RAG — and I work AI-native every day with agents, skills, and
    MCP servers across Claude Code, Cursor, and Codex.`,
  ],
  facts: [
    { label: 'Location', value: 'Abu Dhabi, UAE · open to relocate' },
    { label: 'Citizenship', value: 'French — EU/EEA + CH work-authorized' },
    { label: 'Languages', value: 'French (native) · English (full professional)' },
    { label: 'Education', value: 'École 42 Paris — Computer Architect' },
    { label: 'Certification', value: 'Google Cybersecurity Professional (2025)' },
    { label: 'Email', value: 'contact@ibouch.com' },
  ],
}

export const services = [
  {
    icon: 'server',
    title: 'Backend Engineering',
    description:
      'APIs and microservices built for production from day one — REST, GraphQL (Hasura), WebSocket, SSE, Pub/Sub. FastAPI and Node.js services that hold up under concurrent load.',
    tags: ['FastAPI', 'GraphQL', 'WebSocket', 'Node.js'],
  },
  {
    icon: 'cloud',
    title: 'Platform & DevOps',
    description:
      'Infrastructure as code on Azure and AWS: Terraform, Ansible, Docker, CI/CD with GitHub Actions. Reproducible environments, automated deploys, zero snowflake servers.',
    tags: ['Terraform', 'Ansible', 'Docker', 'Azure'],
  },
  {
    icon: 'database',
    title: 'Data Engineering',
    description:
      'PostgreSQL data modeling and Prefect-orchestrated ETL/ELT pipelines. Daily ingestion from external APIs into clean, queryable tables with custom calculations.',
    tags: ['PostgreSQL', 'Prefect', 'ETL/ELT', 'Redis'],
  },
  {
    icon: 'shield',
    title: 'Observability & Security',
    description:
      'Grafana, Prometheus, and Loki stacks wired into every service. Security engineered from day one: RBAC, least-privilege access, audit controls, secrets in Key Vault.',
    tags: ['Grafana', 'Prometheus', 'Loki', 'RBAC'],
  },
]

export const skillGroups = [
  { name: 'Languages', skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Bash', 'C/C++'] },
  {
    name: 'Backend',
    skills: ['FastAPI', 'Flask', 'REST', 'GraphQL (Hasura)', 'Node.js', 'WebSocket', 'SSE', 'Pub/Sub'],
  },
  {
    name: 'Data',
    skills: ['PostgreSQL', 'Data modeling', 'ETL/ELT', 'Prefect', 'MongoDB', 'Redis', 'RabbitMQ'],
  },
  {
    name: 'Platform & Infrastructure',
    skills: ['Docker', 'Linux', 'Nginx', 'Terraform', 'Ansible', 'GitHub Actions', 'VMware'],
  },
  {
    name: 'Cloud & Security',
    skills: ['Azure', 'AWS', 'Key Vault', 'RBAC', 'Least privilege', 'Secrets management'],
  },
  {
    name: 'Observability',
    skills: ['Grafana', 'Prometheus', 'Loki', 'Alloy', 'cAdvisor', 'postgres-exporter'],
  },
  { name: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS'] },
  {
    name: 'AI-Native Workflow',
    skills: ['Claude Code', 'Cursor', 'Codex', 'Agents & skills', 'MCP servers'],
  },
]

export const currentlyDeveloping = [
  { cmd: 'kubectl get certifications', out: 'CKA — Certified Kubernetes Administrator [in progress]' },
  { cmd: 'vllm serve --status', out: 'AI/LLM serving infrastructure — vLLM, model serving' },
  { cmd: 'rag --stack', out: 'Vector databases · retrieval-augmented generation' },
]

export const experience = [
  {
    role: 'Backend & DevOps Engineer',
    company: '42 Abu Dhabi',
    period: 'Nov 2020 — Present',
    location: 'Abu Dhabi, UAE',
    bullets: [
      'Designed and solo-built Meta-IQ, a 17-service containerized data platform — owning requirements, architecture, security, deployment, and operations. Replaced a manual Excel/Typeform/document workflow; used daily by 3 teams (~10 people) to consolidate data for thousands of users.',
      'Automated daily ingestion into 10+ PostgreSQL tables from external APIs via Prefect-orchestrated pipelines with custom calculations.',
      'Architected the stack across PostgreSQL, MinIO object storage, FastAPI microservices (mail, signer, validator, auth), Hasura GraphQL, a React/TypeScript/Vite frontend behind Nginx, and a Grafana/Prometheus/Loki observability stack.',
      'Provisioned Azure infrastructure as code with Terraform and Ansible, shipped all services as Docker containers, and engineered security from day one — RBAC, least-privilege access, audit controls, Azure Key Vault.',
    ],
  },
  {
    role: 'Freelance Solutions Architect & Fullstack Engineer',
    company: 'Self-employed',
    period: 'Jan 2018 — Nov 2020',
    location: 'Paris, France',
    bullets: [
      'Built real-time gaming backend services — chat, matchmaking, player communication — for a game studio, used by thousands of players over WebSocket, SSE, and Pub/Sub.',
      'Delivered an end-to-end tournament and draft platform for a video-game events company: backend, database design, deployment, and client workflows.',
      'Diagnosed recurring API crashes under concurrent-connection load, designed a more scalable fault-tolerant architecture, and drove the team’s shift toward DevOps practices.',
      'Stack: FastAPI, Flask, Node.js, RabbitMQ, Redis, AWS, Cloudflare, Nginx, Docker, GitHub Actions, PostgreSQL, MongoDB, Stripe, PayPal.',
    ],
  },
  {
    role: 'Software Engineer, IoT & Data',
    company: 'Information and Electronic Technology Center',
    period: 'Jan 2017 — Jun 2017',
    location: '',
    bullets: [
      'Built Python analytics tooling for web-page analysis and structure metrics on AWS and MongoDB.',
      'Developed data-interface solutions for IoT devices in Python, C, and MQTT alongside an analog-electronics team.',
    ],
  },
]

export const education = [
  {
    title: 'École 42, Paris — Computer Architect',
    detail: 'Top 1% of applicants (700 of 70,000) · Level 21 · Master’s-equivalent (Bac+5)',
    year: '2015',
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    detail: 'Security foundations, SIEM tools, incident response',
    year: '2025',
  },
]

export const projects = [
  {
    featured: true,
    name: 'Meta-IQ',
    kind: 'Data Platform — solo-built, end to end',
    description:
      'A 17-service containerized data platform that replaced a manual Excel/Typeform/document workflow at 42 Abu Dhabi. Used daily by 3 teams to consolidate data for thousands of users — designed, built, secured, deployed, and operated by one engineer.',
    highlights: [
      'Prefect-orchestrated daily ingestion into 10+ PostgreSQL tables from external APIs',
      'FastAPI microservices: auth, mail, document signer, validator',
      'Hasura GraphQL + MinIO object storage + React/TypeScript frontend behind Nginx',
      'Terraform + Ansible provisioning on Azure · full Grafana/Prometheus/Loki observability',
      'RBAC, least-privilege access, audit controls, Azure Key Vault from day one',
    ],
    tags: ['FastAPI', 'PostgreSQL', 'Hasura', 'Prefect', 'Docker', 'Terraform', 'Azure', 'Grafana'],
  },
  {
    featured: false,
    name: 'Realtime Gaming Backend',
    kind: 'Chat · Matchmaking · Player comms',
    description:
      'Realtime services for a game studio — chat, matchmaking, and player communication over WebSocket, SSE, and Pub/Sub — serving thousands of concurrent players. Redesigned for fault tolerance after diagnosing crashes under connection load.',
    highlights: [],
    tags: ['WebSocket', 'SSE', 'Pub/Sub', 'Redis', 'RabbitMQ', 'Node.js'],
  },
  {
    featured: false,
    name: 'Tournament & Draft Platform',
    kind: 'End-to-end product delivery',
    description:
      'Complete tournament and draft platform for a video-game events company: backend, database design, payments (Stripe/PayPal), deployment, and client workflows — delivered solo as a freelance architect.',
    highlights: [],
    tags: ['FastAPI', 'PostgreSQL', 'Stripe', 'Docker', 'AWS'],
  },
  {
    featured: false,
    name: 'Platform-in-a-Box',
    kind: 'IaC + Observability blueprint',
    description:
      'Reusable provisioning and monitoring pattern: Terraform + Ansible infrastructure, GitHub Actions CI/CD, and a Grafana/Prometheus/Loki/Alloy stack with cAdvisor and postgres-exporter — the foundation under every system I ship.',
    highlights: [],
    tags: ['Terraform', 'Ansible', 'GitHub Actions', 'Grafana', 'Prometheus', 'Loki'],
  },
]

/**
 * PLACEHOLDERS — replace with real recommendations (e.g. from your LinkedIn
 * recommendations page) and set `placeholder: false` to remove the "sample" chip.
 */
export const recommendations = [
  {
    placeholder: true,
    quote:
      'Ilyes took a messy, manual workflow and turned it into a platform the whole team relies on every day. He owns problems end-to-end — from architecture to the dashboards that monitor it.',
    name: 'Lorem Ipsum',
    role: 'Engineering Lead · Data Platform',
  },
  {
    placeholder: true,
    quote:
      'One of the rare engineers who treats infrastructure like a product: reproducible, observable, documented. Handovers with him are effortless.',
    name: 'Dolor Sit',
    role: 'CTO · Gaming Studio',
  },
  {
    placeholder: true,
    quote:
      'Fast, autonomous, and calm under pressure. We handed him an ambiguous problem and got back a running system — with monitoring included.',
    name: 'Amet Consectetur',
    role: 'Founder · Events Platform',
  },
]

export const marqueeItems = [
  'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Terraform', 'Ansible', 'Azure', 'AWS',
  'Kubernetes', 'Grafana', 'Prometheus', 'Loki', 'Redis', 'RabbitMQ', 'GraphQL', 'React',
  'TypeScript', 'Prefect', 'Nginx', 'Linux',
]
