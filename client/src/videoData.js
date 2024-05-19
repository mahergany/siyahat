const videoData = [
    {
        url:'src/Images/margalla2.mp4',
        name: 'Margalla Hills',
        description: 'The Margalla Hills are a hill range within the Margalla Hills National Park on the northern edge of Islamabad Capital Territory, Pakistan, just south of Haripur District, Khyber Pakhtunkhwa. They are part of the Himalayan foothills. The Margalla range has an area of 12,605 hectares.'
    },
    {
        url:'src/Images/balochistan.mp4',
        name: 'Balochistan',
        description: ' Located in the southwestern region of the country, Balochistan is the largest province of Pakistan by land area but is the least populated one. It is bordered by the Pakistani provinces of Khyber Pakhtunkhwa to the north-east, Punjab to the east and Sindh to the south-east; shares international borders with Iran to the west and Afghanistan to the north; and is bound by the Arabian Sea to the south.'
    },
    {
        url:'src/Images/bmosque.mp4',
        name: 'Badshahi Mosque',
        description: "The Badshahi Mosque is an iconic Mughal-era congregational mosque in Lahore, Punjab, Pakistan. The mosque is located opposite of Lahore Fort in the outskirts of the Walled City and is widely considered to be one of Lahore's most iconic landmarks."
    },
    {
        url:'src/Images/nathiagali3.mp4',
        name: 'Nathia Gali',
        description: 'Nathia Gali or Nathiagali is a hill station and mountain resort town located in the Abbottabad District of Khyber Pakhtunkhwa, Pakistan. It is located at the centre of the Galyat range, where several hill stations are situated.'
    },
    {
        url:'src/Images/gilgitbaltistan1.mp4',
        name: 'Gilgit Baltistan',
        description: 'Gilgit-Baltistan, formerly known as the Northern Areas, is a region administered by Pakistan as an administrative territory and consists of the northern portion of the larger Kashmir region'
    },
    {
        url:'src/Images/hiran.mp4',
        name: 'Hiran Minar',
        description: "Hiran Minar ('The Deer Tower') is an early 16th-century Mughal era complex in Sheikhupura, in the Pakistani province of Punjab. It was built at the site of a game reserve in honor of Mughal Emperor Jahangir's beloved antelope, Mansraj. The emperor is remembered for his fondness of nature, and his complex embodies the Mughal relationship between humans, pets and hunting."
    },
    {
        url:'src/Images/hbridge.mp4',
        name: 'Husseini Bridge',
        description: 'The Hussaini suspension bridge is 660 feet long and has 472 wooden planks and 50 feet above the Upper Hunza river bed and the maximum height is about 100 feet. The Hussaini suspension bridge not only caters to the needs of the village but is also a major tourist attraction today for tourists from around the world.'
    },
    {
        url:'src/Images/khighway.mp4',
        name: 'Karakoram Highway',
        description: 'The Karakoram Highway is a 1,300 km national highway which extends from Hasan Abdal in the Punjab province of Pakistan to the Khunjerab Pass in Gilgit-Baltistan, where it crosses into China and becomes China National Highway 314.'
    },
    {
        url:'src/Images/kmountain.mp4',
        name: 'Karakoram Mountain',
        description: 'The Karakoram is a mountain range in the Kashmir region spanning the border of Pakistan, China, and India, with the northwestern extremity of the range extending to Afghanistan and Tajikistan. Most of the Karakoram mountain range falls under the jurisdiction of Gilgit-Baltistan, which is controlled by Pakistan.',
    },
    {
        url:'src/Images/qtomb.mp4',
        name: "Quaid-e-Azam's Tomb",
        description: 'Mazar-e-Quaid, also known as Jinnah Mausoleum or the National Mausoleum, is the final resting place of Muhammad Ali Jinnah, the founder of Pakistan. Designed in a 1960s modernist style, it was completed in 1971, and is an iconic symbol of Karachi as well as one of the most popular tourist sites in the city.'
    },
    {
        url:'src/Images/deosaiplains1.mp4',
        name: 'Deosai Plains',
        description: 'The Deosai Plains is 32 km south of Skardu. This plateau is the habitat of the greatly threatened HimalayanBrown Bear and many other wild animals. Deosai means ‘Land of the Giants’ and when you look out across the never-ending green expanse you can see why. '
    },
    {
        url:'src/Images/minar.mp4',
        name: 'Minar-e-Pakistan',
        description: 'Minar-e-Pakistan (literally "Tower of Pakistan") is a tower located in Lahore, Punjab, Pakistan. The tower was built between 1960 and 1968 on the site where the All-India Muslim League passed the Lahore Resolution (which was later called the Pakistan Resolution) on 23 March 1940 – the first official call for a separate and independent homeland for the Muslims of British India, as espoused by the two-nation theory. The resolution eventually helped lead to the creation of Pakistan in 1947.'
    },
    {
        url:'src/Images/seaview.mp4',
        name: 'Karachi Sea View',
        description: 'Clifton Beach, also known as Sea View, is a beach in Karachi, Sindh, Pakistan and is located on the Arabian Sea. It stretches from Karachi to Ormara. The beach is very popular in Pakistan. It is open 24/7 for the general public.'
    },
    {
        url:'src/Images/raikot.mp4',
        name: 'Raikot Glacier',
        description: 'Rakhiot Peak is a peak in the Himalayas range of the Gilgit-Baltistan, Pakistan. It is one of the many subsidiary summits of the Nanga Parbat massif.It lies just south of the Indus River in the Diamer District. Not far to the north is the western end of the Karakoram range.'
    },
    {
        url:'src/Images/passu.mp4',
        name: 'Passu',
        description: 'Passu is a small village located in Gojal valley upper Hunza of the Gilgit Baltistan, Pakistan region of Northern Pakistan. Situated along the Karakoram Highway in Upper Hunza, Pakistan, Passu is a popular tourist destination in Pakistan and all over the world because of its easily accessible sweeping landscapes, and vistas of the 7,478 m (24,534 ft) tall Passu Sar mountain, the Passu Glacier, and Tupopdan 6,106m (20,033 ft).'
    },
    {
        url:'src/Images/kashmir.mp4',
        name: 'Kashmir',
        description: 'Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term "Kashmir" denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range. Today, the term encompasses a larger area that includes the India-administered territories of Jammu and Kashmir and Ladakh, the Pakistan-administered territories of Azad Kashmir and Gilgit-Baltistan, and the Chinese-administered territories of Aksai Chin and the Trans-Karakoram Tract.'
    },
    {
        url:'src/Images/fmeadows.mp4',
        name: 'Fairy Meadows',
        description: 'Fairy Meadows, named by German climbers (German Märchenwiese, "fairy tale meadows") and locally known as Joot, is an area of grassland near one of the base camp sites of Nanga Parbat, located in Diamer District in Gilgit-Baltistan region in Pakistan. At an altitude of about 3,300 metres (10,800 ft) above sea level, it serves as the launching point for mountaineers summiting Nanga Parbat by the Rakhiot face. In 1995, the Government of Pakistan declared Fairy Meadows a National Park.'
    },
    {
        url:'src/Images/rupal.mp4',
        name: 'Rupal Valley',
        description: 'The Rupal Valley is a valley located in the Astore District of Gilgit-Baltistan region in Pakistan. It lies on the southern side of Nanga Parbat, and is accessed via the Astore Valley, which leaves the Karakoram Highway at Juglot, some 60 kilometres (37 miles) south of Gilgit'
    },
    {
        url:'src/Images/parsan.mp4',
        name: 'Parsan Valley',
        description: "Parsan Valley is located in the Chitral District of Khyber Pakhtunkhwa province in Pakistan. It's renowned for its stunning natural beauty, including lush green landscapes, mountains, and rivers, making it a popular destination for tourists and adventurers."
        
    },
    {
        url:'src/Images/hunza.mp4',
        name: 'Hunza Valley',
        description: "Hunza Valley is located in the Gilgit-Baltistan region of northern Pakistan. It's nestled amidst the Karakoram mountain range, surrounded by towering peaks such as Rakaposhi, Ultar Sar, and Ladyfinger Peak. Hunza Valley is renowned for its breathtaking scenery, including terraced fields, fruit orchards, and the Hunza River flowing through the valley. It's also known for its rich cultural heritage, with communities practicing traditions that date back centuries."
    },
    {
        url:'src/Images/mitre.mp4',
        name: 'Mitre Peak',
        description: "Mitre Peak is a mountain in the Karakoram mountain range near Concordia in Gilgit-Baltistan, Pakistan. Mitre Peak marks the confluence of the branches of the Baltoro Glacier with the Gasherbrum branch arriving from the SE and the Godwin Austin branch arriving from the NE."
    },
    {
        url:'src/Images/nangaparbat.mp4',
        name: 'Nanga Parbat',
        description: "Nanga Parbat is a famously treacherous mountain peak situated in the Himalayas, in the Gilgit-Baltistan region of Pakistan. It's often referred to as the 'Killer Mountain' due to the high number of climbers who have lost their lives attempting to summit it. Nanga Parbat is the ninth highest mountain in the world, with an elevation of 8,126 meters (26,660 feet) above sea level. It's known for its stunning and rugged terrain, as well as its challenging climbing routes."
        
    },
    {
        url:'src/Images/karimabad.mp4',
        name: 'Karimabad',
        description: "Karimabad is a town located in the Hunza Valley of Gilgit-Baltistan region in northern Pakistan. It's situated along the ancient Silk Road and is renowned for its spectacular scenery, including views of towering mountains like Rakaposhi, Ultar Sar, and Hunza Peak. Karimabad serves as a popular tourist destination, offering opportunities for trekking, mountaineering, and experiencing the unique culture and traditions of the Hunza people."
    },
    {
        url:'src/Images/pcones.mp4',
        name: 'Passu Cones',
        description: 'The Passu Cones, also known as Passu Cathedral, are a distinctive group of peaks located in the Gojal Valley of the Gilgit-Baltistan region in northern Pakistan. They are part of the Karakoram mountain range and are situated near the village of Passu. The Passu Cones are renowned for their striking appearance, with jagged, ice-covered peaks rising dramatically from the surrounding landscape. They are a popular attraction for mountaineers, trekkers, and tourists visiting the region.'
    },
    {
        url:'src/Images/K2.mp4',
        name: 'K2',
        description: 'K2, also known as Mount Godwin-Austen or Chhogori, is the second-highest mountain in the world, located on the China-Pakistan border in the Karakoram Range of the Himalayas. Its peak straddles the border between the Gilgit-Baltistan region of Pakistan and the Taxkorgan Tajik Autonomous County of Xinjiang, China. K2 is renowned for its extreme difficulty and is considered one of the most challenging mountains to climb, earning it the nickname "Savage Mountain." It stands at an elevation of 8,611 meters (28,251 feet) above sea level and is a prominent destination for mountaineers and adventurers from around the globe.'
    },
];
export default videoData;
