export default function filterByTitle(data, searchTerm){
    return data.filter(entry => entry.title.toLowerCase().includes(searchTerm.toLowerCase()))
}