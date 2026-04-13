import { useState, useEffect } from "react";
import "../assets/css/TaskCard.css";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTimeRemaining(dueDate) {
  const now = new Date();
  const diff = dueDate - now;

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff <= 0) {
    const absDiff = Math.abs(diff);

    const hours = Math.floor(absDiff / hour);
    const minutes = Math.floor((absDiff % hour) / minute);

    if (hours === 0 && minutes === 0) return "Due now!";
    if (hours === 0)
      return `Overdue by ${minutes} minute${minutes > 1 ? "s" : ""}`;

    return `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
  }

  const days = Math.ceil(diff / day);

  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";

  return `Due in ${days} day${days > 1 ? "s" : ""}`;
}

function TaskCard() {
  const [completed, setCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");

  const dueDate = new Date("2026-05-01T18:00:00Z");

  useEffect(() => {
    const update = () => {
      setTimeRemaining(getTimeRemaining(dueDate));
    };

    update();
    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [dueDate]);
return (
  <article data-testid="test-todo-card">
    <h3 data-testid="test-todo-title">Design new homepage</h3>
    <p data-testid="test-todo-description">The homepage takes a new design.</p>
    <span
        data-testid="test-todo-priority"
        className="priority-low"
        aria-label="Low priority">
        Low
      </span>
    <time
        data-testid="test-todo-due-date"
        dateTime={dueDate.toISOString()}>
        Due {formatDate(dueDate)}
      </time>

      <div
        data-testid="test-todo-time-remaining"
        aria-live="polite">
        {timeRemaining}
      </div>

    <span data-testid="test-todo-status">
        {completed ? "Done" : "Pending"}
      </span>
    <div className="todo-toggle">
        <input
          id="complete-toggle"
          type="checkbox"
          data-testid="test-todo-complete-toggle"
          checked={completed}
          onChange={() => setCompleted(!completed)}/>
        <label htmlFor="complete-toggle">
          Mark
        </label>
      </div>

  <ul
    data-testid="test-todo-tags"
    role="list"
    className="tags">
    <li data-testid="test-todo-tag-work" className="tag">Work</li>
    <li data-testid="test-todo-tag-urgent" className="tag">Urgent</li>
    <li data-testid="test-todo-tag-design" className="tag">Design</li>
  </ul>

  <div className="actions">
    <button
      data-testid="test-todo-edit-button"
      aria-label="Edit task"
      onClick={() => alert("edit clicked")}
      className="btn btn-edit">
      Edit
    </button>

    <button
      data-testid="test-todo-delete-button"
      aria-label="Delete task"
      onClick={() => alert("Delete clicked")}
      className="btn btn-delete">
      Delete
    </button>
  </div>
</article>
)
};
export default TaskCard;
