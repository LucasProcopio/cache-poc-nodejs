const ItemDomainEntity = {
    origin: 'IFOOD',
    originOrderId: '123',
};


module.exports = () => ({
    list: async function () {
        const items = [];
        for (let i = 0; i < 40; i++) {
            items.push({
                ...ItemDomainEntity,
                id: i + 1,
            })
        }
        return items;
    }
});
