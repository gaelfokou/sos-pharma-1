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
    message: "Quel est votre nom complet ?",
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
    message: "Quel est votre numéro de téléphone ?",
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
        message: "Yaoundé",
        class: "btn btn-outline-success",
      },
      {
        message: "Douala",
        class: "btn btn-outline-success",
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
    message: "Quel est votre quartier ?",
    sender: "ChatPharma",
    item: "search",
    options: [
      {
        message: "Ngousso",
        class: "btn btn-outline-success",
      },
      {
        message: "Nsam",
        class: "btn btn-outline-success",
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
    message: "Quel médicament souhaitez-vous commander ?",
    sender: "ChatPharma",
    item: "search",
    options: [
      {
        message: "PARA DENK 125MG SUPPO B/10",
        class: "btn btn-outline-success",
      },
      {
        message: "PARA CO-DENK 1000/60MG SUPPO B",
        class: "btn btn-outline-success",
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
    target: 11,
  },
  {
    id: 11,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 12,
  },
  {
    id: 12,
    message: "Quelle quantité de ce médicament souhaitez-vous commander ?",
    sender: "ChatPharma",
    item: "input",
    options: [],
    validator: (value, options=[]) => {
      value = value.trim();
      if (value === "") {
        return false;
      } else {
        if (isNaN(value)) {
          return false;
        } else {
          if (parseInt(value) <= 0) {
            return false;
          }
        }
      }
      return true;
    },
    target: 13,
  },
  {
    id: 13,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 14,
  },
  {
    id: 14,
    message: "Ce médicament est-il une prescription médicale ?",
    sender: "ChatPharma",
    item: "list",
    options: [
      {
        message: "Oui",
        class: "btn btn-outline-success",
      },
      {
        message: "Non",
        class: "btn btn-outline-success",
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
    target: 15,
  },
  {
    id: 15,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 16,
  },
  {
    id: 16,
    message: "Souhaitez-vous commander un autre médicament ?",
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
        class: "btn btn-outline-success",
        target: 18,
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
    target: 17,
  },
  {
    id: 17,
    message: "",
    sender: "UserPharma",
    item: "input",
    target: 18,
  },
  {
    id: 18,
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
