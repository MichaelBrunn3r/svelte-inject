interface After {
  after: string | Element;
}

interface Before {
  before: string | Element;
}

interface Append {
  append: string | Element;
}

export function inject(
  element: Element,
  target: string | Element | After | Before | Append = 'body'
) {
  if (target instanceof Element) {
    const targetEl = target;
    targetEl.appendChild(element);
  } else {
    let targetEl =
      (target as After).after ||
      (target as Before).before ||
      (target as Append).append ||
      (target as string);

    if (typeof targetEl === 'string') {
      const match = document.querySelector(targetEl);
      if (!match)
        throw new Error(`Failed to inject node. Query failed to match target '${target}'.`);
      targetEl = match;
    }

    if ((target as After).after) targetEl.parentNode?.insertBefore(element, targetEl.nextSibling);
    else if ((target as Before).before) targetEl.parentNode?.insertBefore(element, targetEl);
    else targetEl.appendChild(element);
  }

  return {
    destroy() {
      element.remove();
    },
  };
}
