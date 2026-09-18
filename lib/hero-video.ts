/** Silent background playback, including recovery after an iOS autoplay refusal. */
export function attachHeroVideo(video: HTMLVideoElement) {
  let disposed = false;
  let pending = false;
  let inView = true;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.controls = false;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  function attemptPlayback() {
    if (disposed || document.hidden || !inView || !video.paused || pending) return;
    video.muted = true;
    pending = true;
    // Call play synchronously: delaying it loses the iOS touch activation.
    void video.play().then(() => {
      if (!disposed) video.dataset.playback = "playing";
    }).catch((error: unknown) => {
      if (disposed) return;
      const name = error instanceof Error ? error.name : "PlaybackError";
      video.dataset.playback = name === "NotAllowedError" ? "blocked" : "waiting";
    }).finally(() => {
      pending = false;
    });
  }

  function onPlaying() {
    video.dataset.playback = "playing";
  }

  function onEnded() {
    video.currentTime = 0;
    attemptPlayback();
  }

  function onVisibilityChange() {
    if (!document.hidden) attemptPlayback();
  }

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) attemptPlayback();
  });
  observer.observe(video);

  video.addEventListener("loadedmetadata", attemptPlayback);
  video.addEventListener("canplay", attemptPlayback);
  video.addEventListener("playing", onPlaying);
  video.addEventListener("ended", onEnded);
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pageshow", attemptPlayback);
  // A normal touch on the page can unlock playback; no overlay blocks the CTAs.
  document.addEventListener("touchend", attemptPlayback, { passive: true, capture: true });
  document.addEventListener("pointerup", attemptPlayback, { passive: true, capture: true });
  document.addEventListener("keydown", attemptPlayback, true);
  attemptPlayback();

  return () => {
    disposed = true;
    observer.disconnect();
    video.removeEventListener("loadedmetadata", attemptPlayback);
    video.removeEventListener("canplay", attemptPlayback);
    video.removeEventListener("playing", onPlaying);
    video.removeEventListener("ended", onEnded);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pageshow", attemptPlayback);
    document.removeEventListener("touchend", attemptPlayback, true);
    document.removeEventListener("pointerup", attemptPlayback, true);
    document.removeEventListener("keydown", attemptPlayback, true);
  };
}
