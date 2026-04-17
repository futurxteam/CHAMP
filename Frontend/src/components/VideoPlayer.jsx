import React from "react";

export default function VideoPlayer({ url, poster }) {
  if (!url) return null;

  return (
    <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl group">
      <video 
        src={url} 
        poster={poster}
        controls 
        className="w-full h-full object-contain"
      />
      
      {/* Visual Overlay for unplayed state */}
      {!url.includes("blob") && (
         <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
}
