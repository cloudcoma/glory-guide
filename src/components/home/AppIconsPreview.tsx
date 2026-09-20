import type { ReactNode } from "react";
import "./app-icons.css";

function AppTile({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className={`app-icon-tile app-icon-tile--${name}`}>
      <svg viewBox="0 0 64 64" fill="none" focusable="false">
        {children}
      </svg>
    </div>
  );
}

const grassPixels = [
  [0, 0, "#67b63c"], [8, 0, "#7bc843"], [16, 0, "#43932c"], [24, 0, "#63ae35"],
  [32, 0, "#83c847"], [40, 0, "#5ea137"], [48, 0, "#77bd40"], [56, 0, "#4d9d31"],
  [0, 8, "#3f8528"], [8, 8, "#5b9a32"], [16, 8, "#66b13b"], [24, 8, "#7bb740"],
  [32, 8, "#4c922d"], [40, 8, "#73b439"], [48, 8, "#3f7a27"], [56, 8, "#65a737"],
  [0, 16, "#6b9934"], [8, 16, "#4b7228"], [16, 16, "#729844"], [24, 16, "#5b8730"],
  [32, 16, "#805739"], [40, 16, "#5d9634"], [48, 16, "#75aa3c"], [56, 16, "#527d2d"],
  [0, 24, "#986942"], [8, 24, "#7f5636"], [16, 24, "#67813b"], [24, 24, "#ad7d4f"],
  [32, 24, "#976c42"], [40, 24, "#81593a"], [48, 24, "#735032"], [56, 24, "#926440"],
  [0, 32, "#835d3b"], [8, 32, "#ab7d51"], [16, 32, "#93673f"], [24, 32, "#805936"],
  [32, 32, "#725034"], [40, 32, "#a8794c"], [48, 32, "#996d44"], [56, 32, "#785235"],
  [0, 40, "#ad7c4e"], [8, 40, "#8b603f"], [16, 40, "#735138"], [24, 40, "#a17147"],
  [32, 40, "#996843"], [40, 40, "#815b3e"], [48, 40, "#6f4d35"], [56, 40, "#a37349"],
  [0, 48, "#8b603e"], [8, 48, "#765338"], [16, 48, "#a8784b"], [24, 48, "#8e6340"],
  [32, 48, "#b17f51"], [40, 48, "#92633d"], [48, 48, "#9e7048"], [56, 48, "#805a3b"],
  [0, 56, "#725033"], [8, 56, "#96693f"], [16, 56, "#875c3a"], [24, 56, "#a57449"],
  [32, 56, "#835937"], [40, 56, "#714d33"], [48, 56, "#8d603c"], [56, 56, "#a17247"],
] as const;

export function AppIconsPreview() {
  return (
    <div className="app-icons-scene" role="img" aria-label="Иконки приложений для iPhone">
      <div className="app-icons-composition" aria-hidden="true">
        <AppTile name="vk">
          <path fill="white" d="M11 20h8c.5 9 3.5 15 8 17V20h8v10c4-2 7-6 9-10h9c-2 7-6 12-10 15 5 3 9 8 11 14h-9c-3-6-7-10-10-11v11h-3c-13 0-20-10-21-29Z" />
        </AppTile>
        <AppTile name="messenger">
          <path fill="white" fillRule="evenodd" d="M32 12C20.4 12 11 20.3 11 30.7c0 5.4 2.6 10.3 6.7 13.7l-.8 7.1c-.1 1.4 1.3 2.3 2.5 1.7l7.4-3.8c1.7.4 3.4.6 5.2.6 11.6 0 21-8.3 21-18.7S43.6 12 32 12Zm0 8.4c-6.8 0-12.3 4.6-12.3 10.4S25.2 41.2 32 41.2s12.3-4.6 12.3-10.4S38.8 20.4 32 20.4Z" clipRule="evenodd" />
        </AppTile>
        <AppTile name="tbank">
          <path fill="white" d="M14 14h36v23c0 7-10 14-18 17-8-3-18-10-18-17V14Z" />
          <path fill="#111317" d="M20 22h24v7h-8v15h-8V29h-8v-7Z" />
        </AppTile>
        <AppTile name="sber">
          <path stroke="#09ad79" strokeLinecap="round" strokeWidth="6.5" d="M49 35.5A20 20 0 1 1 38 14" />
          <path stroke="#09ad79" strokeLinecap="square" strokeLinejoin="round" strokeWidth="6.5" d="m22 29 10 9 21-18" />
        </AppTile>
        <AppTile name="alfa">
          <path stroke="white" strokeLinecap="square" strokeLinejoin="round" strokeWidth="6" d="m20 41 12-25 12 25M25 33h14M18 50h28" />
        </AppTile>
        <AppTile name="minecraft">
          {grassPixels.map(([x, y, color]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" fill={color} />
          ))}
        </AppTile>
        <AppTile name="youtube">
          <rect x="9" y="16" width="46" height="33" rx="10" fill="#ff2437" />
          <path fill="white" d="m27 24 15 9-15 9V24Z" />
        </AppTile>
        <AppTile name="spotify">
          <circle cx="32" cy="32" r="23" fill="#1ed760" />
          <path stroke="#13171c" strokeLinecap="round" strokeWidth="4" d="M18 25c10-4 21-3 29 2M20 33c8-3 17-2 24 2M22 40c6-2 13-1 19 2" />
        </AppTile>
        <AppTile name="tiktok">
          <path stroke="#27f4ed" strokeWidth="8" d="M34 14v27a9 9 0 1 1-8-9m8-18c1 8 6 12 14 12" />
          <path stroke="#ff406f" strokeWidth="8" d="M38 16v27a9 9 0 1 1-8-9m8-18c1 8 6 12 14 12" />
          <path stroke="white" strokeWidth="7" d="M36 14v28a9 9 0 1 1-8-9m8-19c1 8 6 12 14 12" />
        </AppTile>
      </div>
    </div>
  );
}
