import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

// ── Usage ─────────────────────────────────────────────────────────────────────
//
//   import { usePageTransition, PageTransition } from './PageTransition';
//
//   // In your router / layout:
//   const { trigger, label } = usePageTransition();
//
//   // Wrap a nav link:
//   <button onClick={() => trigger('/about', 'About', () => router.push('/about'))}>
//     About
//   </button>
//
//   // Mount once at app root:
//   <PageTransition label={label} />
//
// ─────────────────────────────────────────────────────────────────────────────

const H    = "'Orbitron', sans-serif";
const MONO = "'JetBrains Mono', monospace";

// Glitch hook — cycles characters then resolves to real text
function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ01';

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    let raf;
    const total = 18;
    const tick = () => {
      frame++;
      const progress = frame / total;
      setDisplay(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i / text.length < progress) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (frame < total) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, text]);

  return display;
}

// ── Shared state (module-level singleton) ─────────────────────────────────────
let _setVisible = null;
let _setLabel   = null;
let _setPhase   = null;  // 'in' | 'hold' | 'out' | null

export function usePageTransition() {
  // Call trigger(label, callback) to start the transition
  // callback fires at the midpoint (page swap moment)
  const trigger = (label, callback) => {
    if (!_setVisible || !_setLabel || !_setPhase) {
      callback?.();
      return;
    }
    _setLabel(label || '');
    _setPhase('in');
    _setVisible(true);
    setTimeout(() => {
      callback?.();
      _setPhase('hold');
    }, 520);
    setTimeout(() => {
      _setPhase('out');
    }, 950);
    setTimeout(() => {
      _setVisible(false);
      _setPhase(null);
    }, 1450);
  };

  return { trigger };
}

// ── The overlay component — mount once at app root ────────────────────────────
export function PageTransition({ label = '' }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase]     = useState(null);
  const [routeLabel, setLabel] = useState(label);
  const glitched = useGlitch(routeLabel, phase === 'hold');

  // Register setters so usePageTransition can reach them
  useEffect(() => {
    _setVisible = setVisible;
    _setLabel   = setLabel;
    _setPhase   = setPhase;
    return () => { _setVisible = null; _setLabel = null; _setPhase = null; };
  }, []);

  useEffect(() => { setLabel(label); }, [label]);

  // Theme tokens
  const panelBg   = useColorModeValue('#f7f7f8', '#0a0a0a');
  const lineColor = useColorModeValue('rgba(0,0,0,0.08)', 'rgba(255,255,255,0.06)');
  const gridColor = useColorModeValue('rgba(0,0,0,1)',    'rgba(255,255,255,1)');
  const gridOp    = useColorModeValue(0.03, 0.018);
  const labelCol  = useColorModeValue('rgba(0,0,0,0.12)', 'rgba(255,255,255,0.08)');
  const routeCol  = useColorModeValue('#111',             '#fff');
  const monoCol   = useColorModeValue('rgba(0,0,0,0.35)', 'rgba(255,255,255,0.35)');

  // Diagonal clip path — panel slides in/out as a skewed shape
  const clipIn  = 'polygon(0 0, 110% 0, 95%  100%, 0 100%)';
  const clipHold= 'polygon(0 0, 110% 0, 110% 100%, 0 100%)';
  const clipOut = 'polygon(105% 0, 110% 0, 110% 100%, 90% 100%)';

  const clipPath = phase === 'in'   ? clipIn
                 : phase === 'hold' ? clipHold
                 : clipOut;

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      pointerEvents: phase === 'out' ? 'none' : 'all',
    }}>
      {/* Main panel */}
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, -15% 100%, 0 100%)' }}
        animate={{ clipPath }}
        transition={{
          duration: phase === 'in' ? 0.42 : phase === 'hold' ? 0 : 0.42,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: 'absolute', inset: 0,
          background: panelBg,
          overflow: 'hidden',
        }}
      >
        {/* Dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: gridOp,
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {/* Horizontal scan lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: phase === 'out' ? 0 : 1, originX: phase === 'out' ? 1 : 0 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: 0, right: 0,
              top: `${15 + i * 14}%`, height: '1px',
              background: `linear-gradient(to right, transparent, ${lineColor}, transparent)`,
            }}
          />
        ))}

        {/* Corner index marks */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: phase === 'out' ? 0 : 1, scale: phase === 'out' ? 0.6 : 1 }}
            transition={{ duration: 0.2, delay: 0.15 + i * 0.03 }}
            style={{
              position: 'absolute', ...pos,
              width: 16, height: 16,
              borderTop: pos.top !== undefined ? `1px solid ${lineColor}` : 'none',
              borderBottom: pos.bottom !== undefined ? `1px solid ${lineColor}` : 'none',
              borderLeft: pos.left !== undefined ? `1px solid ${lineColor}` : 'none',
              borderRight: pos.right !== undefined ? `1px solid ${lineColor}` : 'none',
            }}
          />
        ))}

        {/* Center content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 16,
        }}>
          {/* Loading bar */}
          <motion.div style={{
            width: 120, height: 1,
            background: lineColor, borderRadius: 1, overflow: 'hidden',
            position: 'relative',
          }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: phase === 'out' ? '100%' : '0%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, #1e40af, #7c3aed, #ec4899)',
              }}
            />
          </motion.div>

          {/* Route label */}
          {routeLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase === 'out' ? 0 : 1, y: phase === 'out' ? -8 : 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: MONO, fontSize: 9, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: monoCol, marginBottom: 6,
              }}>
                navigating to
              </div>
              <div style={{
                fontFamily: H, fontSize: 'clamp(20px, 4vw, 36px)',
                fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1,
                color: routeCol,
              }}>
                {glitched}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom progress ticker */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: phase === 'out' ? 0 : 1, originX: phase === 'out' ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(to right, #1e40af, #7c3aed, #ec4899)',
          }}
        />

        {/* Frame counter (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'hold' ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute', bottom: 20, right: 24,
            fontFamily: MONO, fontSize: 9, letterSpacing: '0.2em',
            color: monoCol,
          }}
        >
          {String(Math.floor(Math.random() * 900 + 100))}/1000
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PageTransition;