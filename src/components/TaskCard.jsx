import { useState, useEffect } from "react";
import "../assets/css/TaskCard.css";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day(s)`;
  if (hours > 0) return `${hours} hour(s)`;
  return `${minutes} minute(s)`;
};

function TaskCard() {
  const [todo, setTodo] = useState({
    title: "Design new homepage",
    description: "The homepage takes a new design.",
    status: "Pending",
    priority: "Low",
    dueDate: "2026-05-01T18:00:00Z",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editForm, setEditForm] = useState(todo);
  const [timeLabel, setTimeLabel] = useState("");

  const dueDate = new Date(todo.dueDate);

  useEffect(() => {
    if (todo.status === "Done") {
      setTimeLabel("Completed");
      return;
    }

    const update = () => {
      const now = new Date();
      const diff = dueDate - now;

      if (diff < 0) {
        setTimeLabel(`Overdue by ${formatTime(Math.abs(diff))}`);
      } else {
        setTimeLabel(`Due in ${formatTime(diff)}`);
      }
    };

    update();
    const interval = setInterval(update, 30000);

    return () => clearInterval(interval);
  }, [todo.dueDate, todo.status]);

  const handleCheckbox = (checked) => {
    setTodo((prev) => ({
      ...prev,
      status: checked ? "Done" : "Pending",
    }));
  };

  const handleStatusChange = (value) => {
    setTodo((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleEdit = () => {
    setEditForm(todo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setTodo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(todo);
    setIsEditing(false);
  };

  const isLongText = todo.description.length > 100;
  const displayText =
    isExpanded || !isLongText
      ? todo.description
      : todo.description.slice(0, 100) + "...";

  const isOverdue =
    todo.status !== "Done" && new Date(todo.dueDate) < new Date();

  if (isEditing) {
    return (
      <form data-testid="test-todo-edit-form">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          data-testid="test-todo-edit-title-input"
          value={editForm.title}
          onChange={(e) =>
            setEditForm({ ...editForm, title: e.target.value })
          }
        />

        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          data-testid="test-todo-edit-description-input"
          value={editForm.description}
          onChange={(e) =>
            setEditForm({ ...editForm, description: e.target.value })
          }
        />
        <p
        data-testid="test-todo-description"
        className={isExpanded ? "expanded-description" : "collapsed-description"}>
          {todo.description}
          </p>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          data-testid="test-todo-edit-priority-select"
          value={editForm.priority}
          onChange={(e) =>
            setEditForm({ ...editForm, priority: e.target.value })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label htmlFor="date">Due Date</label>
        <input
          type="datetime-local"
          id="date"
          data-testid="test-todo-edit-due-date-input"
          value={editForm.dueDate}
          onChange={(e) =>
            setEditForm({ ...editForm, dueDate: e.target.value })
          }
        />

        <button
          type="button"
          data-testid="test-todo-save-button"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          type="button"
          data-testid="test-todo-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    );
  }
  return (
    <article data-testid="test-todo-card">
      <h3
        data-testid="test-todo-title"
        style={{
          textDecoration: todo.status === "Done" ? "line-through" : "none",
        }}
      >
        {todo.title}
      </h3>

      <span
        data-testid="test-todo-priority-indicator"
        className={`priority-${todo.priority.toLowerCase()}`}
      >
        {todo.priority}
      </span>

      <p data-testid="test-todo-description">{displayText}</p>

      {isLongText && (
        <button
          data-testid="test-todo-expand-toggle"
          aria-expanded={isExpanded}
          aria-controls="todo-desc"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      )}

      <div
        id="todo-desc"
        data-testid="test-todo-collapsible-section"
      />

      <time
        data-testid="test-todo-due-date"
        dateTime={dueDate.toISOString()}
      >
        Due {formatDate(dueDate)}
      </time>

      <div
        data-testid="test-todo-time-remaining"
        aria-live="polite"
      >
        {timeLabel}
      </div>

      {isOverdue && (
        <span data-testid="test-todo-overdue-indicator">
          Overdue
        </span>
      )}

      <select
        data-testid="test-todo-status-control"
        value={todo.status}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

       <span data-testid="test-todo-status">{todo.status}</span> 

      <input
        type="checkbox"
        data-testid="test-todo-complete-toggle"
        checked={todo.status === "Done"}
        onChange={(e) => handleCheckbox(e.target.checked)}
      />

      <button
        data-testid="test-todo-edit-button"
        onClick={handleEdit}
      >
        Edit
      </button>

      <button data-testid="test-todo-delete-button">
        Delete
      </button>
    </article>
  );
}

export default TaskCard;