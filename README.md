# Task Manager

A small task manager built with React. Add, edit and remove tasks — everything is
persisted to `localStorage`, so your list survives a page reload.

![Task Manager demo](https://github.com/Felps03/react-Task-Manager/blob/master/public/Task%20Manager.gif?raw=true)

## Features

- Add a task
- Edit an existing task
- Remove a single task
- Clear the whole list
- Tasks persisted in `localStorage`

## Tech stack

- [React 19](https://react.dev/) with hooks and the Context API
- [Vite 8](https://vite.dev/) for the dev server and production build
- Plain CSS — no UI framework

## Getting started

Requires **Node.js 20.19+** (or 22.12+).

```bash
git clone https://github.com/Felps03/react-Task-Manager.git
cd react-Task-Manager
npm install
npm run dev
```

The dev server prints a local URL (`http://localhost:5173` by default).

## Scripts

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the dev server with hot module replacement |
| `npm run build`   | Build for production into `dist/`                |
| `npm run preview` | Serve the production build locally               |

## Project structure

```
index.html                       # Vite entry point
vite.config.js
public/                          # Static assets copied as-is
src/
  main.jsx                       # Mounts <App /> into #root
  App.css                        # All the styling
  components/
    App.jsx                      # Layout, wraps everything in the provider
    Header.jsx
    TaskForm.jsx                 # Add / edit form
    TaskList.jsx                 # Renders the list or the empty state
    Task.jsx                     # A single row with its delete/edit buttons
  contexts/
    TaskListContext.jsx          # Task state, actions and localStorage sync
```

## How it works

All state lives in `TaskListContext.jsx`. It holds two pieces of state:

- `tasks` — the list, hydrated from `localStorage` on first render and written
  back by an effect whenever it changes.
- `editItem` — the task currently being edited, or `null` when the form is in
  "add" mode.

`TaskForm` reads `editItem` to decide whether submitting should call `addTask`
or `editTask`, and mirrors its title into the input. Every action that could
make `editItem` stale (clearing the list, deleting the task being edited) resets
it back to `null`.

IDs come from the browser's built-in [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID),
which is available on `localhost` and any HTTPS origin.

## License

MIT
