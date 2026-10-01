import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  OPERATIONAL_ROUTES, 
  MASSACRE_SITES, 
  MassacreSite, 
  OperationalRoute 
} from '../data/historicalData';
import { 
  RotateCcw, 
  Layers, 
  Eye, 
  EyeOff, 
  ZoomIn, 
  ZoomOut, 
  Crosshair,
  AlertOctagon,
  Maximize2
} from 'lucide-react';

interface MassacreMapProps {
  currentStepIndex: number;
  routeProgressRatio: number;
  isDarkMode: boolean;
  selectedSite: MassacreSite | null;
  onSelectSite: (site: MassacreSite) => void;
  activeTab: 'map' | 'banality';
}

// Coordinate projection from (lat, lng) to SVG (x, y)
// Geo bounds: Lng 17.5°E ~ 41.5°E (Width 24.0°), Lat 43.0°N ~ 61.5°N (Height 18.5°)
// SVG canvas viewBox: 0 0 1000 700
export const geoToSvg = (lat: number, lng: number) => {
  const x = ((lng - 17.5) / 24.0) * 900 + 50;
  const y = ((61.5 - lat) / 18.5) * 600 + 50;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
};

// Strategic Historical Reference Cities
const STRATEGIC_CITIES = [
  { name: '바르샤바', original: 'Warsaw', lat: 52.23, lng: 21.01, align: 'right' as const },
  { name: '쾨니히스베르크', original: 'Königsberg', lat: 54.71, lng: 20.51, align: 'left' as const },
  { name: '카우나스', original: 'Kaunas', lat: 54.90, lng: 23.90, align: 'top' as const },
  { name: '빌뉴스', original: 'Vilnius', lat: 54.69, lng: 25.28, align: 'right' as const },
  { name: '리가', original: 'Riga', lat: 56.95, lng: 24.11, align: 'right' as const },
  { name: '탈린', original: 'Tallinn', lat: 59.44, lng: 24.75, align: 'top' as const },
  { name: '레닌그라드', original: 'Leningrad', lat: 59.93, lng: 30.33, align: 'right' as const },
  { name: '민스크', original: 'Minsk', lat: 53.90, lng: 27.56, align: 'top' as const },
  { name: '스몰렌스크', original: 'Smolensk', lat: 54.78, lng: 32.05, align: 'right' as const },
  { name: '모스크바', original: 'Moscow', lat: 55.75, lng: 37.62, align: 'right' as const },
  { name: '르비우', original: 'Lviv', lat: 49.84, lng: 24.03, align: 'left' as const },
  { name: '지토미르', original: 'Zhytomyr', lat: 50.25, lng: 28.66, align: 'bottom' as const },
  { name: '키이우', original: 'Kyiv', lat: 50.45, lng: 30.52, align: 'top' as const },
  { name: '하르키우', original: 'Kharkiv', lat: 50.00, lng: 36.23, align: 'right' as const },
  { name: '오데사', original: 'Odessa', lat: 46.48, lng: 30.73, align: 'bottom' as const },
  { name: '심페로폴', original: 'Simferopol', lat: 44.95, lng: 34.10, align: 'top' as const },
  { name: '세바스토폴', original: 'Sevastopol', lat: 44.62, lng: 33.53, align: 'bottom' as const },
  { name: '로스토프', original: 'Rostov-on-Don', lat: 47.23, lng: 39.72, align: 'right' as const },
  { name: '스탈린그라드', original: 'Stalingrad', lat: 48.71, lng: 40.50, align: 'right' as const },
];

export const MassacreMap: React.FC<MassacreMapProps> = ({
  currentStepIndex,
  routeProgressRatio,
  isDarkMode,
  selectedSite,
  onSelectSite,
  activeTab,
}) => {
  // Pan and Zoom transform state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hovered site tooltip in SVG
  const [hoveredSite, setHoveredSite] = useState<MassacreSite | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Group visibility filter
  const [visibleGroups, setVisibleGroups] = useState<{ [key: string]: boolean }>({
    'Group A': true,
    'Group B': true,
    'Group C': true,
    'Group D': true,
  });

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Touch gesture state ref
  const touchStateRef = useRef<{
    lastDist: number | null;
    lastX: number;
    lastY: number;
    isPanning: boolean;
  }>({
    lastDist: null,
    lastX: 0,
    lastY: 0,
    isPanning: false,
  });

  // Cursor-centered zoom application formula:
  // Keeps the exact SVG coordinate under (clientX, clientY) anchored in place!
  const applyZoomAt = useCallback((zoomFactor: number, clientX: number, clientY: number) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    
    // Convert client position to SVG coordinate space [0..1000, 0..700]
    const svgX = ((clientX - rect.left) / rect.width) * 1000;
    const svgY = ((clientY - rect.top) / rect.height) * 700;

    setZoom((prevZoom) => {
      const nextZoom = Math.min(4.5, Math.max(0.65, prevZoom * zoomFactor));
      if (nextZoom === prevZoom) return prevZoom;

      setPan((prevPan) => ({
        x: svgX - (nextZoom / prevZoom) * (svgX - prevPan.x),
        y: svgY - (nextZoom / prevZoom) * (svgY - prevPan.y),
      }));

      return nextZoom;
    });
  }, []);

  // Native Non-Passive Wheel & Trackpad Pinch Listener
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent browser default window scrolling/zooming
      e.preventDefault();

      let zoomFactor = 1;
      if (e.ctrlKey) {
        // Trackpad pinch gesture (browsers send wheel with ctrlKey for laptop pinch)
        // deltaY < 0 is pinch out (zoom in), deltaY > 0 is pinch in (zoom out)
        const factor = 1 - e.deltaY * 0.015;
        zoomFactor = Math.min(1.25, Math.max(0.75, factor));
      } else {
        // Standard mouse wheel scrolling
        // Wheel up (deltaY < 0) -> Zoom in
        // Wheel down (deltaY > 0) -> Zoom out
        zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
      }

      applyZoomAt(zoomFactor, e.clientX, e.clientY);
    };

    // Touch handlers for touchscreen laptop / tablet
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStateRef.current.isPanning = true;
        touchStateRef.current.lastX = e.touches[0].clientX;
        touchStateRef.current.lastY = e.touches[0].clientY;
        touchStateRef.current.lastDist = null;
      } else if (e.touches.length === 2) {
        touchStateRef.current.isPanning = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchStateRef.current.lastDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent page scrolling while manipulating map
      e.preventDefault();

      if (e.touches.length === 1 && touchStateRef.current.isPanning) {
        const dx = e.touches[0].clientX - touchStateRef.current.lastX;
        const dy = e.touches[0].clientY - touchStateRef.current.lastY;
        touchStateRef.current.lastX = e.touches[0].clientX;
        touchStateRef.current.lastY = e.touches[0].clientY;

        const rect = container.getBoundingClientRect();
        const svgDx = (dx / rect.width) * 1000;
        const svgDy = (dy / rect.height) * 700;
        setPan((prev) => ({ x: prev.x + svgDx, y: prev.y + svgDy }));
      } else if (e.touches.length === 2 && touchStateRef.current.lastDist !== null) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const newDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;

        if (touchStateRef.current.lastDist > 0) {
          const ratio = newDist / touchStateRef.current.lastDist;
          const clampedRatio = Math.min(1.25, Math.max(0.8, ratio));
          applyZoomAt(clampedRatio, midX, midY);
        }
        touchStateRef.current.lastDist = newDist;
      }
    };

    const handleTouchEnd = () => {
      touchStateRef.current.lastDist = null;
      touchStateRef.current.isPanning = false;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [applyZoomAt]);

  // Mouse drag handlers for panning (supports left click 0 and middle scroll button 1)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 && e.button !== 1) return;
    setIsDragging(true);
    
    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 1000;
      const svgY = ((e.clientY - rect.top) / rect.height) * 700;
      setDragStart({ x: svgX - pan.x, y: svgY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 1000;
    const svgY = ((e.clientY - rect.top) / rect.height) * 700;
    setPan({
      x: svgX - dragStart.x,
      y: svgY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Button Zoom Controls (centered)
  const handleZoomIn = () => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    applyZoomAt(1.25, rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const handleZoomOut = () => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    applyZoomAt(0.8, rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Focus on selected site if clicked from parent list
  useEffect(() => {
    if (!selectedSite) return;
    const pt = geoToSvg(selectedSite.lat, selectedSite.lng);
    const targetZoom = 1.6;
    setZoom(targetZoom);
    setPan({
      x: 500 - targetZoom * pt.x,
      y: 350 - targetZoom * pt.y,
    });
  }, [selectedSite]);

  const toggleGroup = (code: string) => {
    setVisibleGroups((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  // ================= STARK MONOCHROME COLOR PALETTE =================
  const palette = isDarkMode ? {
    waterFill: '#06080c',
    waterCoastline: '#334155',
    landFill: '#0f131a',
    tacticalGrid: '#1e2430',
    border1941: '#f8fafc',
    internalBorder: '#475569',
    riverStroke: '#1e293b',
    textHalo: '#080b10',
    cityText: '#f1f5f9',
    countryLabel: '#475569',
    cardBg: 'rgba(15, 19, 26, 0.95)',
    cardBorder: '#27272a',
  } : {
    waterFill: '#d5cec2',
    waterCoastline: '#292524',
    landFill: '#faf7f0',
    tacticalGrid: '#e2dbce',
    border1941: '#0f172a',
    internalBorder: '#78716c',
    riverStroke: '#a8a29e',
    textHalo: '#faf7f0',
    cityText: '#0f172a',
    countryLabel: '#78716c',
    cardBg: 'rgba(250, 247, 240, 0.96)',
    cardBorder: '#d6cebe',
  };

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full h-[620px] lg:h-[680px] rounded-2xl overflow-hidden border border-zinc-800 light:border-parchment-300 shadow-2xl bg-black select-none touch-none"
    >
      {/* 100% Standalone Offline High-Contrast SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 700"
        className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          {/* Stark glow filters */}
          <filter id="massacrePulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* High-contrast military grid pattern */}
          <pattern id="monoGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={palette.tacticalGrid} strokeWidth="0.8" strokeDasharray="3, 5" />
          </pattern>
        </defs>

        {/* Scalable & Pannable Group */}
        <g 
          transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          style={{ transition: isDragging ? 'none' : 'transform 0.08s ease-out' }}
        >
          
          {/* ================= LAYER 1: BASE WATER / LANDMASS ================= */}
          {/* Background is Water */}
          <rect x="0" y="0" width="1000" height="700" fill={palette.waterFill} />

          {/* Main Continental Landmass (Europe & Western USSR) */}
          <path
            d="M 0,0 L 40,0 
               C 80,80 120,130 160,170 
               C 180,190 190,230 180,250 
               C 160,265 130,270 90,285 
               L 0,320 L 0,700 
               L 310,700 
               C 350,650 420,600 510,575 
               C 560,560 610,545 650,545 
               C 660,540 670,540 690,545 
               C 720,530 760,525 800,535 
               C 830,515 880,515 900,530 
               L 1000,560 L 1000,0 
               L 535,0 
               C 525,80 440,75 360,70 
               C 310,65 290,130 280,180 
               C 270,215 320,215 330,185 
               C 340,150 320,120 335,90 
               C 360,80 380,40 370,0 Z"
            fill={palette.landFill}
            stroke={palette.waterCoastline}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Baltic Islands (Saaremaa & Hiiumaa) */}
          <path
            d="M 230,140 C 245,130 265,140 255,160 C 240,165 220,155 230,140 Z"
            fill={palette.landFill}
            stroke={palette.waterCoastline}
            strokeWidth="1.5"
          />
          <path
            d="M 235,120 C 245,115 255,122 250,130 C 240,135 230,128 235,120 Z"
            fill={palette.landFill}
            stroke={palette.waterCoastline}
            strokeWidth="1.5"
          />

          {/* Crimean Peninsula (크림 반도: 페레콥 지협 연결 및 흑해 돌출부) */}
          <path
            d="M 655,548 
               C 630,555 605,570 615,585 
               C 625,600 645,605 655,602 
               C 670,612 700,612 715,595 
               C 740,590 770,580 765,570 
               C 740,565 720,550 690,550 
               C 675,545 665,545 655,548 Z"
            fill={palette.landFill}
            stroke={palette.waterCoastline}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Sea of Azov (아조프해 수면 윤곽선) */}
          <path
            d="M 700,545 C 725,525 780,520 810,540 C 800,565 750,575 700,545 Z"
            fill={palette.waterFill}
            stroke={palette.waterCoastline}
            strokeWidth="1.8"
          />

          {/* Tactical Coordinate Grid Overlay */}
          <rect x="0" y="0" width="1000" height="700" fill="url(#monoGrid)" pointerEvents="none" />

          {/* ================= LAYER 2: 1941 HISTORICAL BORDERS ================= */}
          {/* 1. 1941.06 독·소 국경선 / 바르바로사 개전선 (STARK PROMINENT DASHED BORDER) */}
          <g>
            <path
              d="M 180,250 
                 L 220,320 
                 L 260,370 
                 L 280,440 
                 L 330,490 
                 L 430,515 
                 L 505,575"
              fill="none"
              stroke={palette.border1941}
              strokeWidth="3.5"
              strokeDasharray="8, 6"
              strokeLinecap="round"
            />
            {/* Red highlight line beneath invasion border */}
            <path
              d="M 180,250 L 220,320 L 260,370 L 280,440 L 330,490 L 430,515 L 505,575"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1"
              strokeDasharray="8, 6"
              opacity="0.8"
            />
          </g>

          {/* 2. 동프로이센 / 폴란드 총독부 국경선 */}
          <path
            d="M 90,285 C 130,295 180,270 220,320"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="2"
            strokeDasharray="4, 4"
          />

          {/* 3. 발트 3국 간 국경선 (리투아니아-라트비아-에스토니아) */}
          <path
            d="M 180,250 C 220,240 270,245 320,240"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="1.5"
            strokeDasharray="3, 4"
          />
          <path
            d="M 280,180 C 310,185 360,185 410,170"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="1.5"
            strokeDasharray="3, 4"
          />
          <path
            d="M 330,120 C 380,130 420,140 435,145"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="1.5"
            strokeDasharray="3, 4"
          />

          {/* 4. 벨라루스 / 우크라이나 분계선 (프리피야트 늪지대 축선) */}
          <path
            d="M 260,370 C 350,365 440,360 540,355 C 620,350 720,360 800,370"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="1.5"
            strokeDasharray="4, 5"
          />

          {/* 5. 루마니아 / 몰도바-우크라이나 국경 (드네스트르강·프루트강 축선) */}
          <path
            d="M 330,490 C 380,505 450,540 510,575"
            fill="none"
            stroke={palette.internalBorder}
            strokeWidth="2"
            strokeDasharray="4, 4"
          />

          {/* ================= LAYER 3: RIVERS (MONOCHROME INK FLOW) ================= */}
          {/* 드네프르강 (Dnieper River: 스몰렌스크 -> 키이우 -> 하류) */}
          <path
            d="M 590,225 Q 565,280 545,320 T 540,402 T 585,480 T 605,535"
            fill="none"
            stroke={palette.riverStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 드네스트르강 (Dniester) */}
          <path
            d="M 380,420 Q 430,470 480,520 T 545,537"
            fill="none"
            stroke={palette.riverStroke}
            strokeWidth="1.8"
          />
          {/* 다우가바강 (Daugava) */}
          <path
            d="M 550,220 Q 460,210 375,190 T 297,198"
            fill="none"
            stroke={palette.riverStroke}
            strokeWidth="1.8"
          />
          {/* 돈강 & 볼가강 (Don & Volga / 스탈린그라드 방면) */}
          <path
            d="M 750,200 Q 820,320 860,420 T 910,480"
            fill="none"
            stroke={palette.riverStroke}
            strokeWidth="2"
          />

          {/* ================= LAYER 4: OPERATIONAL ROUTES (A, B, C, D) ================= */}
          {OPERATIONAL_ROUTES.map((route) => {
            if (!visibleGroups[route.code]) return null;

            const pts = route.path.map((coord) => geoToSvg(coord[0], coord[1]));
            const totalPoints = pts.length;
            const activeCount = Math.max(2, Math.min(totalPoints, Math.ceil(totalPoints * routeProgressRatio)));
            
            const activePts = pts.slice(0, activeCount);
            const remainingPts = pts.slice(activeCount - 1);

            const activePathD = activePts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            const remainingPathD = remainingPts.length >= 2
              ? remainingPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
              : '';

            return (
              <g key={route.id}>
                {/* Projected Future Path (Faint Dotted) */}
                {remainingPathD && (
                  <path
                    d={remainingPathD}
                    fill="none"
                    stroke={route.color}
                    strokeWidth="1.8"
                    strokeDasharray="4, 6"
                    opacity="0.35"
                  />
                )}

                {/* Traversed Path Halo (Glow) */}
                <path
                  d={activePathD}
                  fill="none"
                  stroke={route.color}
                  strokeWidth="8"
                  opacity="0.2"
                />

                {/* Traversed Path Solid Line */}
                <path
                  d={activePathD}
                  fill="none"
                  stroke={route.color}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.95"
                />

                {/* Animated Marching Dash Stroke */}
                <path
                  d={activePathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="6, 12"
                  className="animated-route-dash"
                  opacity="0.7"
                />

                {/* Waypoint Nodes along route */}
                {activePts.map((p, idx) => {
                  const isHead = idx === activePts.length - 1;
                  return (
                    <g key={idx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHead ? 6 : 3.5}
                        fill={route.color}
                        stroke="#ffffff"
                        strokeWidth={isHead ? 2 : 1}
                      />
                      {isHead && (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={11}
                          fill="none"
                          stroke={route.color}
                          strokeWidth="1.5"
                          opacity="0.75"
                          className="svg-ping-circle"
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* ================= LAYER 5: BACKGROUND REGION LABELS ================= */}
          <g className="select-none pointer-events-none">
            {/* Barbarossa Line Title Label */}
            <g transform="translate(255, 415) rotate(58)">
              <rect x="-85" y="-12" width="170" height="18" rx="4" fill={isDarkMode ? '#000000' : '#ffffff'} stroke="#dc2626" strokeWidth="1" opacity="0.9" />
              <text x="0" y="1" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                1941.06 독·소 국경선 (바르바로사 개전선)
              </text>
            </g>

            {/* Region Titles */}
            <text x="90" y="270" textAnchor="middle" fill={palette.countryLabel} fontSize="11" fontWeight="bold" letterSpacing="2">동프로이센</text>
            <text x="210" y="360" textAnchor="middle" fill={palette.countryLabel} fontSize="11" fontWeight="bold" letterSpacing="2">폴란드 총독부</text>
            <text x="235" y="275" textAnchor="middle" fill={palette.countryLabel} fontSize="11" fontWeight="bold" letterSpacing="2">리투아니아</text>
            <text x="310" y="210" textAnchor="middle" fill={palette.countryLabel} fontSize="11" fontWeight="bold" letterSpacing="2">라트비아</text>
            <text x="350" y="130" textAnchor="middle" fill={palette.countryLabel} fontSize="10" fontWeight="bold" letterSpacing="2">에스토니아</text>
            <text x="430" y="290" textAnchor="middle" fill={palette.countryLabel} fontSize="13" fontWeight="bold" letterSpacing="4">벨라루스</text>
            <text x="490" y="440" textAnchor="middle" fill={palette.countryLabel} fontSize="14" fontWeight="bold" letterSpacing="5">우크라이나</text>
            <text x="645" y="595" textAnchor="middle" fill={palette.countryLabel} fontSize="9.5" fontWeight="bold">크림 반도</text>
            <text x="760" y="270" textAnchor="middle" fill={palette.countryLabel} fontSize="14" fontWeight="bold" letterSpacing="4">서부 러시아 전선</text>
            <text x="310" y="555" textAnchor="middle" fill={palette.countryLabel} fontSize="11" fontWeight="bold">루마니아 왕국</text>
            <text x="90" y="150" fill={palette.countryLabel} fontSize="12" fontStyle="italic" letterSpacing="2">발트해 (Baltic Sea)</text>
            <text x="450" y="655" fill={palette.countryLabel} fontSize="13" fontStyle="italic" letterSpacing="3">흑해 (Black Sea)</text>
          </g>

          {/* ================= LAYER 6: STRATEGIC REFERENCE CITIES ================= */}
          <g>
            {STRATEGIC_CITIES.map((city) => {
              const pt = geoToSvg(city.lat, city.lng);
              const textOffset = city.align === 'left' ? -8 :
                                 city.align === 'top' ? 0 :
                                 city.align === 'bottom' ? 0 : 8;
              const yOffset = city.align === 'top' ? -8 :
                              city.align === 'bottom' ? 12 : 3.5;
              const textAnchor = city.align === 'left' ? 'end' :
                                 city.align === 'right' ? 'start' : 'middle';

              return (
                <g key={city.name} className="pointer-events-none select-none">
                  {/* City dot */}
                  <circle cx={pt.x} cy={pt.y} r="3" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

                  {/* Text Background Mask / Halo */}
                  <text
                    x={pt.x + textOffset}
                    y={pt.y + yOffset}
                    textAnchor={textAnchor}
                    stroke={palette.textHalo}
                    strokeWidth="4.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    fill="none"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {city.name}
                  </text>
                  {/* Crisp Sharp Foreground City Text */}
                  <text
                    x={pt.x + textOffset}
                    y={pt.y + yOffset}
                    textAnchor={textAnchor}
                    fill={palette.cityText}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ================= LAYER 7: PULSATING MASSACRE PINS & BADGES ================= */}
          {MASSACRE_SITES.map((site) => {
            const isOccurred = site.timelineStepId <= currentStepIndex;
            if (!isOccurred) return null;

            const pt = geoToSvg(site.lat, site.lng);
            const isSelected = selectedSite?.id === site.id;
            const badgeWidth = site.name.length * 13 + 18;

            return (
              <g
                key={site.id}
                className="cursor-pointer group"
                onClick={() => onSelectSite(site)}
                onMouseEnter={() => {
                  setHoveredSite(site);
                  setHoverPos(pt);
                }}
                onMouseLeave={() => setHoveredSite(null)}
              >
                {/* Outer Pulsing Radar Rings */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="15"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  className="svg-ping-circle"
                  opacity="0.85"
                />

                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="8.5"
                  fill="rgba(220, 38, 38, 0.4)"
                />

                {/* Core Massacre Marker */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 7 : 5.5}
                  fill="#dc2626"
                  stroke={isSelected ? '#facc15' : '#ffffff'}
                  strokeWidth={isSelected ? 3 : 2}
                  filter="url(#massacrePulseGlow)"
                  className="transition-transform group-hover:scale-125"
                />

                {/* HIGH-CONTRAST TEXT PILL BADGE */}
                <g transform={`translate(${pt.x}, ${pt.y - 18})`}>
                  <rect
                    x={-badgeWidth / 2}
                    y="-8"
                    width={badgeWidth}
                    height="17"
                    rx="4"
                    fill={isSelected ? '#991b1b' : palette.cardBg}
                    stroke={isSelected ? '#fde047' : '#dc2626'}
                    strokeWidth={isSelected ? '2' : '1.2'}
                    filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.85))"
                  />
                  <text
                    x="0"
                    y="4.5"
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#fca5a5'}
                    fontSize="9.5"
                    fontFamily="serif"
                    fontWeight="800"
                    letterSpacing="0.2"
                  >
                    {site.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ================= LAYER 8: SVG HOVER TOOLTIP CARD ================= */}
          {hoveredSite && (
            <g transform={`translate(${hoverPos.x + 12}, ${hoverPos.y - 50})`} pointerEvents="none">
              <rect
                x="0"
                y="0"
                width="220"
                height="82"
                rx="8"
                fill={isDarkMode ? '#0d1117' : '#ffffff'}
                stroke="#dc2626"
                strokeWidth="1.8"
                filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.8))"
                opacity="0.98"
              />
              <text x="12" y="20" fill="#ef4444" fontSize="11" fontWeight="bold">
                ● {hoveredSite.name}
              </text>
              <text x="12" y="38" fill={isDarkMode ? '#94a3b8' : '#64748b'} fontSize="9.5">
                일시: {hoveredSite.dateRange}
              </text>
              <text x="12" y="54" fill="#f87171" fontSize="10.5" fontWeight="bold">
                확인 희생자: {hoveredSite.casualtyDisplay.split('(')[0]}
              </text>
              <text x="12" y="70" fill="#eab308" fontSize="8.5" fontStyle="italic">
                클릭하여 기밀 보고서 원문 열람 ↗
              </text>
            </g>
          )}

          {/* ================= MILITARY COMPASS ROSE & SCALE ================= */}
          {/* North Arrow */}
          <g transform="translate(940, 55)">
            <circle cx="0" cy="0" r="18" fill={palette.cardBg} stroke={palette.internalBorder} strokeWidth="1" />
            <polygon points="0,-14 4,0 0,-3 -4,0" fill="#dc2626" />
            <polygon points="0,14 4,0 0,3 -4,0" fill={palette.countryLabel} />
            <text x="0" y="-18" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="bold">N</text>
          </g>

          {/* 500km Scale Bar */}
          <g transform="translate(820, 670)">
            <rect x="0" y="0" width="130" height="4" fill={palette.countryLabel} opacity="0.6" />
            <rect x="0" y="0" width="65" height="4" fill="#dc2626" opacity="0.9" />
            <text x="0" y="-6" fill={palette.cityText} fontSize="9" fontFamily="monospace">0</text>
            <text x="65" y="-6" fill={palette.cityText} fontSize="9" fontFamily="monospace">250km</text>
            <text x="130" y="-6" fill={palette.cityText} fontSize="9" fontFamily="monospace">500km</text>
          </g>

        </g>
      </svg>

      {/* ================= TOP-LEFT: OPERATIONAL GROUPS FILTER LEGEND ================= */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 p-3 rounded-xl backdrop-blur-md bg-obsidian-950/90 border border-zinc-800 text-slate-200 light:bg-parchment-100/95 light:border-parchment-300 light:text-slate-900 shadow-xl max-w-[270px] sm:max-w-xs transition-colors">
        <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800 light:border-parchment-300">
          <div className="flex items-center gap-1.5 text-xs font-bold font-serif tracking-wide">
            <Layers className="w-3.5 h-3.5 text-red-500" />
            <span>아인자츠그루펜 진격 축선</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 light:bg-parchment-200 light:text-slate-700">
            4개 집단군
          </span>
        </div>

        <div className="flex flex-col gap-1 mt-1">
          {OPERATIONAL_ROUTES.map((route) => {
            const isVisible = visibleGroups[route.code];
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => toggleGroup(route.code)}
                className={`flex items-center justify-between px-2 py-1 rounded text-[11px] font-medium transition-all ${
                  isVisible
                    ? 'bg-zinc-800/60 light:bg-parchment-200/90 text-slate-200 light:text-slate-900'
                    : 'opacity-40 hover:opacity-75 bg-transparent'
                }`}
                title={`${route.name} 표시/숨기기`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: route.color }}
                  />
                  <span className="truncate">{route.name}</span>
                </div>
                {isVisible ? (
                  <Eye className="w-3 h-3 text-zinc-400 light:text-slate-500" />
                ) : (
                  <EyeOff className="w-3 h-3 text-zinc-500 light:text-slate-400" />
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-zinc-800 light:border-parchment-300 text-[10px] text-zinc-400 light:text-slate-600 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block"></span>
            학살 지점 ({MASSACRE_SITES.filter(s => s.timelineStepId <= currentStepIndex).length}/7 발현)
          </span>
          <span className="text-[9px] font-mono text-amber-400">휠/터치 줌 활성</span>
        </div>
      </div>

      {/* ================= TOP-RIGHT: INTERACTIVE CANVAS ZOOM & PAN CONTROLS ================= */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-center gap-1.5 p-1.5 rounded-xl backdrop-blur-md bg-obsidian-950/90 border border-zinc-800 light:bg-parchment-100/95 light:border-parchment-300 shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 light:text-slate-700 light:hover:bg-parchment-200 transition-colors"
          title="지도 확대 (+ / 마우스 휠 위로 / 터치패드 벌리기)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Live Zoom Percentage Badge */}
        <span className="text-[10px] font-mono text-zinc-400 light:text-slate-600 px-1 select-none">
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 light:text-slate-700 light:hover:bg-parchment-200 transition-colors"
          title="지도 축소 (- / 마우스 휠 아래로 / 터치패드 모으기)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 light:text-slate-700 light:hover:bg-parchment-200 transition-colors"
          title="기본 배율(100%) 및 위치로 리셋"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ================= BOTTOM-LEFT: USER TACTICAL HINT ================= */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md bg-obsidian-950/90 border border-zinc-800 light:bg-parchment-100/90 light:border-parchment-300 text-[11px] text-zinc-300 light:text-slate-700 shadow-lg">
        <AlertOctagon className="w-3.5 h-3.5 text-crimson-600 shrink-0" />
        <span>마우스 휠 스크롤이나 노트북 터치패드 핀치(확대/축소) 제스처로 커서 지점을 부드럽게 확대·축소할 수 있으며, 드래그하여 탐색할 수 있습니다.</span>
      </div>

    </div>
  );
};
