import { addCategoryIDFirebase, createcategoryFirebase, readCategoriesFirebase } from "../repos/category-repos";

export function createCategory(categoryFormData){
    return (
        createcategoryFirebase(categoryFormData)
        .then(json => json.name)
        .then(res => addCategoryID(res, categoryFormData))
        .catch(e => console.log(e))
    )
}

export function addCategoryID(categoryName, categoryFormData){
    return(
        addCategoryIDFirebase(categoryName, categoryFormData)
        .then(res => console.log(res))
    )
}

export function readCategories(callbackFn){
    return(
        readCategoriesFirebase()
            .then(json => callbackFn?.(Object.values(json)))
    )
}