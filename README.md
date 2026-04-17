# TaskCard App

A simple React TaskCard component that displays task details including title, description, priority, due date, time remaining, status, tags, and actions (edit/delete). Built with React and plain CSS.

1.How to Run Locally
- Clone the repository
  git clone https://github.com/YOUR_USERNAME/taskcard-app.git
- cd taskcard-app
- npm install
- npm run dev
- Open in browser

2. Technical Decisions
- Plain CSS over UI frameworks
I used vanilla CSS instead of Tailwind or libraries to keep styling explicit and readable, reduce dependency overhead and make the component easier to review and test.
- React Hooks for state management
useState → handles completion state and time remaining
useEffect → updates time remaining at regular intervals.
- Utility functions outside component
Helper functions like: formatDate and getTimeRemaining were placed outside the component to:
avoid re-creation on every render, improve readability and keep logic reusable and clean

3.Trade-offs
- Interval updates (60 seconds)
Instead of real-time second-by-second updates:
improves performance

- Static due date
The due date is currently hardcoded for simplicity:
easier testing and demo
