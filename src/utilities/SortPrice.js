export default function sortPrice(productList, sortType) {
    if (sortType === "asc") {
        return (productList.sort(function (a, b) {
            if (a.price < b.price) {
                return -1;
            }
            if (a.price > b.price) {
                return 1;
            }
            return 0;
        }))
    }
    else if (sortType === "desc") {
        return (
            productList.sort(function (a, b) {
                if (a.price < b.price) {
                    return 1;
                }
                if (a.price > b.price) {
                    return -1;
                }
                return 0;
            })
        )
    }
}