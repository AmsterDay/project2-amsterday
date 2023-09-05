const mongoose = require('mongoose');
const Activity = require('../models/Activity.model');

require('dotenv').config(); // import and configure dotenv (loads environment variables from .env file)

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project2-amsterday';


const activities = [
    {
        title: "Rijk Museum",
        category: "museum",
        description:"The Rijksmuseum is the national museum of the Netherlands dedicated to Dutch arts and history.",
        price: 23,
        review: 4.6,
        tips:"The Rijksmuseum is usually the busiest between 11 am and 3 pm. The best strategy to enjoy the museum is thus to avoid the middle of the day by arriving early (the Rijksmuseum opens at 9 am) or late afternoon (after around 3 pm, last admission at 4:30 pm).",
        imageUrl: "https://cdn-imgix.headout.com/media/images/556016bc7899f92e74398785ff633327-Rijksmuseum%20Opening%20Hours.jpg?auto=format&w=814.9333333333333&h=458.4&q=90&fit=crop&ar=16%3A9",
      },
      {
        title: "Van Gogh Museum",
        category:"museum",
        description:"The Van Gogh Museum is a Dutch art museum dedicated to the works of Vincent van Gogh and his contemporaries.",
        price: 22,
        review: 4.6,
        tips:"there are two seperate lines for the museum: a ticket line and the line to get in. Sometimes the line to buy tickets can be really long so I encourage you to buy your tickets ONLINE.",
        imageUrl:"https://www.passport2amsterdam.com/wp-content/uploads/2020/05/van-gogh-museum.jpg"
      },  
      {
        title:"Anne Frank House",
        category:"museum",
        description:"The Anne Frank House is a writer's house and biographical museum dedicated to Jewish wartime diarist Anne Frank.",
        price: 18,
        review: 4.6,
        tips:"Tickets to the Anne Frank House are notoriously difficult to grab, so you'll want to plan ahead in order to make sure you can get a ticket for entry.",
        imageUrl:"https://img.trouw.nl/4ffd4578086b6b8cfabbb1f956d5cabe6efc0594/complottheorie-tekst-geprojecteerd-op-anne-frank-huis-halsema-onversneden-antisemitisme",   
      },
      {
        title:"Heineken Experience",
        category:"experience",
        description:"The Heineken Experience is a brand experience within Heineken's oldest brewery, in the heart of Amsterdam. The historical building serves as a venue where you can learn all about Heineken heritage",
        price: 21,
        review: 4.2,
        tips:"The Heineken Experience has designed a digital app that provides extra information and fun facts as you explore the brewery. Unlock the app when you enter the Heineken Experience to get the most out of your visit.",
        imageUrl:" https://www.mr-amsterdam.com/media/images/attractions-sights/heineken-experience/heineken-experience-amsterdam.jpg",
      },
      {
        title:"Canal Boat Tour",
        category:"experience",
        description:"Taking a canal cruise is one of the most popular things to do in Amsterdam. The Canal Cruise Ticket offers the most flexible and convenient way to get on a canal cruise along the historical Amsterdam waterways.",
        price: 20,
        review: 4.9,
        tips:"For a more relaxed experience, we recommend taking a canal cruise on a weekday, early in the morning (9-10.30 AM) or late in the afternoon (after 4-5 PM).",
        imageUrl:"https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/5c/17.jpg",
      },  
      {
        title:"Bloemenpark Keukenhof",
        category:"experience",
        description:"Keukenhof, also known as the Garden of Europe, is one of the world's largest flower gardens.",
        price: 20,
        review: 4.7,
        tips:"If Keukenhof is on your bucket list (and it definitely should be!), then you'll want to visit the park between mid-March and mid-May. In 2023, the Keukenhof will be open from March 23 to May 14. This is the only time of year that the park is open as this is when the flowers are in bloom.",
        imageUrl:"https://cdn.holidayguru.nl/wp-content/uploads/2020/02/Blooming-colorful-tulips-flowerbed-in-public-flower-garden-with-windmill.-Popular-tourist-site.-Lisse-Holland-Netherlands-shutterstock_1111810853.jpg",
      },
      {
        title:"Van Stapele Koekmakerij",
        category:"food",
        description:"The famous Van Stapele cake consists of a dark chocolate dough with a delicious filling of white chocolate. The biscuit is crispy on the outside, but on the inside you will find a soft core of warm white chocolat.",
        price: 2.50,
        review: 4.8,
        tips:"I recommend avoiding coming here in the weekend afternoons as there's always a small line (5-10 minutes). I typically come here in the early afternoon (prior to lunch) or near their closing time to avoid waiting on line!",
        imageUrl:"https://www.crossmarks.nl/wp-content/uploads/2019/11/VANSTAPELE_1.jpg",
      },
      {
        title:"Van Wonderen Stroopwafels",
        category:"food",
        description:"van Wonderen Stroopwafels is the leading manufacture of custom Stroopwafels in the Netherlands. Come try the amazing Stroopwafels and add any of the delicious toppings to enjoy.",
        price: 10,
        review: 3.7,
        tips:"The traditional way to eat the stroopwafel is to place it on top of a cup of hot coffee, tea or chocolate. This heats the waffle and slightly softens the syrup making the waffle soft on one side and slightly crispy on the other.",
        imageUrl:"https://i0.wp.com/mytravelboektje.com/wp-content/uploads/2017/08/19944661_287951278275138_6036659784398513129_o-600x399.jpg?resize=600%2C399",
      },
      {
        title:"Cafe Winkel 43",
        category:"food",
        description:"For the people living in Amsterdam, this apple pie from Cafe Winkel 43 is hardly a secret, everyone knows this famouse home-made pie.",
        price: 4,
        review: 4.6,
        tips:"In the winter you can sit inside, but in the summer they have a very nice terrace where you can sit in the sun! You can immediately enjoy watching people coming to and from the market. Hoping you can find a spot. It's always super busy.",
        imageUrl:"https://www.helloamsterdam.nl/app/uploads/2020/09/Winkel-43-2-2.jpg",
      },
];


mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);

      return Activity.deleteMany({}); //WARNING: this will delete all activities in your DB !!
    })
    .then((response) => {
        console.log(response);

        return Activity.insertMany(activities);
    })
    .then(activitiesFromDB => {
        console.log(`Created ${activitiesFromDB.length} activities`);

        // Once created, close the DB connection
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error connecting to DB: ", err);
    });