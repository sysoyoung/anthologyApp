module.exports.tempArrayOfArticles = [
    { 
        id: '1',
        title: 'title one',
        lang: 'анг',
        description: 'example of short description',
        authorId: 'a000b',
        author: 'qwe qwe',
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
                title: 'title kek',
                id: '2'
            }
        ]
    },
    { 
        id: '2',
        title: 'title kek',
        lang: 'анг',
        description: 'kek description',
        authorId: 'a000b',
        author: 'qwe qwe',
        date: +new Date(),
        status: 'posted',
        sources: [
            {
                title: 'KEKW',
                link: '',
            },
            {
                title: 'KEKwait',
                link: 'https://www.google.com/',
            },
        ],
        tags: ['smile', 'kekw', 'kek'],
        relatedArticles: [
            {
                title: 'title one',
                id: '1',
            }
        ]
    },
    
];