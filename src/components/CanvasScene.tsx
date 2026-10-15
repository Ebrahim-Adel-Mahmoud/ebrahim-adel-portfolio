import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion'
import { profile } from '../data/profile'
import { easeOut } from '../lib/motion'

const snippets = [
  {
    id: 'laravel',
    label: 'Laravel',
    className: 'canvas__tile--a',
    code: `Route::middleware('auth:sanctum')
  ->prefix('api')
  ->group(function () {
    Route::get('/products',
      [ProductController::class, 'index']);
    Route::post('/orders',
      [OrderController::class, 'store']);
  });

class ProductController {
  public function index(Request $r) {
    return Product::query()
      ->search($r->q)
      ->with('category')
      ->latest()
      ->paginate(20);
  }
}

$order = DB::transaction(fn () =>
  Order::create([
    'user_id' => auth()->id(),
    'total'   => $cart->total(),
  ])
);`,
  },
  {
    id: 'react',
    label: 'React',
    className: 'canvas__tile--b',
    code: `export function ProductList() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)

  useEffect(() => {
    let alive = true
    fetch(\`/api/products?q=\${deferred}\`)
      .then((r) => r.json())
      .then((data) => {
        if (alive) setItems(data)
      })
    return () => { alive = false }
  }, [deferred])

  return (
    <section>
      <Search value={query}
        onChange={setQuery} />
      {items.map((item) => (
        <Card key={item.id}
          product={item} />
      ))}
    </section>
  )
}`,
  },
  {
    id: 'spring',
    label: 'Spring',
    className: 'canvas__tile--c',
    code: `@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
class ProductController {
  private final ProductService service;

  @GetMapping
  ResponseEntity<Page<ProductDto>> list(
      @RequestParam Optional<String> q,
      Pageable pageable) {
    return ResponseEntity.ok(
      service.search(q, pageable));
  }

  @PostMapping
  @ResponseStatus(CREATED)
  ProductDto create(
      @Valid @RequestBody
      CreateProductRequest req) {
    return service.create(req);
  }
}

@Service
class ProductService {
  Page<ProductDto> search(
      Optional<String> q,
      Pageable pageable) { ... }
}`,
  },
]

const CHAR_MS = 14
const TILE_STAGGER_MS = 320
const HOLD_MS = 2400
const springSoft = { stiffness: 140, damping: 20, mass: 0.35 }

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.35 + i * 0.12,
      duration: 0.55,
      ease: easeOut,
    },
  }),
}

function CodeReveal({
  code,
  startDelay,
  reduceMotion,
}: {
  code: string
  startDelay: number
  reduceMotion: boolean
}) {
  const full = useMemo(() => code, [code])
  const [shown, setShown] = useState(reduceMotion ? full.length : 0)
  const done = shown >= full.length

  useEffect(() => {
    if (reduceMotion) {
      setShown(full.length)
      return
    }

    let cancelled = false
    let timer = 0

    const run = () => {
      setShown(0)
      let i = 0

      const type = () => {
        if (cancelled) return
        i += 1
        setShown(i)
        if (i < full.length) {
          const wait = full[i - 1] === '\n' ? CHAR_MS * 3.2 : CHAR_MS
          timer = window.setTimeout(type, wait)
        } else {
          timer = window.setTimeout(run, HOLD_MS)
        }
      }

      timer = window.setTimeout(type, startDelay)
    }

    run()

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [full, startDelay, reduceMotion])

  return (
    <pre className="canvas__code">
      <code>
        {full.slice(0, shown)}
        {!done ? <span className="canvas__caret" aria-hidden="true" /> : null}
      </code>
    </pre>
  )
}

export function CanvasScene() {
  const reduceMotion = useReducedMotion() ?? false
  const boardRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawRotX = useMotionValue(0)
  const rawRotY = useMotionValue(0)

  const x = useSpring(rawX, springSoft)
  const y = useSpring(rawY, springSoft)
  const rotX = useSpring(rawRotX, springSoft)
  const rotY = useSpring(rawRotY, springSoft)

  const parallax = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !boardRef.current) return
    const rect = boardRef.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rawX.set(px * 12)
    rawY.set(py * 9)
    rawRotY.set(px * 5)
    rawRotX.set(py * -5)
  }

  const onPointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
    rawRotX.set(0)
    rawRotY.set(0)
  }

  return (
    <div
      className="canvas"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className="canvas__float"
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 1, y: [0, -7, 0], scale: 1 }
        }
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : {
                opacity: { duration: 0.75, ease: easeOut },
                scale: { duration: 0.75, ease: easeOut },
                y: {
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                },
              }
        }
      >
        <motion.div
          ref={boardRef}
          className="canvas__board"
          style={
            reduceMotion
              ? undefined
              : { transform: parallax, transformStyle: 'preserve-3d' }
          }
        >
          <div className="canvas__grain" />
          <motion.div
            className="canvas__panel canvas__panel--back"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: easeOut }}
          />

          <div className="canvas__panel canvas__panel--main">
            <div className="canvas__window">
              <div className="canvas__bar">
                <span className="canvas__dot" />
                <span className="canvas__dot" />
                <span className="canvas__dot" />
              </div>
              <div className="canvas__body">
                {snippets.map((snippet, index) => (
                  <motion.div
                    key={snippet.id}
                    className={`canvas__tile ${snippet.className}`}
                    custom={index}
                    variants={tileVariants}
                    initial={reduceMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    <span className="canvas__tile-label">{snippet.label}</span>
                    <CodeReveal
                      code={snippet.code}
                      startDelay={480 + index * TILE_STAGGER_MS}
                      reduceMotion={reduceMotion}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="canvas__panel canvas__panel--chip"
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5, ease: easeOut }}
          >
            <strong>{profile.years} yrs</strong>
            <span>shipping products</span>
          </motion.div>

          <motion.div
            className="canvas__tags"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease: easeOut }}
          >
            <span className="canvas__tag">#java</span>
            <span className="canvas__tag">#springboot</span>
            <span className="canvas__tag">#laravel</span>
            <span className="canvas__tag">#react</span>
          </motion.div>

          <span className="canvas__node canvas__node--1" />
          <span className="canvas__node canvas__node--2" />
        </motion.div>
      </motion.div>
    </div>
  )
}
