import {useNavigate} from "react-router-dom";

export default function ProductSort({pagenumber}) {
    const navigate = useNavigate()

    return (
        <>
            <label htmlFor="sort-order" className="sort-order-label">Rendezés</label>
            <select onChange={(e) => (navigate(`/termekek/${e.target.value}/${pagenumber}`))} id="sort-order" className="sort-order-input">
                <option value="AToZ">Abc szerint növekvő</option>
                <option value="ZToA">Abc szerint csökkenő</option>
                <option value="asc">Ár szerint növekvő</option>
                <option value="desc">Ár szerint csökkenő</option>
            </select>
        </>
        
    )
}