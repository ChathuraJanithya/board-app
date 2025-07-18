export const Swimlanes = [
  { title: "To Do", status: "To Do" as const, color: "gray" },
  { title: "In Progress", status: "In Progress" as const, color: "orange" },
  { title: "Approved", status: "Approved" as const, color: "green" },
  { title: "Reject", status: "Reject" as const, color: "red" },
];

export const BoardItems = [
  { name: "Create routes", active: false },
  { name: "Delepment React App", active: false },
  { name: "Sport Xi Project", active: true },
  { name: "Wordpress theme", active: false },
];
