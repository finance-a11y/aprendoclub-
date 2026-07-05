import {
  ArrowRight,
  Award,
  Book,
  BookOpen,
  Briefcase,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  DollarSign,
  FolderOpen,
  GraduationCap,
  Info,
  Lightbulb,
  Menu,
  MessageCircle,
  Rocket,
  Shield,
  Star,
  Target,
  Timer,
  Trophy,
  TrendingUp,
  Users,
  Video,
  Wrench,
  X,
  Youtube,
  type LucideIcon,
} from 'lucide-react'

/**
 * Adaptador string -> componente de icono lucide.
 *
 * Mapa explícito (NO import dinámico de todo lucide-react, para no inflar el
 * bundle): cubre los iconos usados hoy en components/*-section.tsx,
 * components/diplomado/*, components/reto/* y components/quienes-somos/*.
 *
 * Los bloques (FeatureGrid, etc.) guardan el nombre como string (ej. "rocket",
 * "target"); este helper resuelve ese string al componente. Si el nombre no
 * existe en el mapa, cae a un icono neutro (Info) en vez de romper el render.
 */
export const lucideIcons: Record<string, LucideIcon> = {
  arrowRight: ArrowRight,
  award: Award,
  book: Book,
  bookOpen: BookOpen,
  briefcase: Briefcase,
  brain: Brain,
  calendar: Calendar,
  check: Check,
  checkCircle2: CheckCircle2,
  chevronDown: ChevronDown,
  clock: Clock,
  compass: Compass,
  dollarSign: DollarSign,
  folderOpen: FolderOpen,
  graduationCap: GraduationCap,
  info: Info,
  lightbulb: Lightbulb,
  menu: Menu,
  messageCircle: MessageCircle,
  rocket: Rocket,
  shield: Shield,
  star: Star,
  target: Target,
  timer: Timer,
  trophy: Trophy,
  trendingUp: TrendingUp,
  users: Users,
  video: Video,
  wrench: Wrench,
  x: X,
  youtube: Youtube,
}

/** Fallback neutro cuando el nombre de icono no está en el mapa. */
const FALLBACK_ICON: LucideIcon = Info

/**
 * Devuelve el componente de icono lucide correspondiente al nombre guardado
 * en un campo de bloque. Acepta undefined/null/nombre desconocido sin lanzar.
 */
export function lucideIcon(name?: string | null): LucideIcon {
  if (!name) return FALLBACK_ICON
  return lucideIcons[name] ?? FALLBACK_ICON
}
