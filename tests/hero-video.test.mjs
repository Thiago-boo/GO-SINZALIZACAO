import assert from "node:assert/strict";
import { test } from "node:test";
import { attachHeroVideo } from "../lib/hero-video.ts";

function setup({ blocked = false } = {}) {
  const doc = new EventTarget();
  doc.hidden = false;
  const win = new EventTarget();
  const observer = { callback: undefined, disconnected: false };
  globalThis.document = doc;
  globalThis.window = win;
  globalThis.IntersectionObserver = class {
    constructor(callback) { observer.callback = callback; }
    observe() {}
    disconnect() { observer.disconnected = true; }
  };
  const video = new EventTarget();
  Object.assign(video, { paused: true, currentTime: 0, dataset: {}, calls: 0, blocked });
  video.setAttribute = () => {};
  video.play = () => {
    video.calls++;
    if (video.blocked) return Promise.reject(new DOMException("User activation required", "NotAllowedError"));
    video.paused = false;
    video.dispatchEvent(new Event("playing"));
    return Promise.resolve();
  };
  const cleanup = attachHeroVideo(video);
  return { video, doc, win, observer, cleanup };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));

test("autoplay refusal recovers synchronously inside a touch event", async () => {
  const { video, doc, cleanup } = setup({ blocked: true });
  await settle();
  assert.equal(video.dataset.playback, "blocked");
  assert.equal(video.paused, true);
  video.blocked = false;
  doc.dispatchEvent(new Event("touchend"));
  assert.equal(video.paused, false, "play must occur before the touch handler returns");
  await settle();
  assert.equal(video.dataset.playback, "playing");
  assert.equal(video.muted, true);
  assert.equal(video.defaultMuted, true);
  assert.equal(video.loop, true);
  assert.equal(video.playsInline, true);
  assert.equal(video.controls, false);
  cleanup();
});

test("resumes after returning to the viewport and after page restoration", async () => {
  const { video, doc, win, observer, cleanup } = setup();
  await settle();
  observer.callback([{ isIntersecting: false }]);
  video.paused = true;
  doc.dispatchEvent(new Event("pointerup"));
  assert.equal(video.calls, 1, "do not start an offscreen video");
  observer.callback([{ isIntersecting: true }]);
  assert.equal(video.paused, false);
  await settle();
  doc.hidden = true;
  video.paused = true;
  win.dispatchEvent(new Event("pageshow"));
  assert.equal(video.paused, true);
  doc.hidden = false;
  doc.dispatchEvent(new Event("visibilitychange"));
  assert.equal(video.paused, false);
  await settle();
  video.paused = true;
  win.dispatchEvent(new Event("pageshow"));
  assert.equal(video.paused, false);
  cleanup();
});

test("restarts at the beginning if native looping emits ended", async () => {
  const { video, cleanup } = setup();
  await settle();
  video.currentTime = 10;
  video.paused = true;
  video.dispatchEvent(new Event("ended"));
  assert.equal(video.currentTime, 0);
  assert.equal(video.paused, false);
  cleanup();
});

test("cleanup prevents any replay from lingering listeners or pending results", async () => {
  const { video, doc, win, observer, cleanup } = setup({ blocked: true });
  cleanup();
  await settle();
  doc.dispatchEvent(new Event("touchend"));
  doc.dispatchEvent(new Event("pointerup"));
  doc.dispatchEvent(new Event("keydown"));
  win.dispatchEvent(new Event("pageshow"));
  video.dispatchEvent(new Event("canplay"));
  assert.equal(video.calls, 1);
  assert.equal(video.dataset.playback, undefined);
  assert.equal(observer.disconnected, true);
});
