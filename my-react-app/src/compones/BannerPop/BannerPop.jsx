import { useRef, useState } from "react";
import './BannerPop.css'
import { API_END_POINT } from "../../assets/main";
import axios from "axios";
import { useMall } from "../../Context/MallContext";
function BannerPop({ setEdit, id, companyimage }) {
    const token = localStorage.getItem('token')
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(companyimage);
    const { setCompanys } = useMall()
    const inputRef = useRef()
    const handleclick = (e) => {
        e.stopPropagation();
        inputRef.current.click()
        uploadBanner(file, "USER_ID_HERE", true);
    };
    const handleSubmit = async (e) => {

        e.preventDefault()
        try {

            const formData = new FormData();

            formData.append("coverPic", file);

            const res = await axios.put(
                `${API_END_POINT}/api/user/update-cover`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token
                    }
                }
            );
            if (res.data.status) {
                setCompanys(prev => {
                    const company = prev.map(elem => {
                        if (elem._id == id) {
                            return {
                                ...elem,
                                coverPic: image
                            }
                        } else {
                            return elem
                        }
                    })
                    return company
                });
            }
            setEdit(false)
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="BannerPop" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
                <img src={image} alt="" srcset="" onClick={handleclick} />
                <input
                    hidden
                    ref={inputRef}
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFile(file)
                        setImage(URL.createObjectURL(file))
                    }}
                />

                <button type="submit" className="bannerUpdate ms-2" onClick={handleSubmit}>
                    Upload Banner
                </button>
            </form>
        </div>
    );
}

export default BannerPop;