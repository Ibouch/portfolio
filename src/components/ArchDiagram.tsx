import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsapCore from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { gsap, EASE, prefersReducedMotion } from '../lib/anim'

gsapCore.registerPlugin(DrawSVGPlugin, MotionPathPlugin)

type NodeProps = {
  x: number
  y: number
  w: number
  label: string
  sub?: string
  dashed?: boolean
  delay?: number
}

const H = 34

function Node({ x, y, w, label, sub, dashed, delay = 0 }: NodeProps) {
  return (
    <g data-node>
      <rect
        x={x}
        y={y}
        width={w}
        height={sub ? H + 10 : H}
        rx={7}
        fill="var(--color-raised)"
        stroke="var(--color-line-strong)"
        strokeDasharray={dashed ? '3 3' : undefined}
      />
      <text
        x={x + 10}
        y={y + 21}
        fill="var(--color-ink)"
        fontSize="10.5"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + 10}
          y={y + 35}
          fill="var(--color-dim)"
          fontSize="8"
          fontFamily="var(--font-mono)"
          letterSpacing="0.06em"
        >
          {sub}
        </text>
      )}
      <rect
        x={x + w - 10}
        y={y + 5}
        width={4}
        height={4}
        fill="var(--color-accent)"
        className="status-dot"
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  )
}

/**
 * Live architecture diagram of Meta-IQ: edges draw themselves in as the
 * card scrolls into view, then packets run the request paths forever.
 * Every node carries a blinking health dot — the system reads as *running*.
 */
export default function ArchDiagram() {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const svg = ref.current
      if (!svg) return

      const edges = svg.querySelectorAll<SVGPathElement>('[data-edge]')
      const nodes = svg.querySelectorAll('[data-node]')

      gsap.from(nodes, {
        autoAlpha: 0,
        y: 8,
        duration: 0.7,
        ease: EASE,
        stagger: 0.07,
        scrollTrigger: { trigger: svg, start: 'top 78%', once: true },
      })
      gsap.from(edges, {
        drawSVG: 0,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: { trigger: svg, start: 'top 78%', once: true },
      })

      // packets riding the main request/data paths, forever
      svg.querySelectorAll<SVGRectElement>('[data-packet]').forEach((packet, i) => {
        const path = svg.querySelector<SVGPathElement>(`[data-edge="${packet.dataset.packet}"]`)
        if (!path) return
        gsap.to(packet, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          duration: 2.2,
          delay: 1.6 + i * 0.55,
          repeat: -1,
          repeatDelay: 1.1,
          ease: 'power1.inOut',
        })
      })
    },
    { scope: ref },
  )

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 470"
      className="h-auto w-full"
      role="img"
      aria-label="Meta-IQ architecture: Nginx fronting a React UI, Hasura GraphQL and FastAPI services over PostgreSQL and MinIO, fed by Prefect pipelines, observed by Grafana, Prometheus and Loki, provisioned on Azure with Terraform."
    >
      {/* edges */}
      <g stroke="var(--color-faint)" strokeWidth="1" fill="none">
        <path data-edge="in" d="M260 44 V80" />
        <path data-edge="ui" d="M230 114 C230 140 95 134 95 162" />
        <path data-edge="gql" d="M260 114 V162" />
        <path data-edge="api" d="M290 114 C290 140 425 134 425 162" />
        <path data-edge="gql-pg" d="M240 196 C240 230 160 228 160 262" />
        <path data-edge="api-pg" d="M400 196 C400 236 200 230 200 262" />
        <path data-edge="api-minio" d="M440 196 C440 226 330 228 330 262" />
        <path data-edge="etl" d="M452 342 V306" />
        <path data-edge="etl-pg" d="M395 288 H242" />
        <path data-edge="obs" d="M135 348 C135 320 180 320 180 300" strokeDasharray="3 4" />
      </g>

      {/* packets */}
      <g fill="var(--color-accent)">
        <rect data-packet="gql" width="4" height="4" opacity="0.9" />
        <rect data-packet="gql-pg" width="4" height="4" opacity="0.9" />
        <rect data-packet="etl-pg" width="4" height="4" opacity="0.9" />
        <rect data-packet="api-minio" width="4" height="4" opacity="0.9" />
      </g>

      {/* nodes */}
      <Node x={190} y={10} w={140} label="USERS — 3 TEAMS" delay={0.2} />
      <Node x={190} y={80} w={140} label="NGINX" delay={0.7} />
      <Node x={30} y={162} w={130} label="REACT / TS UI" delay={1.1} />
      <Node x={195} y={162} w={130} label="HASURA GQL" delay={0.4} />
      <Node x={355} y={162} w={145} label="FASTAPI ×4" sub="auth · mail · sign · valid" delay={0.9} />
      <Node x={95} y={262} w={130} label="POSTGRESQL" sub="10+ tables, daily sync" delay={0.1} />
      <Node x={280} y={262} w={100} label="MINIO S3" delay={1.4} />
      <Node x={395} y={262} w={115} label="PREFECT ETL" delay={0.6} />
      <Node x={395} y={342} w={115} label="EXT. APIS" dashed delay={1.8} />
      <Node x={30} y={348} w={210} label="GRAFANA · PROM · LOKI" sub="scrapes every service" dashed delay={1.2} />

      {/* foundation bar */}
      <g data-node>
        <rect
          x={30}
          y={428}
          width={480}
          height={30}
          rx={7}
          fill="none"
          stroke="var(--color-line-strong)"
        />
        <text
          x={270}
          y={447}
          textAnchor="middle"
          fill="var(--color-dim)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="0.14em"
        >
          AZURE — PROVISIONED WITH TERRAFORM + ANSIBLE · 17 CONTAINERS
        </text>
      </g>
    </svg>
  )
}
