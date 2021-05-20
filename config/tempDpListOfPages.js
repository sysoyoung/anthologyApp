module.exports.tempArrayOfArticles = [
    { 
        id: '1',
        title: 'title one',
        lang: 'анг',
        description: 'example of short description',
        authorId: 'a000b',
        author: 'max sus',
        date: +new Date(),
        status: 'posted',
        sources: [
            {
                title: 'some title',
                link: '',
            },
            {
                title: 'another title',
                link: 'https://www.google.com/',
            },
        ],
        tags: ['example', 'text', 'something'],
        relatedArticles: [
            {
                title: 'Семантическая сеть',
                id: '2'
            }
        ]
    },
    { 
        id: '2',
        title: 'Семантическая сеть',
        lang: 'рус',
        description: 'описание семантической сети',
        authorId: 'a000b',
        author: 'max sus',
        date: +new Date(),
        status: 'posted',
        sources: [
            {
                title: 'Семантическая сеть',
                link: 'https://ru.wikipedia.org/wiki/%D0%A1%D0%B5%D0%BC%D0%B0%D0%BD%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D1%81%D0%B5%D1%82%D1%8C#:~:text=%D0%A1%D0%B5%D0%BC%D0%B0%D0%BD%D1%82%D0%B8%CC%81%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D1%81%D0%B5%D1%82%D1%8C%20%E2%80%94%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F%20%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BC%D0%B5%D1%82%D0%BD%D0%BE%D0%B9,%2C%20%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F%2C%20%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0%2C%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D1%8B.',
            },
            {
                title: 'KEKwait',
                link: 'https://www.google.com/',
            },
        ],
        tags: ['сеть', 'семантика'],
        relatedArticles: [
            {
                title: 'title one',
                id: '1',
            }
        ]
    },
    
];