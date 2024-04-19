'use client';

export const steps = [
  {
    id: 1,
    message: "Bonjour, bienvenue sur l'assistant SOS Pharma !",
    sender: "ChatPharma",
    item: "input",
    options: [],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      }
      return true;
    },
    target: 2,
  },
  {
    id: 2,
    message: "Quel est votre nom ?",
    sender: "ChatPharma",
    item: "input",
    options: [],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      }
      return true;
    },
    target: 3,
  },
  {
    id: 3,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 4,
  },
  {
    id: 4,
    message: "Choisissez votre option ?",
    sender: "ChatPharma",
    item: "list",
    options: [
      {
        message: "Option 1",
        class: "btn btn-outline-success",
      },
      {
        message: "Option 2",
        class: "btn btn-outline-danger",
      },
      {
        message: "Option 3",
        class: "btn btn-outline-warning",
      },
    ],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      } else {
        if (options.length > 0) {
          if (options.findIndex((m) => m.message === value) === -1) {
            return false;
          }
        }
      }
      return true;
    },
    target: 5,
  },
  {
    id: 5,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 6,
  },
  {
    id: 6,
    message: "Quel est votre ville ?",
    sender: "ChatPharma",
    item: "search",
    options: [
      {
        message: "Ville 1",
        class: "btn btn-outline-success",
      },
      {
        message: "Ville 2",
        class: "btn btn-outline-danger",
      },
      {
        message: "Ville 3",
        class: "btn btn-outline-warning",
      },
    ],
    results: [],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      } else {
        if (options.length > 0) {
          if (options.findIndex((m) => m.message === value) === -1) {
            return false;
          }
        }
      }
      return true;
    },
    target: 7,
  },
  {
    id: 7,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 8,
  },
  {
    id: 8,
    message: "Vous confirmez votre ville ?",
    sender: "ChatPharma",
    item: "callback",
    options: [
      {
        message: "Oui",
        class: "btn btn-outline-success",
        target: 10,
      },
      {
        message: "Non",
        class: "btn btn-outline-danger",
        target: 6,
      },
    ],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      } else {
        if (options.length > 0) {
          if (options.findIndex((m) => m.message === value) === -1) {
            return false;
          }
        }
      }
      return true;
    },
    target: 9,
  },
  {
    id: 9,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 10,
  },
  {
    id: 10,
    message: "Merci !",
    sender: "ChatPharma",
    item: "input",
    options: [],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      }
      return true;
    },
    target: 0,
  },
];
