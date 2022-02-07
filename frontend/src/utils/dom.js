function sinEaseOut(timestamp, begining, change, duration) {
  return change * ((timestamp = timestamp / duration - 1) * timestamp * timestamp + 1) + begining;
}

function scrollWithSlowMotion(target, scrollStart, scroll) {
  const raf = window?.requestAnimationFrame;
  let start = 0;
  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const stepScroll = sinEaseOut(timestamp - start, 0, scroll, 400);
    const total = scrollStart + stepScroll;
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step);
    }
  };
  raf(step);
}

export function scrollToBottom(elm) {
  if (!elm) return;
  const screenHeight = elm.clientHeight;
  const { scrollTop } = elm;
  const scrollOffset = elm.scrollHeight - (scrollTop + screenHeight);
  if (scrollOffset) scrollWithSlowMotion(elm, scrollTop, scrollOffset);
}
