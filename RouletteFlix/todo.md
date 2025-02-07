# Next Steps

## [X] Call the discover endpoint

- Discover Movies: /discover/movie
- Discover TV Shows: /discover/tv
  These are the key endpoints. They allow you to filter movies/TV shows based on various criteria, including genres. Here's how you'll use them for RouletteFlix:

I should have the genres now so:

- pass the ids as comma separated values for example
  const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99';

if you do multiple genres, then the movie has to contain all 3, probably better just to pick one of the 3 at random and then pass it through.
for example 99: Documentary responds with

```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/khOvkFHatnXj32i5jvKsOaFyUj2.jpg",
      "genre_ids": [99, 18],
      "id": 60118,
      "origin_country": ["IN"],
      "original_language": "hi",
      "original_name": "भारत का वीर पुत्र - महाराणा प्रताप",
      "overview": "Bharat Ka Veer Putra – Maharana Pratap is an Indian television series produced by Abhimanyu Singh of Contiloe Entertainment, based on the life of 16th century Rajput ruler of Mewar, Maharana Pratap Singh. The series premiered on Sony TV on May 27, 2013. The series is introduced by Bollywood actor Amitabh Bachchan.",
      "popularity": 1151.287,
      "poster_path": "/c7T02BoqUyTnzDjo50gPJVUltJy.jpg",
      "first_air_date": "2013-05-27",
      "name": "Brave Son of India: Maharana Pratap",
      "vote_average": 6.2,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": "/pTjml856AMpYbr0qI0iKZVX60q4.jpg",
      "genre_ids": [9648, 99],
      "id": 55165,
      "origin_country": ["RU"],
      "original_language": "ru",
      "original_name": "Следствие вели...",
      "overview": "The author's cycle of documentary programs of the NTV channel about the most high-profile crimes committed in the USSR. The story is accompanied by stories about the daily life of the inhabitants of the USSR. Presenter - Leonid Kanevskiy. Documentary television films are devoted to criminal cases from 1917 to 1991.",
      "popularity": 613.82,
      "poster_path": "/fTRRrjf3KPpiFx1knqPpvczZdf2.jpg",
      "first_air_date": "2006-01-20",
      "name": "The investigation was conducted",
      "vote_average": 8.8,
      "vote_count": 14
    },
    {
      "adult": false,
      "backdrop_path": "/n01aA0y0KjWfWGRbHAvBGK47ASE.jpg",
      "genre_ids": [10763, 99],
      "id": 78,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Dateline",
      "overview": "Dateline NBC, or simply Dateline, is a weekly American television newsmagazine series. It was previously the network's flagship newsmagazine, but now focuses mainly on true crime stories with only occasional editions that focus on other topics.",
      "popularity": 622.841,
      "poster_path": "/y4wNwhO2sQqjlJTL5oYr8fagpRF.jpg",
      "first_air_date": "1992-03-31",
      "name": "Dateline",
      "vote_average": 6.5,
      "vote_count": 44
    },
    {
      "adult": false,
      "backdrop_path": "/dDoO1nKuBUB3rjrR54grbQ5CvEG.jpg",
      "genre_ids": [99, 10763],
      "id": 4384,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Frontline",
      "overview": "Since it began in 1983, Frontline has been airing public-affairs documentaries that explore a wide scope of the complex human experience. Frontline's goal is to extend the impact of the documentary beyond its initial broadcast by serving as a catalyst for change.",
      "popularity": 602.158,
      "poster_path": "/5Va5SzbaJe5Wd64caWfzspSA92L.jpg",
      "first_air_date": "1983-01-17",
      "name": "Frontline",
      "vote_average": 7.4,
      "vote_count": 40
    },
    {
      "adult": false,
      "backdrop_path": "/uq7amVOlWTMdDpDSYwO0s3wiGT4.jpg",
      "genre_ids": [10763, 99],
      "id": 2035,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "20/20",
      "overview": "20/20 is an American television newsmagazine that has been broadcast on ABC since June 6, 1978. Created by ABC News executive Roone Arledge, the show was designed similarly to CBS's 60 Minutes but focuses more on human interest stories than international and political subjects. The program's name derives from the \"20/20\" measurement of visual acuity.\n\nThe hour-long program has been a staple on Friday evenings for much of the time since it moved to that timeslot from Thursdays in September 1987, though special editions of the program occasionally air on other nights.",
      "popularity": 740.989,
      "poster_path": "/cmqmilQ6l9zAWImNCvRLtXlvQ3Q.jpg",
      "first_air_date": "1978-06-06",
      "name": "20/20",
      "vote_average": 6.2,
      "vote_count": 31
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [99],
      "id": 36709,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Get Out",
      "overview": "Join gorgeous hosts of today's best travel series, as they take viewers to exciting locations to experience all of the local color, fun, and nightlife from famous cities around the world. From South Beach to the Bahamas, Get Out! traverses the globe looking for the hip, trendy, and cool!",
      "popularity": 471.58,
      "poster_path": null,
      "first_air_date": "2003-10-13",
      "name": "Get Out",
      "vote_average": 3.5,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": "/xwm9GHKpJt5FoQbubjmuxurYXHZ.jpg",
      "genre_ids": [99, 10751],
      "id": 2042,
      "origin_country": ["GB"],
      "original_language": "en",
      "original_name": "Antiques Roadshow",
      "overview": "Antiques Roadshow is a British television show in which antiques appraisers travel to various regions of the United Kingdom to appraise antiques brought in by local people. It has been running since 1979. There are also international versions of the programme.",
      "popularity": 541.536,
      "poster_path": "/hZnCNv58d7L0Ee3BZI3j2NSBtU.jpg",
      "first_air_date": "1979-02-18",
      "name": "Antiques Roadshow",
      "vote_average": 5.929,
      "vote_count": 14
    },
    {
      "adult": false,
      "backdrop_path": "/9dvSNFcHfEDXHPCi3C6OwdeAPwV.jpg",
      "genre_ids": [99],
      "id": 74374,
      "origin_country": ["DE"],
      "original_language": "de",
      "original_name": "Die Nordstory",
      "overview": "",
      "popularity": 285.182,
      "poster_path": "/2YkVWVSkHLkbzrxetXtefReQGBM.jpg",
      "first_air_date": "2011-03-25",
      "name": "Die Nordstory",
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/3SDOD7yBMIjLFvWCiwvy5gQ9RBA.jpg",
      "genre_ids": [99],
      "id": 98281,
      "origin_country": ["FR"],
      "original_language": "fr",
      "original_name": "Grands Reportages",
      "overview": "",
      "popularity": 343.587,
      "poster_path": "/vuLnCZRKP3odfWoi0x52BxrbOqW.jpg",
      "first_air_date": "1998-07-06",
      "name": "Grands Reportages",
      "vote_average": 6,
      "vote_count": 1
    },
    {
      "adult": false,
      "backdrop_path": "/5pAj1olWpGtVMFXJorsgLcl5oB.jpg",
      "genre_ids": [99],
      "id": 9937,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Intimate Portrait",
      "overview": "Intimate Portrait is a biographical television series on the Lifetime Television cable network focusing on different celebrities, which includes interviews with each subject.\n\nAmong the people profiled were Grace Kelly, Natalie Wood, Carly Simon, Jackie Kennedy, Katharine Hepburn, Carol Burnett, Tanya Tucker, and Marla Maples.",
      "popularity": 470.051,
      "poster_path": "/3S3G8DTeWrXcQn1QQSfAZ9sWXk2.jpg",
      "first_air_date": "1993-11-14",
      "name": "Intimate Portrait",
      "vote_average": 4.5,
      "vote_count": 5
    },
    {
      "adult": false,
      "backdrop_path": "/xLzuiD43K9nywZ0eWRx8TGzICFa.jpg",
      "genre_ids": [99],
      "id": 13805,
      "origin_country": ["GB"],
      "original_language": "en",
      "original_name": "A Girl's Guide to 21st Century Sex",
      "overview": "A Girl's Guide to 21st Century Sex is a documentary TV series about sex, which ran in eight episodes on Channel 5 and was presented by Dr. Catherine Hood. The 45-minute long episodes were broadcast on Monday nights. The series started on 30 October 2006, with the final programme broadcast on 18 December 2006.\n\nEach episode explained a sex position and covered a sexually transmitted disease. Additionally, the following topics were discussed: sex among handicapped and overweight people, penis enlargement devices, penis enlargement surgery, sexual violence against men and penis removal, tantric sex, the g-spot, erectile dysfunction, sex reassignment surgery, cosmetic surgery of the vagina, swinging, lichen sclerosus, the use of recreational drugs during sex, male homosexual sex in public toilets, full body plastic wrap bondage, and sex dolls.\n\nThe programme included close shots of the male and female body as well as footage of sexual intercourse and ejaculation filmed with an internal camera placed inside the vagina. These scenes were filmed using Australian-born pornographic actress Elizabeth Lawrence and English-born pornographic actor Stefan Hard.",
      "popularity": 511.739,
      "poster_path": "/9NSX2YrFGBIih0XqRedsSbDVx4U.jpg",
      "first_air_date": "2006-10-30",
      "name": "A Girl's Guide to 21st Century Sex",
      "vote_average": 5.2,
      "vote_count": 16
    },
    {
      "adult": false,
      "backdrop_path": "/7tM9dFbpoggCpylZxuZl3zsPLD8.jpg",
      "genre_ids": [99],
      "id": 2835,
      "origin_country": ["AU"],
      "original_language": "en",
      "original_name": "Gardening Australia",
      "overview": "Gardening Australia provides practical, realistic and credible horticultural and gardening advice, inspiring and entertaining Australian gardeners around the nation.",
      "popularity": 410.183,
      "poster_path": "/79taCPhP1vgKCZVEHRhVZXo6G9F.jpg",
      "first_air_date": "2005-02-12",
      "name": "Gardening Australia",
      "vote_average": 6.7,
      "vote_count": 3
    },
    {
      "adult": false,
      "backdrop_path": "/c2wPZsH2LZT8Z3Dqo3yt7dl4g5d.jpg",
      "genre_ids": [99, 10763, 10767],
      "id": 31732,
      "origin_country": ["US"],
      "original_language": "en",
      "original_name": "Democracy Now!",
      "overview": "A United States daily progressive, nonprofit, independently syndicated program of news, analysis, and opinion.",
      "popularity": 400.751,
      "poster_path": "/pwMvc40mOHyZ9IsFPTcW0Jdm57l.jpg",
      "first_air_date": "2001-01-01",
      "name": "Democracy Now!",
      "vote_average": 6.667,
      "vote_count": 6
    },
    {
      "adult": false,
      "backdrop_path": "/3q7cCjq2cEcYjuOIpL46n11l1Gs.jpg",
      "genre_ids": [99],
      "id": 1966,
      "origin_country": ["GB"],
      "original_language": "en",
      "original_name": "Horizon",
      "overview": "Horizon tells amazing science stories, unravels mysteries and reveals worlds you've never seen before.",
      "popularity": 409.044,
      "poster_path": "/uX8pic7asQBdnwMB9QjPvTsn1Dw.jpg",
      "first_air_date": "1964-02-04",
      "name": "Horizon",
      "vote_average": 7.3,
      "vote_count": 30
    },
    {
      "adult": false,
      "backdrop_path": "/fv3K9SWlXQaCzVsnh6RnzLu84xA.jpg",
      "genre_ids": [99, 10763],
      "id": 5675,
      "origin_country": ["GB"],
      "original_language": "en",
      "original_name": "Panorama",
      "overview": "Current affairs programme, featuring interviews and investigative reports on a wide variety of subjects.",
      "popularity": 412.719,
      "poster_path": "/iIJ7magQx7z1rtkr3HotrBD2JK7.jpg",
      "first_air_date": "1953-11-11",
      "name": "Panorama",
      "vote_average": 6.2,
      "vote_count": 13
    },
    {
      "adult": false,
      "backdrop_path": "/nKGYKmBHMXJFLTfp5JWG8C8MGqm.jpg",
      "genre_ids": [99],
      "id": 90412,
      "origin_country": ["JP"],
      "original_language": "ja",
      "original_name": "大改造!!劇的ビフォーアフター",
      "overview": "Japanese home reform. Homes are chosen from viewers who write in explaining unique problems, like small space, broken or damaged home, no bathroom, no insulation, too old, not elderly friendly, etc. The show showcases some of the worst living conditions before, then goes through a reformation to modernize the home and meet the needs of the owners. Alias name is \"Before After\"",
      "popularity": 411.334,
      "poster_path": "/ncDQ1nJqdlw6J4o1KZq8jb9LZuG.jpg",
      "first_air_date": "2002-04-28",
      "name": "Makeover! Dramatic Before & After",
      "vote_average": 0,
      "vote_count": 0
    },
    {
      "adult": false,
      "backdrop_path": "/hdlpSh7NstYZSVmuoeVENJdNaLR.jpg",
      "genre_ids": [35, 99, 16, 10751],
      "id": 16656,
      "origin_country": ["SU"],
      "original_language": "ru",
      "original_name": "Фитиль",
      "overview": "Fitil is a popular Soviet/Russian television satirical/comedy short film series which ran for about 500 episodes. Some of the episodes were aimed at children, and were called Фитилёк, Fitilyok, Little Fuse. Each issue contained from the few short segments: documentary, fictional and animated ones. Directed by various artists, including Leonid Gaidai who presented his famous trio of Nikulin, Vitsin and Morgunov into the cast. It was called in USSR as \"the anecdotes from the Soviet government\".",
      "popularity": 359.535,
      "poster_path": "/dBgJKqZnmfARnN8bkaA7elWjhz9.jpg",
      "first_air_date": "1962-06-04",
      "name": "Fuse",
      "vote_average": 7.6,
      "vote_count": 8
    },
    {
      "adult": false,
      "backdrop_path": "/bbpDXt8nueitntoj3V7rVac9QPK.jpg",
      "genre_ids": [99, 10763],
      "id": 38970,
      "origin_country": ["FR"],
      "original_language": "fr",
      "original_name": "Zone interdite",
      "overview": "The zone interdite refers to two distinct territories established in German-occupied France during the Second World War after the signature of the Second Armistice at Compiègne.",
      "popularity": 485.724,
      "poster_path": "/49m7AFxRNe2AUcnbQAB5V1j97Vt.jpg",
      "first_air_date": "1993-03-07",
      "name": "Zone interdite",
      "vote_average": 5,
      "vote_count": 2
    },
    {
      "adult": false,
      "backdrop_path": "/2Ff1BFsZCqM6TymzmNIlu0bzavx.jpg",
      "genre_ids": [18, 10766, 99],
      "id": 32762,
      "origin_country": ["MX"],
      "original_language": "es",
      "original_name": "La Loba",
      "overview": "La Loba is a Mexican telenovela by TV Azteca. It premiered on 2010. The protagonists are the international stars Ivonne Montero and Mauricio Islas. Grand actors such as Regina Torne, Omar Fierro, Ana Ciochetti, Fernando Becerril and Marta Aura also included as cast members. In the final 2 weeks, episodes are halved to give way to Maricarmen's new telenovela, Entre el Amor y el Deseo",
      "popularity": 277.908,
      "poster_path": "/hEUPEiF5tgrhApSAVW8Bw9voF4F.jpg",
      "first_air_date": "2010-02-08",
      "name": "La Loba",
      "vote_average": 6.7,
      "vote_count": 58
    },
    {
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [99],
      "id": 3801,
      "origin_country": ["AU", "CA", "GB"],
      "original_language": "en",
      "original_name": "Globe Trekker",
      "overview": "Globe Trekker is an adventure tourism television series produced by Pilot Productions. The British series was inspired by the Lonely Planet travelbooks and began airing in 1994. Globe Trekker is broadcast in over 40 countries across six continents.\n\nEach episode features a host, called a traveller, who travels with a camera crew to a country—often, a relatively exotic locale—and experiences the sights, sounds, and culture that the location has to offer. Special episodes feature in-depth city, beach, dive, shopping, history, festival, and food guides.\n\nThe show often goes far beyond popular tourist destinations in order to give viewers a more authentic look at local culture. Presenters usually participate in different aspects of regional life, such as attending a traditional wedding or visiting a mining community. They address the viewer directly, acting as tourists-turned-tour guides, but are also filmed interacting with locals and discovering interesting locations in unrehearsed sequences. Globe Trekker also sometimes includes brief interviews with backpackers who share tips on independent travel in that particular country.",
      "popularity": 357.647,
      "poster_path": "/hMP8XLI1QFqJdeZ6fz78RdWniYE.jpg",
      "first_air_date": "1994-12-31",
      "name": "Globe Trekker",
      "vote_average": 7.8,
      "vote_count": 6
    }
  ],
  "total_pages": 1337,
  "total_results": 26727
}
```

## Test out the randomizers

- sort_by=popularity.desc
- sort_by=vote_average.desc

## Cache the result

## [X] Pick a random movie from the list of movies returned

## Remove that movie from the list so that it doesn't return

## If they spin again, re-run the random selector from the cache

## Get poster sizes

https://api.themoviedb.org/3/{mediaType}/{media.id}/images

## Get image

w92, 154, 185, 342 are the poster options

w300, 780, 1280, original for the backdrop_sizes

https://image.tmdb.org/t/p/w342/4rCzaZy5Qkvxh5xaVpHriXSLTgC.jpg

## Get the data for the movie

const url = 'https://api.themoviedb.org/3/movie/25?language=en-US';

```ts
interface Movie {
  poster_path: string; //thumbnail
  original_title: string; //title
  overview: string;
  genres: string[];
  runtime: number;
  releaseDate: string;
  vote_average: number; //vote
}
```

```json
{
  "adult": false,
  "backdrop_path": "/bQ8fRUaitJvi54O2lUT6Ta7FVHK.jpg",
  "belongs_to_collection": {
    "id": 285564,
    "name": "Jarhead Collection",
    "poster_path": "/aRFpBjCseFD6UmahAuLdqS7Or5q.jpg",
    "backdrop_path": "/ifSnip5tvaHvxLPAyjkiihE6T2I.jpg"
  },
  "budget": 72000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10752,
      "name": "War"
    }
  ],
  "homepage": "",
  "id": 25,
  "imdb_id": "tt0418763",
  "origin_country": ["US"],
  "original_language": "en",
  "original_title": "Jarhead",
  "overview": "Jarhead is a film about a US Marine Anthony Swofford’s experience in the Gulf War. After putting up with an arduous boot camp, Swofford and his unit are sent to the Persian Gulf where they are eager to fight, but are forced to stay back from the action. Swofford struggles with the possibility of his girlfriend cheating on him, and as his mental state deteriorates, his desire to kill increases.",
  "popularity": 23.685,
  "poster_path": "/4rCzaZy5Qkvxh5xaVpHriXSLTgC.jpg",
  "production_companies": [
    {
      "id": 14440,
      "logo_path": "/gk9zllyMFnaVBWTdZpm7VcfQrHC.png",
      "name": "Red Wagon Entertainment",
      "origin_country": "US"
    },
    {
      "id": 1522,
      "logo_path": "/8uaoEVgNxFH0R94O53gUiByahVr.png",
      "name": "Neal Street Productions",
      "origin_country": "GB"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2005-11-04",
  "revenue": 97076152,
  "runtime": 123,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    },
    {
      "english_name": "Spanish",
      "iso_639_1": "es",
      "name": "Español"
    },
    {
      "english_name": "Arabic",
      "iso_639_1": "ar",
      "name": "العربية"
    },
    {
      "english_name": "Latin",
      "iso_639_1": "la",
      "name": "Latin"
    }
  ],
  "status": "Released",
  "tagline": "Welcome to the suck.",
  "title": "Jarhead",
  "video": false,
  "vote_average": 6.7,
  "vote_count": 2907
}
```
