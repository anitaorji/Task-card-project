# 🧩 Advanced TaskCard — Stage 1a

# 🚀 Overview

This project builds on the Stage 0 TaskCard by introducing **stateful interactions, editable content, and dynamic UI behavior**. The component now behaves more like a real application module rather than a static UI element.

---

# 🔄 What Changed from Stage 0

### 1. Stateful Architecture

* Introduced a centralized `todo` state object
* Added UI state:

  * `isEditing`
  * `isExpanded`
  * `editForm`
  * `timeLabel`

---

### 2. Edit Mode

* Users can edit:

  * Title
  * Description
  * Priority
  * Due date
* Added Save and Cancel functionality
* Form resets correctly on cancel

---

### 3. Status Management

* Introduced status control (`Pending`, `In Progress`, `Done`)
* Checkbox and status dropdown are fully synchronized:

  * Checking → sets status to `Done`
  * Unchecking → reverts to `Pending`
* Status reflected visually across UI

---

### 4. Expand / Collapse Description

* Long descriptions are truncated by default
* Expand/Collapse toggle added
* Fully keyboard accessible with `aria-expanded` and `aria-controls`

---

### 5. Time Handling

* Dynamic time updates every 30 seconds
* Displays:

  * “Due in X days/hours/minutes”
  * “Overdue by X time”
* Stops updating when task is marked as `Done`
* Displays “Completed” when finished

---

### 6. Overdue Indicator

* Visual “Overdue” badge added
* Triggered when due date passes and task is not completed

---

### 7. Priority Indicator Enhancement

* Priority now has stronger visual feedback:

  * Color-coded badges
  * Left border accent
* Supports:

  * Low
  * Medium
  * High

---

### 8. Improved Styling & Responsiveness

* Better layout handling for long content
* Responsive design across:

  * Mobile (320px)
  * Tablet (768px)
  * Desktop (1024px+)
* Tags wrap correctly without overflow

---

# 🎨 New Design Decisions

### 1. Single Source of Truth

All task data is managed in one `todo` object to avoid inconsistent UI state.

---

### 2. CSS Line Clamp for Description

Used CSS-based truncation instead of string slicing:

* Prevents layout breaking
* Adapts to screen size automatically

---

### 3. Status-Driven UI Styling

Visual styles are dynamically applied using status-based classes:

* `.done`
* `.pending`
* `.in-progress`

This improves clarity and reduces conditional rendering complexity.

---

### 4. Accessible Focus Handling

Replaced default focus behavior with `:focus-visible`:

* Removes unwanted focus rings on mouse click
* Preserves keyboard accessibility

---

### 5. Derived Time State

Time remaining is computed dynamically using `useEffect` with interval updates, instead of being stored statically.

---

# ⚠️ Known Limitations

* `datetime-local` input may require formatting adjustments for full browser consistency
* No animation for expand/collapse (instant toggle)
* Time updates depend on client system clock

---

# ♿ Accessibility Notes

* All form inputs include associated `<label>` elements
* Expand/Collapse uses:

  * `aria-expanded`
  * `aria-controls`
* Live time updates use:

  * `aria-live="polite"`
* Keyboard navigation supported:

  * Checkbox
  * Status control
  * Expand toggle
  * Edit / Delete buttons
* Focus styling implemented using `:focus-visible`

---

# 🧪 Test Coverage Considerations

* All required `data-testid` attributes are present
* Edit mode functionality verified
* Status synchronization tested
* Expand/collapse behavior validated
* Time updates verified at runtime


