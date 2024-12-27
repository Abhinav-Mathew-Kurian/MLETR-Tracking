const VisitedCountries = () => {
    const visitedCountries = [
        { 
            iso_a3: "USA", 
            name: "United States of America",
            level: 2, 
            notes: "The USA has taken significant steps toward implementing MLETR, especially in the context of digital trade and blockchain technology.",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg",
            bgImage: "https://cdn.pixabay.com/photo/2020/02/16/20/29/nyc-4854718_640.jpg",
            description: `The United States has made significant strides in integrating MLETR, with multiple states and federal agencies starting to explore the framework for digital trade. The country is focused on adopting the MLETR framework to facilitate cross-border transactions, with an emphasis on blockchain and secure records management.
            Several pilot programs and regulatory frameworks are already in place at both state and federal levels.`,
            
            point1: "Various states have enacted digital trade laws aligning with MLETR principles.",
            point2: "The U.S. federal government is exploring frameworks for electronic transferable records, with significant input from the private sector.",
            point3: "Blockchain-based solutions are a key area of focus in the U.S. for ensuring secure and verifiable electronic records.",
            
            journey1: "The journey toward MLETR adoption in the U.S. began with a series of pilot programs initiated by individual states like Delaware, New York, and Wyoming. These programs focused on enabling electronic trade and supporting businesses in utilizing digital records. The push was motivated by the desire to reduce costs and enhance transparency in cross-border transactions.",
            
            journey2: "In 2023, U.S. legislators introduced bills supporting the adoption of MLETR principles on a federal level. This included proposals to align digital documents with international standards for electronic trade and to provide legal recognition to blockchain-based records. This progress indicated strong bipartisan support for modernizing U.S. trade laws.",
            
            journey3: "The next steps for the U.S. involve refining regulatory frameworks and creating comprehensive standards for blockchain-based record-keeping, which is a major focus for both private enterprises and government agencies. The implementation of MLETR will likely expand as more states introduce digital trade laws in the coming years."
        }
        ,
        { 
            iso_a3: "FRA", 
            name: "France",
            level: 3, 
            notes: "France passed MLETR into law after a white paper addressed both legal and business aspects.",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
            bgImage: "https://travelfrancebucketlist.com/wp-content/uploads/2020/06/Eiffel-Tower-at-Sunrise.jpg",
            description: `France fully adopted MLETR in July 2024. A forthcoming decree will define criteria for a “reliable system,” focusing on title identification, holder verification, and title history tracking.
            Implementation involved multiple bodies, led by Deputy Alexandre Holroyd, supported by the National Assembly and Senate. France is now a leader in digital trade adoption.`,
            
           
            point1: "Passed a white paper detailing legal and business aspects of MLETR.",
            point2: "Adopted MLETR fully in July 2024, a significant step in the digital trade process.",
            point3: "A decree will soon define the criteria for a 'reliable system', focusing on title history tracking and holder verification.",
            
            
            journey1: "In 2020, France took its first significant step towards the adoption of the Model Law on Electronic Transferable Records (MLETR) by releasing a detailed white paper. This document comprehensively addressed both the legal and business aspects of integrating MLETR into their trade practices. The government worked closely with various stakeholders, ensuring that the framework would align with international standards and modern trade requirements.",
            
            journey2: "In July 2024, after extensive discussions and legislative work, France officially passed MLETR into law, marking a pivotal moment in digital trade adoption. This move positions France as a leader in Europe, encouraging other EU nations to follow suit. The law aims to create a unified framework for electronic transferable records, ensuring that digital trade documents are legally recognized and can be used across borders.",
            
            journey3: "The journey towards full implementation of MLETR in France does not end with the passing of the law. A key next step is the release of a decree, which must define what constitutes a 'reliable system' for managing electronic records. This includes methods for title identification, holder verification, and tracking the history of title transfers. As these regulations are finalized, France continues to work closely with the National Assembly, Senate, and industry leaders to ensure smooth adoption and avoid regulatory fragmentation."
        },
        { 
            iso_a3: "JPN", 
            level: 2, 
            notes: "Study group dedicated to exploring the application of MLETR to bills of lading", 
            image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
            bgImage: "https://www.hilton.com/im/en/NoHotel/19361896/shutterstock-667925704.jpg?impolicy=crop&cw=3800&ch=2533&gravity=NorthWest&xposition=0&yposition=1&rw=1280&rh=856",
            description: "Japan began serious evaluations of MLETR in 2021, forming a dedicated task force to assess its application for trade finance and documentation."
        },
        { 
            iso_a3: "KOR", 
            level: 2, 
            notes: "Existing laws effective nationally but have little cross-border uptake", 
            image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
            bgImage: "https://media.istockphoto.com/id/1137568153/photo/cherry-blossoms-in-spring-seoul-in-korea.jpg?s=612x612&w=0&k=20&c=SP8py_0WQrn4mMFdrd0bvk7-MfRWxJl6C3AsHxJq8ck=",
            description: "South Korea updated national trade laws in 2022, aligning with MLETR principles but with limited international uptake."
        },
        
        { 
            iso_a3: "GEO", 
            level: 3, 
            notes: "", 
            image: "https://cdn.britannica.com/89/889-050-BED5DE72/flag-state-battle-Georgia-field-Georgias-History-2003.jpg",
            bgImage: "https://cdn.bunniktours.com.au/public/posts/images/Europe/Tbilisi%20-%201234016323-feature.jpg",
            description: "Georgia adopted MLETR in 2020 and is actively working on aligning its trade systems to facilitate digital transactions."
        },
        { 
            iso_a3: "THA", 
            level: 2, 
            notes: "Electronic Trade Documents Bill is under review", 
            image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
            bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxW4552fIqth3Frp3q-iX5ykQQZpeskag8dw&s",
            description: "Thailand initiated the drafting of its Electronic Trade Documents Bill in 2022 and is currently reviewing it for MLETR compliance."
        },
        { 
            iso_a3: "NLD", 
            level: 2, 
            notes: "Started implementing electronic SPS certificates bilaterally", 
            image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
            bgImage: "https://www.thetimes.com/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F924f77db-c0b4-4d33-89bf-0dad7a1ff1ee.jpg?crop=1564%2C880%2C318%2C0",
            description: "The Netherlands started piloting bilateral electronic SPS certificates in 2022 while working on broader MLETR alignment."
        },
        { 
            iso_a3: "MEX", 
            level: 2, 
            notes: "Drafted legislation to align to MLETR", 
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg",
            bgImage: "https://www.datocms-assets.com/32623/1711486978-basilica_mexico_city.jpeg",
            description: "Mexico drafted legislation to align with MLETR in 2023, focusing on boosting its digital trade infrastructure."
        },
        { 
            iso_a3: "BRA", 
            level: 2, 
            notes: "Initiating a pilot project to test electronic bills of lading", 
            image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
            bgImage: "https://t3.ftcdn.net/jpg/02/85/64/82/360_F_285648275_VAq7WTS7UmNAaeYbujhBPR5a8pZ6YT1t.jpg",
            description: "Brazil began a pilot project in 2023 to implement electronic bills of lading, marking its first steps towards aligning with MLETR."
        },
        { 
            iso_a3: "ZAF", 
            level: 1, 
            notes: "Undergoing legislative review for adoption of MLETR", 
            image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
            bgImage: "https://www.planetware.com/wpimages/2019/09/south-africa-in-pictures-most-beautiful-places-to-visit-cape-town.jpg",
            description: "South Africa started reviewing legislative options for MLETR adoption in 2022 and aims to align with international standards by 2025."
        },
        { 
            iso_a3: "ITA", 
            level: 3, 
            notes: "Fully implemented MLETR in 2023", 
            image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
            bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReYlUT_cZwAChH1dGPpMmW67GXl0qt4cnNoA&s",
            description: "Italy fully adopted MLETR in 2023, becoming one of the frontrunners in Europe for aligning trade laws with digital processes."
        },
        {
            iso_a3: "IND",
            level: 1,
            notes: "Policy framework is under consultation with trade and legal stakeholders",
            image: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
            bgImage: "https://t3.ftcdn.net/jpg/05/15/64/00/360_F_515640060_7qE38amELkFCBuN41P6rOXlTA1XkPSiF.jpg",
            description: "India initiated discussions on adopting MLETR in 2023, focusing on digitizing its export-import documentation process."
        },
        {
            iso_a3: "CHN",
            level: 3,
            notes: "MLETR fully integrated into international trade and finance systems",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
            bgImage: "https://media.istockphoto.com/id/497572532/photo/cityscape-of-guiyang-at-night.jpg?s=612x612&w=0&k=20&c=iZ2avxaTDglVbfygFduRdxADXI-KqUO1nhX4DlPgFZs=",
            description: "China implemented MLETR principles across its trade documentation in 2022, becoming a global leader in electronic trade solutions."
        },
        {
            iso_a3: "GBR",
            level: 3,
            notes: "Electronic Trade Documents Act passed in 2023, enabling full compliance with MLETR",
            image: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
            bgImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50cPcj5zwN-MHl7zKXvS8fft0GJDZFOFL5w&s",
            description: "The United Kingdom passed its Electronic Trade Documents Act in 2023, fully aligning with MLETR and modernizing its trade ecosystem."
        },
        {
            iso_a3: "NGA",
            level: 2,
            notes: "Drafting guidelines for trade finance integration with MLETR",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
            bgImage: "https://valuejet.github.io/public/images/blog/abuja.png",
            description: "Nigeria began aligning with MLETR in 2023, focusing on trade finance and cross-border digital documentation frameworks."
        },
        {
            iso_a3: "MUS",
            level: 2,
            notes: "Pilot project for integrating electronic bills of lading initiated",
            image: "https://media.istockphoto.com/id/1469816175/vector/mauritius-flag-vector.jpg?s=612x612&w=0&k=20&c=75nya0gIFjQawozuok_fGvqj3IFGPUc5VaYZXg2CORg=",
            bgImage: "https://media.istockphoto.com/id/500124711/photo/port-louis-by-night-mauritius.jpg?s=612x612&w=0&k=20&c=qeuxaUqko-Y8mWikMtV2HoTgUA_-lF5eIYgpBbOckss=",
            description: "Mauritius started implementing electronic trade documentation under MLETR guidelines in 2023, leveraging its position as a trade hub."
        },
        { 
            iso_a3: "SGP", 
            name: "Singapore",
            level: 3, 
            notes: "Singapore has been proactive in adopting MLETR, focusing on blockchain and digital trade to maintain its position as a global trade hub.",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flag_of_Singapore.svg",
            bgImage: "https://media.istockphoto.com/id/483672437/photo/merlion.jpg?s=612x612&w=0&k=20&c=P_buDj2h6ydR-sVFO5nkGyTFehRVECKGvWXrdi50lVg=",
            description: `Singapore has been at the forefront of adopting digital trade regulations, with MLETR forming a key part of its strategy to modernize trade practices. The country’s forward-thinking approach includes leveraging technology, particularly blockchain, to ensure the security and traceability of electronic transferable records.
            Singapore's government and regulatory bodies have been working to create an ecosystem that fosters seamless international trade through digital records.`,
            
            point1: "Singapore has fully integrated MLETR into its legal framework, focusing on digital trade and blockchain technology.",
            point2: "A key area of focus has been the development of secure and verifiable systems for electronic records management.",
            point3: "Singapore's implementation of MLETR is aligned with its broader goal of becoming a global digital trade hub.",
            
            journey1: "Singapore took an early interest in the potential of digital trade and blockchain technology, releasing several reports in the early 2020s that explored the adoption of MLETR. In 2022, the government introduced regulations that laid the groundwork for recognizing electronic transferable records, making Singapore one of the first countries to officially adopt MLETR.",
            
            journey2: "By 2023, Singapore had established a comprehensive legal and regulatory framework for MLETR, with a clear focus on blockchain as a tool for secure electronic records management. This was complemented by collaborations between the private sector and government, ensuring that Singapore would remain a leader in digital trade adoption.",
            
            journey3: "Moving forward, Singapore aims to refine its systems for digital trade further, with an emphasis on cross-border interoperability and continuous innovation in blockchain technology. The next step will be the release of updated guidelines for the implementation of MLETR, with input from international organizations to ensure global alignment."
        }
        ,
        {
            iso_a3: "EGY",
            level: 2,
            notes: "Draft law under review to align trade practices with MLETR",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
            bgImage: "https://www.flightgift.com/media/wp/FG/2024/07/cairo-egypt.jpg",
            description: "Egypt initiated its MLETR alignment process in 2022, focusing on modernizing trade laws to enable electronic documentation."
        },
        {
            iso_a3: "DEU",
            level: 2,
            notes: "Draft law under review to align trade practices with MLETR",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
            bgImage: "https://t4.ftcdn.net/jpg/03/72/41/33/360_F_372413348_3jJOb54RcxOy7TmKBSnyJZ9Mw0nraoHT.jpg",
            description: "In Germnay there existing legislation that has yet to be fully utilised and the country's business community are eagerly awaiting guidance on effectively embracing MLETR."
        }
    ];

    return visitedCountries;
};

export default VisitedCountries;