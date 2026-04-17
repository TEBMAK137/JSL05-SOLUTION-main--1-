"use strict";

export const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
    board: "Launch Career",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
    board: "Launch Career",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
    board: "Launch Career",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
    board: "Launch Career",
  },
];

let tasks1 = [
  {
    id: 1,
    title: "Research career options",
    description: "Explore different career paths in tech",
    status: "todo",
  },
  {
    id: 2,
    title: "Update resume",
    description: "Add recent projects and skills",
    status: "doing",
  },
  {
    id: 3,
    title: "Apply for jobs",
    description: "Start applying to target companies",
    status: "done",
  },
  {
    id: 4,
    title: "Complete side project",
    description: "Build a full-stack app for portfolio",
    status: "stretch",
  },
];

(function () {
  // / Use 'tasks' as the mutable array (initialised with initialTasks)

  let tasks1 = [...initialTasks];

  // ---------- DOM ELEMENTS ----------
  const sidebar = document.getElementById("side-bar-div");
  const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const overlay = document.getElementById("sidebar-overlay");
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
    stretch: document.querySelector('[data-status="stretch"] .tasks-container'),
  };

  const headerCounts = {
    todo: document.getElementById("toDoText"),
    doing: document.getElementById("doingText"),
    done: document.getElementById("doneText"),
    stretch: document.getElementById("stretchText"),
  };

  const taskModal = document.getElementById("task-modal");
  const newTaskModal = document.getElementById("new-task-modal");
  const taskTitleInput = document.getElementById("task-title");
  const taskDescInput = document.getElementById("task-desc");
  const taskStatusSelect = document.getElementById("task-status");
  const newTitleInput = document.getElementById("title-input");
  const newDescInput = document.getElementById("desc-input");
  const newStatusSelect = document.getElementById("select-status");

  let currentTaskId = null;

  const escapeHtml = (str) => {
    if (!str) return "";
    return String(str).replace(
      /[&<>]/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[ch] || ch,
    );
  };

  const updateTaskCounts = () => {
    const counts = { todo: 0, doing: 0, done: 0, stretch: 0 };
    tasks.forEach((t) => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });
    headerCounts.todo.textContent = `TODO (${counts.todo})`;
    headerCounts.doing.textContent = `DOING (${counts.doing})`;
    headerCounts.done.textContent = `DONE (${counts.done})`;
    headerCounts.stretch.textContent = `STRETCH GOAL (${counts.stretch})`;
  };

  // ---------- RENDER ---------- /

  const renderTasks = () => {
    Object.values(columns).forEach((container) => {
      if (container) container.innerHTML = "";
    });
    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "task-card";
      const shortDesc =
        task.description.length > 100
          ? task.description.slice(0, 100) + "..."
          : task.description;
      card.innerHTML = `
        <div class="task-title">${escapeHtml(task.title)}</div>
        <div class="task-description">${escapeHtml(shortDesc)}</div>
        <div class="task-status">${task.status}</div>
      `;
      card.addEventListener("click", () => openEditModal(task.id));
      const container = columns[task.status];
      if (container) container.appendChild(card);
    });
    updateTaskCounts();
  };

  // ---------- EDIT MODAL ----------

  const openEditModal = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    currentTaskId = id;
    taskTitleInput.value = task.title;
    taskDescInput.value = task.description;
    taskStatusSelect.value = task.status;
    taskModal.showModal();
  };

  const saveTask = () => {
    if (currentTaskId === null) return;
    const index = tasks.findIndex((t) => t.id === currentTaskId);
    if (index === -1) return;
    tasks[index] = {
      ...tasks[index],
      title: taskTitleInput.value.trim() || "Untitled",
      description: taskDescInput.value,
      status: taskStatusSelect.value,
    };
    renderTasks();
    taskModal.close();
    currentTaskId = null;
  };

  const deleteTask = () => {
    if (currentTaskId === null) return;
    tasks = tasks.filter((t) => t.id !== currentTaskId);
    renderTasks();
    taskModal.close();
    currentTaskId = null;
  };

  // ---------- NEW TASK MODAL ----------
  const openNewTaskModal = () => {
    newTitleInput.value = "";
    newDescInput.value = "";
    newStatusSelect.value = "todo";
    newTaskModal.showModal();
  };

  const createNewTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: newTitleInput.value.trim() || "New Task",
      description: newDescInput.value,
      status: newStatusSelect.value,
      board: "Launch Career",
    };
    tasks.push(newTask);
    renderTasks();
    newTaskModal.close();
  };

  // ---------- SIDEBAR COLLAPSE ----------
  let isCollapsed = false;
  const toggleSidebarCollapse = () => {
    if (isCollapsed) {
      sidebar.classList.remove("collapsed");
      hideSidebarBtn.innerHTML = "🚫 Hide Sidebar";
      hideSidebarBtn.style = "";
    } else {
      sidebar.classList.add("collapsed");
      hideSidebarBtn.innerHTML = "👀";
      hideSidebarBtn.style.backgroundColor = "var(--primary-btn-color)";
      hideSidebarBtn.style.color = "white";
      hideSidebarBtn.style.width = "50px";
      hideSidebarBtn.style.height = "50px";
      hideSidebarBtn.style.borderRadius = "50%";
      hideSidebarBtn.style.padding = "0";
      hideSidebarBtn.style.fontSize = "28px";
    }
    isCollapsed = !isCollapsed;
  };

  // ---------- MOBILE MENU ----------

  const openMobileMenu = () => {
    sidebar.classList.add("mobile-open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeMobileMenu = () => {
    sidebar.classList.remove("mobile-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  // ---------- THEME ----------

  const setTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark");
      themeToggle.checked = true;
      sunIcon.style.opacity = "0.5";
      moonIcon.style.opacity = "1";
    } else {
      document.body.classList.remove("dark");
      themeToggle.checked = false;
      sunIcon.style.opacity = "1";
      moonIcon.style.opacity = "0.5";
    }
    localStorage.setItem("kanbanTheme", isDark ? "dark" : "light");
  };

  // ---------- EVENT LISTENERS ----------
  document.getElementById("save-task-btn").addEventListener("click", saveTask);
  document
    .getElementById("delete-task-btn")
    .addEventListener("click", deleteTask);
  document
    .getElementById("close-modal-btn")
    .addEventListener("click", () => taskModal.close());

  document
    .getElementById("add-new-task-btn")
    .addEventListener("click", openNewTaskModal);
  document
    .getElementById("cancel-add-btn")
    .addEventListener("click", () => newTaskModal.close());
  document
    .getElementById("new-task-modal-window")
    .addEventListener("submit", createNewTask);

  hideSidebarBtn.addEventListener("click", toggleSidebarCollapse);
  mobileMenuBtn.addEventListener("click", openMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  document.querySelectorAll(".board-btn, #hide-sidebar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth <= 1023) closeMobileMenu();
    });
  });
  // const savedTheme = localStorage.getItem("kanbanTheme");
  // setTheme(savedTheme === "dark");
  // themeToggle.addEventListener("change", (e) => setTheme(e.target.checked));

  // taskModal.addEventListener("click", (e) => {
  //   if (e.target === taskModal) taskModal.close();
  // });
  // newTaskModal.addEventListener("click", (e) => {
  //   if (e.target === newTaskModal) newTaskModal.close();
  // });

  // window.addEventListener("resize", () => {
  //   if (window.innerWidth > 1023) closeMobileMenu();
  // });

  // // ---------- INITIAL RENDER ----------
  // renderTasks();

  const savedTheme = localStorage.getItem("kanbanTheme");
  setTheme(savedTheme === "dark");
  themeToggle.addEventListener("change", (e) => setTheme(e.target.checked));

  function enableOutsideClickClose(modal) {
    if (!modal) return;

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close?.(); // safe optional chaining
      }
    });
  }

  enableOutsideClickClose(taskModal);
  enableOutsideClickClose(newTaskModal);
})();
