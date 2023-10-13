export default function formatData(object){
    return Object.keys(object).map(key => ({...object[key], id: key}))
}