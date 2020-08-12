const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function() {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, {sort: {'createdAt': -1}})

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changedUsers = !lastStat || stat.users !=lastStat.users 
        const changedCategories = !lastStat || stat.categories !=lastStat.categories 
        const changedArticles = !lastStat || stat.articles !=lastStat.articles 

        if(changedUsers || changedCategories || changedArticles) {
            stat.save().then(() => console.log('Estatísticas Atualizadas'))
        }
    })
}