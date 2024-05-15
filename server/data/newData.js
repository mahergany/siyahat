import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ];
  
  export const users = [
    {
      _id: userIds[0],
      firstName: "test",
      lastName: "me",
      email: "aaaaaaa@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p11.jpeg",
      friends: [],
      location: "San Fran, CA",
      occupation: "Software Engineer",
      viewedProfile: 14561,
      impressions: 888822,
      createdAt: 1115211422,
      updatedAt: 1115211422,
      __v: 0,
    },
    {
      _id: userIds[1],
      firstName: "Steve",
      lastName: "Ralph",
      email: "thataaa@gmail.com",
      password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p3.jpeg",
      friends: [],
      location: "New York, CA",
      occupation: "Degenerate",
      viewedProfile: 12351,
      impressions: 55555,
      createdAt: 1595589072,
      updatedAt: 1595589072,
      __v: 0,
    },
    {
      _id: userIds[2],
      firstName: "Some",
      lastName: "Guy",
      email: "someguy@gmail.com",
      password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
      picturePath: "p4.jpeg",
      friends: [],
      location: "Canada, CA",
      occupation: "Data Scientist Hacker",
      viewedProfile: 45468,
      impressions: 19986,
      createdAt: 1288090662,
      updatedAt: 1288090662,
      __v: 0,
    },
    {
      _id: userIds[3],
      firstName: "Whatcha",
      lastName: "Doing",
      email: "whatchadoing@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p6.jpeg",
      friends: [],
      location: "Korea, CA",
      occupation: "Educator",
      viewedProfile: 41024,
      impressions: 55316,
      createdAt: 1219214568,
      updatedAt: 1219214568,
      __v: 0,
    },
    {
      _id: userIds[4],
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p5.jpeg",
      friends: [],
      location: "Utah, CA",
      occupation: "Hacker",
      viewedProfile: 40212,
      impressions: 7758,
      createdAt: 1493463661,
      updatedAt: 1493463661,
      __v: 0,
    },
    {
      _id: userIds[5],
      firstName: "Harvey",
      lastName: "Dunn",
      email: "harveydunn@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p7.jpeg",
      friends: [],
      location: "Los Angeles, CA",
      occupation: "Journalist",
      viewedProfile: 976,
      impressions: 4658,
      createdAt: 1381326073,
      updatedAt: 1381326073,
      __v: 0,
    },
    {
      _id: userIds[6],
      firstName: "Carly",
      lastName: "Vowel",
      email: "carlyvowel@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p8.jpeg",
      friends: [],
      location: "Chicago, IL",
      occupation: "Nurse",
      viewedProfile: 1510,
      impressions: 77579,
      createdAt: 1714704324,
      updatedAt: 1642716557,
      __v: 0,
    },
    {
      _id: userIds[7],
      firstName: "Jessica",
      lastName: "Dunn",
      email: "jessicadunn@gmail.com",
      password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
      picturePath: "p9.jpeg",
      friends: [],
      location: "Washington, DC",
      occupation: "A Student",
      viewedProfile: 19420,
      impressions: 82970,
      createdAt: 1369908044,
      updatedAt: 1359322268,
      __v: 0,
    },
  ];



const placeIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];
export const places = [
    {
        _id: placeIds[0],
        name: "Library Cafe",
        category: "Restaurant",
        type: "Casual",
        description: "serves starved scholars",
        latitude: 30.3753,
        longitude: 69.3451,
        postCount: 1,
        avgRating: 3.2,
        placeRanking: 1,
        address:{
            street: "Indus Loop",
            city: "Islamabad",
            province: "Punjab",
            country: "Pakistan",
        },
        tags: ["food"],
        priceLevel: "$",
        photos: []
    },
];


const postIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
  ];

export const posts = [
  {
    _id: postIds[0],
    userId: userIds[1],
    placeId: placeIds[0],
    textContent: "Nice parathas",
    picturePaths: ["post1.jpeg"],
  },
];

const commentIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),

];

export const comments = [
  {
  _id: commentIds[0],
  comment_text: "hello",
  userId: userIds[1],
  postId: postIds[0],
  }
];

const likeIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];
export const likes = [
  {
    _id: likeIds[0],
    userId: userIds[0],
    postId: postIds[0],
  },
  {
    _id: likeIds[1],
    userId: userIds[1],
    postId: postIds[0],
  }
];