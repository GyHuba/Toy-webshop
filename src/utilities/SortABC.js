export default function sortABC(productList, sortType) {
    if (sortType === "AToZ") {
        return (productList.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            }
            return 0;
        }))
    }
    else if (sortType === "ZToA") {
        return (
            productList.sort(function (a, b) {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return 1;
                }
                if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return -1;
                }
                return 0;
            })
        )
    }
}