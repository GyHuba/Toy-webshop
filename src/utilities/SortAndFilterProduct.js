export default function sortAndFilterProduct(data, category, sortType, searchTerm){
    let productList = data;
    
    // KATEGÓRIA SZŰRÉS
    if(category !== ""){
        productList = productList.filter(p => p.category === category)
    }

    //ÁR- VAGY CÍM SZERINTI SZŰRÉS
    if(Array.isArray(searchTerm)){
        productList = productList.filter(p => p.price >= searchTerm[0] && p.price <= searchTerm[1])
    }else{
        productList = productList.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // ÁR VAGY CÍM SZERINTI RENDEZÉS
    let sortBy
    if(sortType === "asc" || sortType === "desc") {sortBy = "price"}
    if(sortType === "AToZ" || sortType === "ZToA") {sortBy = "title"}

    if (sortType === "asc" || sortType === "AToZ") {
        return (
            productList.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return -1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return 1;
                }
                return 0;
            })
        )
    }
    else if (sortType === "desc" || sortType === "ZToA") {
        return (
            productList.sort((a, b) => {
                if (a[sortBy] < b[sortBy]) {
                    return 1;
                }
                if (a[sortBy] > b[sortBy]) {
                    return -1;
                }
                return 0;
            })
        )
    }
}