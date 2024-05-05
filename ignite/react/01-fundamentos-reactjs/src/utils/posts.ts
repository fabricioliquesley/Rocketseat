export const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala dev 🖐" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu polifólio. É um projeto que fiz no NLW Return, evento da Rocketseat.",
      },
      { type: "link", content: "jane.design/doctor-care" },
    ],
    publishedAt: new Date("2024-05-04 21:50:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Fabrício Liquesley",
      role: "UX Designer",
    },
    content: [
      { type: "paragraph", content: "Fala dev 🖐" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu polifólio. É um projeto que fiz no NLW Return, evento da Rocketseat.",
      },
      { type: "link", content: "jane.design/doctor-care" },
    ],
    publishedAt: new Date("2024-05-02 12:00:00"),
  },
];
