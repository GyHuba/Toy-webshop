import { useEffect, useState } from 'react'
import { createProduct, readOneProduct, updateProduct } from '../services/product-services'
import { useNavigate, useParams } from 'react-router-dom'
import "../css/global.css"
import "../css/components/product-form.css"
import { readCategories } from '../services/category-services'
import { uploadImages } from '../services/storage-service'

export default function ProductForm({ type }) {

    const [formData, setFormData] = useState(
        {
            title: "",
            category: "",
            price: "",
            description: ""
        }
    )
    const [imageUpload, setImageUpload] = useState(null)

    const [categoryList, setCategoryList] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (type === "edit") readOneProduct(id, setFormData)
        readCategories(setCategoryList)
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        const alertData = [];

        const regex1 = /[a-zA-Z]+\d*/;
        const found1 = regex1.test(String(formData.title));
        const regex2 = /\-?\d*\.?\d{1,2}/;
        const found2 = regex2.test(Number(formData.price));

        if (formData.title.length < 2 || formData.title.length === 0) {
            alertData.push("A terméknév hosszabb kell legyen 1 karakternél és nem lehet üres!")
        }
        if (!found1) {
            alertData.push("A terméknévnek betűt is kell tartalmaznia!")
        }
        if (formData.price.length === 0) {
            alertData.push("Az ár mező nem lehet üres!")
        }
        if (!found2) {
            alertData.push("Az ár mezőbe csak szám kerülhet!")
        }
        if (alertData.length === 0) {
            if (type === 'new') createProduct(formData, console.log)
            .then(res => {
                    if(imageUpload !== null){
                    uploadImages(imageUpload)
                        .then((url) => {
                            updateProduct(res.name, { ...formData, ImageURL: url })
                        })
                }})

            if (type === "edit") updateProduct(id, formData, (res) => {
                uploadImages(imageUpload)
                    .then((url) => {
                        updateProduct(id, { ...formData, ImageURL: url })
                    })
            }).then(navigate(-1))

        } else {
            alert(alertData);
        }

        if (type === 'new') setFormData({
            title: "",
            category: "",
            price: "",
            description: ""
        })
    }


    return (
        <>
            <div className='card form-card'>
                <h2>{type === "new" ? "Új termék" : "Termék szerkesztése"}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Terméknév</label>
                    <input type='text' id='title' className='prod-form-input' value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder='Terméknév' />

                    <label htmlFor='category'>Termékkategória</label>
                    <select id='category' className='prod-form-input' value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder='kategória'>
                        {type === "new" ? <option value="" disabled defaultValue={""} hidden>Válassz kategóriát!</option> : ""}
                        {
                            categoryList?.map(category => (
                                <option value={category.id} key={category.id}>{`${category.title}`}</option>
                            ))
                        }
                    </select>

                    <label htmlFor='price'>Ár</label>
                    <input type='number' className='prod-form-input' id='price' value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder='HUF' />

                    <label htmlFor='description'>Termékleírás</label>
                    <textarea id='description' className='prod-form-input' value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Termék leírása' />

                    <label htmlFor='img'>Kép feltöltése</label>
                    <input type="file" id='img' className='img-input prod-form-input' onChange={(e) => { setImageUpload(e.target.files[0]) }}></input>
                    <div className="btn-wrap">
                        <button type="button" onClick={() => navigate(-1)} className="red-outline-btn">Mégse</button>
                        <button type="submit" className="red-btn">Mentés</button>
                    </div>
                </form>
            </div>
        </>
    )
}