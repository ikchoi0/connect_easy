const { faker } = require("@faker-js/faker");

const NUMBER_OF_USER = 60;
const ConsultantSeedDB = [];
for (let i = 0; i < NUMBER_OF_USER; i++) {
  ConsultantSeedDB.push({
    role: "consultant",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: "$2a$10$d7jdlhbFrLbAev1fTCb2BeA9WfRYwVZ3xo2T.7FDbrmYtkLWMB0sG",
    options: {
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      postalCode: faker.address.zipCode(),
      price: faker.commerce.price(100, 200),
      rating: Math.ceil(Math.random() * 5),
      description:
        faker.company.catchPhrase() +
        " " +
        faker.company.catchPhrase().toLowerCase() +
        " " +
        faker.company.catchPhrase().toLowerCase() +
        " " +
        faker.company.catchPhrase().toLowerCase() +
        ".",
      profilePicture: "",
      phone: faker.phone.number(),
    },
  });
}

const ClientSeeds = [
  {
    role: "client",
    firstName: "John",
    lastName: "Doe",
    email: "john@client.com",
    password: "$2a$10$d7jdlhbFrLbAev1fTCb2BeA9WfRYwVZ3xo2T.7FDbrmYtkLWMB0sG",
  },

];

// const category = [
//   {Sales: "Revenue generation experts can guide you in the right direction of your business and sales quotas."},
//   {Therapists: "Revenue generation experts can guide you in the right direction of your business and sales quotas."},
//   {Lawyers: "Using a secure and private virtual space, lessen the back and forth and manage your legal schedule."},
//   {Developers: "Meet local and international software developers that can help creating the app of your dreams."},
//   {Mortgage: "An excellent opportunity to introduce yourself to your valued mortgage broker."},
//   {Doctors: "Consult with a doctor privately anytime. No office visit required."}
// ];

// //     pictureUrl: “https://cdn-icons-png.flaticon.com/512/1389/1389079.png”,
// //     pictureUrl: “https://cdn-icons-png.flaticon.com/512/2913/2913000.png”,
// //     pictureUrl: “https://cdn-icons-png.flaticon.com/512/2811/2811156.png”,
// //     pictureUrl: “https://cdn-icons-png.flaticon.com/512/977/977597.png”,
// //     pictureUrl: “https://cdn-icons-png.flaticon.com/512/243/243224.png”,
// //     pictureUrl: “https://cdn-icons-png.flaticon.com/128/809/809957.png”,

const CategorySeedDB = (ConsultantSeedDB) => [
  {
    name: "Sales",
    description:
      "Revenue generation experts can guide you in the right direction of your business and sales quotas.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/512/1389/1389079.png",
    users: [
      ConsultantSeedDB[1]._id,
      ConsultantSeedDB[2]._id,
      ConsultantSeedDB[3]._id,
      ConsultantSeedDB[4]._id,
      ConsultantSeedDB[5]._id,
      ConsultantSeedDB[6]._id,
      ConsultantSeedDB[7]._id,
      ConsultantSeedDB[8]._id,
      ConsultantSeedDB[9]._id,
    ],
  },
  {
    name: "Therapists",
    description:
      "It's simple to schedule appointments for individual or group therapy sessions.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/512/2913/2913000.png",
    users: [
      ConsultantSeedDB[10]._id,
      ConsultantSeedDB[11]._id,
      ConsultantSeedDB[12]._id,
      ConsultantSeedDB[13]._id,
      ConsultantSeedDB[14]._id,
      ConsultantSeedDB[15]._id,
      ConsultantSeedDB[16]._id,
      ConsultantSeedDB[17]._id,
      ConsultantSeedDB[18]._id,
    ],
  },
  {
    name: "Lawyers",
    description:
      "Using a secure and private virtual space, lessen the back and forth and manage your legal schedule.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/512/2811/2811156.png",
    users: [
      ConsultantSeedDB[19]._id,
      ConsultantSeedDB[20]._id,
      ConsultantSeedDB[21]._id,
      ConsultantSeedDB[22]._id,
      ConsultantSeedDB[23]._id,
      ConsultantSeedDB[24]._id,
      ConsultantSeedDB[25]._id,
      ConsultantSeedDB[26]._id,
      ConsultantSeedDB[27]._id,
    ],
  },
  {
    name: "Developers",
    description:
      "Meet local and international software developers that can help creating the app of your dreams.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/512/977/977597.png",
    users: [
    ],
  },
  {
    name: "Mortgage",
    description:
      "An excellent opportunity to introduce yourself to your valued mortgage broker.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/512/243/243224.png",
    users: [
      ConsultantSeedDB[37]._id,
      ConsultantSeedDB[38]._id,
      ConsultantSeedDB[39]._id,
      ConsultantSeedDB[40]._id,
      ConsultantSeedDB[41]._id,
      ConsultantSeedDB[42]._id,
      ConsultantSeedDB[43]._id,
      ConsultantSeedDB[44]._id,
      ConsultantSeedDB[45]._id,
    ],
  },
  {
    name: "Doctors",
    description:
      "Consult with a doctor privately anytime. No office visit required.",
    pictureUrl: "https://cdn-icons-png.flaticon.com/128/809/809957.png",
    users: [
      ConsultantSeedDB[46]._id,
      ConsultantSeedDB[47]._id,
      ConsultantSeedDB[48]._id,
      ConsultantSeedDB[49]._id,
      ConsultantSeedDB[50]._id,
      ConsultantSeedDB[51]._id,
      ConsultantSeedDB[52]._id,
      ConsultantSeedDB[53]._id,
      ConsultantSeedDB[54]._id,
    ],
  },
];
module.exports = {
  ConsultantSeedDB,
  CategorySeedDB,
  ClientSeeds,
};
