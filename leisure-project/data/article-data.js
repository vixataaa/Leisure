module.exports = (articleCollection, validator, models, logger) => {
    const { Article } = models;

    return {
        createArticle(articleObject) {
            const article = new Article(
                articleObject.author,
                articleObject.title,
                articleObject.description,
                articleObject.content,
                articleObject.category,
                articleObject.tags,
            );

            return articleCollection.insertOne(article);
        },
        getAllArticles(pageNumber, pageSize) {
            return articleCollection.find();
        },
        findArticles(query) {
            return articleCollection.find({
                $or: [
                    { 'author.username': { $in: [query] } },
                    { title: { $in: [query] } },
                    { tags: { $in: [query] } },
                ],
            });
        },
        getArticleById(id) {
            return articleCollection.findById(id);
        },
        addCommentToArticle(articleId, comment) {
            const filter = {
                _id: articleCollection.generateId(articleId),
            };

            const update = {
                $addToSet: {
                    comments: comment,
                },
            };

            return articleCollection.findAndModify(filter, update);
        },
        likeArticle(articleId, likerUsername) {
            const filter = {
                _id: articleCollection.generateId(articleId),
            };

            const update = {
                $addToSet: {
                    likes: likerUsername,
                },
            };

            return articleCollection.findAndModify(filter, update);
        },
        unlikeArticle(articleId, unlikerUsername) {
            const filter = {
                _id: articleCollection.generateId(articleId),
            };

            const update = {
                $pull: {
                    likes: unlikerUsername,
                },
            };

            return articleCollection.findAndModify(filter, update);
        },
    };
};
