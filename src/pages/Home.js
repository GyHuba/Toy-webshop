import CategoryLinks from "../components/CategoryLinks";
import ImagePagination from "../components/ImagePagination";
import "../css/pages/home.css"


export default function Home() {
    const images = [
        { imgPath: '/pexels-karolina-grabowska-4964356.jpg', title: 'betyár baba', description: 'Nálunk minden betyárnak találsz játékot!' },
        { imgPath: '/pexels-pixabay-50692.jpg', title: 'testvérek', description: 'Kicsiknek, nagyoknak...' },
        { imgPath: '/pexels-cottonbro-studio-3661389.jpg', title: 'közös játék', description: 'Fiúknak, lányoknak...' },
        { imgPath: '/pexels-cottonbro-studio-3662845.jpg', title: 'plüss állatok', description: 'A plüss állatoktól...' },
        { imgPath: '/pexels-cottonbro-studio-4691567.jpg', title: 'társasjátékok', description: '...a társasjátékokon át...' },
        { imgPath: '/pexels-ryan-miguel-capili-3993247.jpg', title: 'ijesztő', description: '...az ijesztő játékokig :)' },
        { imgPath: '/pexels-gustavo-fring-3985062.jpg', title: 'vásárlás', description: 'Kellemes vásárlást!' },
      ];
      
    return (
        <div>
            <h2 className="title">Üdvözlünk a betyárok birodalmában!</h2>
            <div className="home-content-wrap">
                <CategoryLinks />
                <ImagePagination images={images} defaultSelected={0} />
            </div>

        </div>

    )
}