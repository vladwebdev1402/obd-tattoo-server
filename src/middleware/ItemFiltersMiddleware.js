export const ItemFiltersMiddleware = (req, res, next) => {
    const {_id, name, no, promotion, news, discount, hot, limit, startPrice, endPrice, category, brand, sortField, sortOrder} = req.query;

    const mongoFilter = {
        name: {$regex: name ?? "", $options: 'i'},
        $and: [{price: {$gte: Number(startPrice) || 0}}, {price: {$lte: Number(endPrice) >= Number(startPrice) && Number(endPrice) || 999999}}],
    }

    if (_id) mongoFilter._id = _id;
    if (category) mongoFilter.category = category;
    if (brand) mongoFilter.brand = brand;

    if (no) mongoFilter["marcers.no"] = {$exists: true, $eq:  no === 'true'};
    if (promotion) mongoFilter["marcers.promotion"] = {$exists: true, $eq:  promotion === 'true'};
    if (news) mongoFilter["marcers.new"] = {$exists: true, $eq:  news === 'true'};
    if (discount) mongoFilter["marcers.discount"] = {$exists: true, $eq:  discount === 'true'};
    if (hot) mongoFilter["marcers.hot"] = {$exists: true, $eq:  hot === 'true'};

    
    const sort = {};

    if (sortField && sortOrder) sort[sortField] = sortOrder;

    const filters = {
        mongoFilter,
    };

    filters.limit = limit || 8;
    if (Object.keys(sort).length > 0) filters.sort = sort;

    req.filters = filters;
    next();
}