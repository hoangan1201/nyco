export const focusOnHeaderLogo = () => {
  const logo = document.getElementById('main-header-logo')
  
  if (logo) {
    logo.focus();
  }
}

export const addIdToTopHeading = () => {
  // Add id="main-heading" to top heading on a given site
  const potentialHeadings = []
  const tagsNamesToConsider = ['h1', 'h2', 'h3', 'h4']

  while (potentialHeadings.length == 0) { // If no H1 available, try H2s etc.
    let tagName = tagsNamesToConsider.shift()
    potentialHeadings.push(...document.getElementsByTagName(tagName))
  }

  if (potentialHeadings.length > 0) {
    potentialHeadings[0].setAttribute('id', 'main-heading');
  }
}

export const accessibilityDomAdjustments = () => {
  // If a container is hidden from screen readers, ensure it doesn't have content that can be tabbed into
  const srHiddenContainers = document.querySelectorAll('[aria-hidden=true]')
  srHiddenContainers.forEach(hidden => {
    hidden.querySelectorAll('[tabindex="0"]').forEach(el => {
      el.setAttribute('tabindex', '-1')
    });
  })
}

export const focusOnAlertFields = () => {
  // On next tick, put form errors in focus (screen readers)
  setTimeout(() => {
    let firstErrorLabel = document.querySelector('[data-is-alert=true]')
    if (firstErrorLabel) {
      firstErrorLabel.focus()
    }
  }, 0)
}

export const replaceVoiceoverCharacters = (string) => {
  const replacements = [
    { from: '>=', 'to': 'at least' },
    { from: '<=', 'to': 'up to' },
    { from: '<', 'to': 'less than' },
    { from: '>', 'to': 'more than' },
    { from: '=', 'to': 'equals' },
    { from: '-Q', 'to': ' quarter ' },
    { from: '-', 'to': ' to '}
  ]

  replacements.forEach(replacement => {
    string = string.replaceAll(replacement.from, replacement.to)
  })

  return string
}

export const putFocusOnElement = ({ node, elementId, preventScroll }) => {
  // Puts screen reader focus on an arbitrary element (e.g. heading)
  // by temporarily putting it in the tab order
  const element = node ? node : document.getElementById(elementId)

  if (element) {
    let wasInTabOrder = element.getAttribute('tabindex')

    if (!wasInTabOrder) {
      element.setAttribute('tabindex', 0)
    }

    element.focus({ preventScroll })

    if (!wasInTabOrder) {
      element.removeAttribute('tab-index')
    }
  }
}

export const blockFocusOutsideContainer = (event, container) => {
  // Force cycling of focus inside a given container for screen readers
  if (!container.contains(event.target)) {
    putFocusOnElement(container);
  }
}