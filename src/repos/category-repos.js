import { CATEGORY_URL } from "../constants/url";

export function createcategoryFirebase (categoryFormData) {
    return fetch(`${CATEGORY_URL}.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryFormData)
      })
      .then(res => res.json())
}

export function addCategoryIDFirebase(catID, categoryFormData){
      let catformdata = {...categoryFormData, "id" : catID}
      return fetch(`${CATEGORY_URL}/${catID}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(catformdata)
      })
}

export function readCategoriesFirebase(){
  return fetch(`${CATEGORY_URL}.json`)
    .then(res => res.json())
}

