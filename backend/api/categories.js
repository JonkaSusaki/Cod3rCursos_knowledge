module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }

        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name, 'Informe o nome da Categoria')

        } catch (msg) {
            res.status(400).send(msg)
        } 

        if(!category.id) {
            app.db('categories')
                .insert(category)
                .then(() => res.status(200).send())
                .catch(err => res.status(400).send(err))
        } else {
            app.db('categories')
                .where({id: category.id})
                .update(category)
                .then(() => res.status(200).send())
                .catch(err => res.status(400).send(err))
        }
        
    }

    const addPath = (categories) => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(p => p.id == parentId)

            return parent.length ? parent[0] : null
        }
            
        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return {...category, path}
        })

        categoriesWithPath.sort((a, b) => {
            if(a.path > b.path) return 1
            if(a.path < b.path) return -1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('categories')
            .select('id', 'name', 'parentId')
            .then(cat => res.json(addPath(cat)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({id: req.params.id})
            .first()
            .then(cat => res.json(cat))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles').where({categoryId: req.params.id}).select('*')
            notExistsOrError(articles, 'Categoria possui Artigos')

            const cat = await app.db('categories').where({parentId: req.params.id})
            notExistsOrError(cat, 'Categoria possui subcategorias')

            const rowDeleted = await app.db('categories').where({id: req.params.id}).del()
            existsOrError(rowDeleted, 'Categoria não encontrada')

            res.status(204).send()

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(cat => !cat.parentId)

        tree = tree.map(root => {
            const children = cat => cat.parentId == root.id

            root.children = toTree(categories, categories.filter(children))

            return root
        })

        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(400).send(err))
    }

    return {save, get, getById, remove, getTree}
}