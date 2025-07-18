# 📋 Board App - Project Management Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-green?style=for-the-badge&logo=vercel)](https://main.d3oesffdu3pujr.amplifyapp.com)

A modern, responsive Kanban-style project management dashboard built with Next.js 15, React 19, and TypeScript. This application provides an intuitive drag-and-drop interface for managing tasks across different workflow stages.

![Board App Dashboard](https://img.shields.io/badge/Next.js-15.4.1-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- **🎯 Kanban Board Interface**: Visual task management with drag-and-drop functionality
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔍 Real-time Search**: Filter tasks across all columns
- **👥 Team Collaboration**: Assign tasks to team members with avatars
- **📊 Task Management**: Create, edit, and organize tasks with priorities and due dates
- **🎨 Modern UI**: Built with Radix UI components and Tailwind CSS
- **⚡ Performance**: Powered by Next.js 15 with Turbopack for fast development
- **🔄 State Management**: Zustand for efficient state handling
- **📂 File Attachments**: Support for task attachments and comments

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Type-safe development
- **Tailwind CSS 4.x** - Utility-first CSS framework

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful SVG icons
- **@dnd-kit** - Modern drag-and-drop library

### State Management

- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management

### Development Tools

- **ESLint 9** - Code linting
- **Turbopack** - Fast bundler for development

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/board-app.git
   cd board-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Development with Turbopack (Recommended)

For faster development builds, the project is configured to use Turbopack:

```bash
npm run dev
```

This will automatically start the development server with Turbopack enabled.

## 📁 Project Structure

```
board-app/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── *.svg              # UI icons
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Dashboard.tsx  # Main dashboard component
│   │   ├── Header.tsx     # Application header
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   ├── TaskCard.tsx   # Individual task component
│   │   └── Swimlane.tsx   # Kanban column component
│   ├── constants/         # Application constants
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── store/             # Zustand store configuration
│   └── types/             # TypeScript type definitions
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🎯 Usage

### Task Management

1. **View Tasks**: Tasks are organized in four columns:

   - **To Do**: New tasks waiting to be started
   - **In Progress**: Currently active tasks
   - **Approved**: Completed and approved tasks
   - **Reject**: Tasks that need revision

2. **Drag and Drop**:

   - Click and drag tasks between columns to change their status
   - Reorder tasks within columns by dragging

3. **Search Tasks**: Use the search bar to filter tasks by title or content

4. **Task Details**: Each task displays:
   - Title and category
   - Assigned team members
   - Priority level (low, medium, high)
   - Due date
   - Attachment and comment counts

### Responsive Design

The application adapts to different screen sizes:

- **Desktop**: Full sidebar and multi-column layout
- **Tablet**: Collapsible sidebar with grid layout
- **Mobile**: Hidden sidebar with single-column stack

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type Checking
npx tsc --noEmit     # Check TypeScript types without building
```

## 🌐 API Endpoints

The application includes API routes for task management:

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## 🎨 Customization

### Styling

- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Components use Tailwind classes for styling

### Adding New Task Statuses

1. Update the `Status` type in `src/types/index.ts`
2. Add new swimlane configuration in `src/constants/index.ts`
3. Update the `Dashboard` component logic

### UI Components

- All UI components are in `src/components/ui/`
- Built with Radix UI primitives for accessibility
- Styled with Tailwind CSS and CVA (Class Variance Authority)

**Happy Project Managing! 🎉**
