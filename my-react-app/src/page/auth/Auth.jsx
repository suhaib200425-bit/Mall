import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Auth.css";
import axios from 'axios'
import { categories } from "../../assets/main";
import { loginUser, registerUser } from "./AuthFun";
import { toast } from "react-toastify";
import { useMall } from "../../Context/MallContext";
function Auth() {
  const [loading, setloading] = useState(false)
  const [page, setPage] = useState(true)
  const [usertype, setUsertype] = useState('User')
  const [CoverImage, setCoverImage] = useState('')
  const [ProfileLogo, seProfileLogo] = useState('')
  const { setUser } = useMall()
  const [Formdata, setFormdata] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    role: 'owner',
    category: '',
  })
  const fileInput1 = useRef(null);
  const fileInput2 = useRef(null);
  const Navigate = useNavigate()
  const handleImageClick = (fileInput) => {
    fileInput.current.click()
    console.log();

  };

  const handleChange = (ev) => {
    console.log(ev)

    setFormdata(prev => {
      return { ...prev, [ev.target.name]: ev.target.value.trim() }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (e.target.name == 'CoverImage')
        setCoverImage(imageUrl)
      if (e.target.name == 'ProfileLogo') {
        seProfileLogo(imageUrl)
      }
      setFormdata(prev => {
        return { ...prev, [e.target.name]: file }
      });
    }
  };

  const handleSubmit = async (e) => {
    setloading(true)
    console.log('loading');
    console.log(loading);
    e.preventDefault(); // form reload stop cheyyum
    console.log("Form submitted");
    const formData = new FormData()
    if (Formdata.firstName)
      formData.append("name", `${Formdata.firstName} ${Formdata.lastName}`)
    if (Formdata.emailId)
      formData.append("email", Formdata.emailId)
    if (Formdata.password)
      formData.append("password", Formdata.password)
    if (Formdata.confirmPassword)
      formData.append("confirmPassword", Formdata.confirmPassword)
    if (Formdata.role)
      formData.append("role", Formdata.role)
    if (Formdata.ProfileLogo)
      formData.append("profilePic", Formdata.ProfileLogo)
    if (Formdata.CoverImage)
      formData.append("coverPic", Formdata.CoverImage)
    if (Formdata.category)
      formData.append("category", Formdata.category)

    console.log(Formdata);

    let result
    if (page) {
      result = await loginUser(Formdata.emailId, Formdata.password)
      console.log('LOGIN');

      if (result.status) {
        toast.dismiss(); // remove old toast
        toast.success(result.message);
        localStorage.setItem('token', result.token)
        setUser(result.user)
        Navigate('/home')
        setFormdata({
          firstName: '',
          lastName: '',
          emailId: '',
          password: '',
          confirmPassword: '',
          role: 'owner',
          category: '',
        })
      } else {
        toast.dismiss(); // remove old toast
        toast.error(result.message);
      }
    }
    if (!page) {
      result = await registerUser(formData)
      console.log('REGISTER');
      if (result.status) {
        toast.dismiss(); // remove old toast
        toast.success(result.message);
        setFormdata({
          firstName: '',
          lastName: '',
          emailId: '',
          password: '',
          confirmPassword: '',
          role: 'owner',
          category: '',
        })
        setPage(true)
        usertype('')
      } else {
        toast.dismiss(); // remove old toast
        toast.error(result.message);
      }
    }
    console.log(result)
    // Navigate('/home')
    setloading(false)
  }






  return (
    <div className="signup-container">
      <div className="signup-card">

        <form className="signup-left" onSubmit={(e) => {
            e.preventDefault()
          if (!loading) {
            handleSubmit(e)
          }
        }}>

          {
            !page && <div className="nav">
              <span className={usertype == 'User' && 'ActiveType'} onClick={() => {
                setUsertype('User')
                setFormdata({
                  firstName: '',
                  lastName: '',
                  emailId: '',
                  password: '',
                  confirmPassword: '',
                  role: 'user',
                  Category: ''
                })
              }}>User</span>
              <span className={usertype == 'Business' && 'ActiveType'} onClick={() => {
                setUsertype('Business')
                setFormdata({
                  firstName: '',
                  lastName: '',
                  emailId: '',
                  password: '',
                  confirmPassword: '',
                  role: 'owner',
                  Category: ''
                })
              }}>Business</span>
            </div>

          }

          <h1>{!page ? 'Create new' : 'Login your'} account</h1>

          <p className="login">
            {page ? 'Create a new account ? ' : 'Already A Member? '}
            <span onClick={() => {
              setPage(prev => !prev)
              setUsertype('User')
              setFormdata({
                firstName: '',
                lastName: '',
                emailId: '',
                password: '',
                confirmPassword: '',
                role: 'user',
                Category: ''
              })
              setloading(false)
            }}>{page ? 'Create' : 'Log In'}</span>
          </p>

          <div className="form">

            {
              !page && <div className="name-fields">
                {
                  usertype == 'User' ? <>
                    <input value={Formdata.firstName} required onChange={(e) => { handleChange(e) }} name="firstName" type="text" placeholder="First name" />
                    <input value={Formdata.lastName} required onChange={(e) => { handleChange(e) }} name="lastName" type="text" placeholder="Last name" /></> :
                    <input value={Formdata.firstName} required onChange={(e) => { handleChange(e) }} name="firstName" type="text" placeholder="Business Name" />
                }
              </div>
            }

            <input value={Formdata.emailId} required onChange={(e) => { handleChange(e) }} name="emailId" type="email" placeholder="Email" />

            <input value={Formdata.password} required onChange={(e) => { handleChange(e) }} name="password" type="password" placeholder="Password" />


            {!page && <input value={Formdata.confirmPassword} required onChange={(e) => { handleChange(e) }} name="confirmPassword" type="password" placeholder="Confirm Password" />}

            <div className="buttons" >
              <button onClick={(e) => {
            e.preventDefault()
                if (!loading) {
                  handleSubmit(e)
                }
              }} className={usertype == 'User' ? "create col-12" : "create topcreatebtn col-12"}>
                {
              !loading ?
                <>
                  {
                    page ? 'Login' : 'Create account'
                  }
                </> :
                <div class="loader"></div>
            }
              </button>
            </div>
            <hr />

            {
              usertype == 'User' &&
              <div class="social-login">

                <button class="google-btn col-5">
                  <i class="fa-brands fa-google"></i>Google
                </button>

                <button class="facebook-btn col-5">
                  <i class="fa-brands fa-facebook-f"></i>Facebook
                </button>

              </div>
            }

          </div>

        </form>

        <div className="signup-right" style={{
          backdropFilter: usertype === 'User' ? 'blur(10px)' : 'none'
        }}>
          {
            usertype == 'Business' &&
            <>
              <div className="logobox">
                <div className="logo">
                  <img id="fileInput1" onClick={() => {
                    handleImageClick(fileInput1)
                  }} src={ProfileLogo != '' ? ProfileLogo : "https://i.pinimg.com/736x/29/47/9b/29479ba0435741580ca9f4a467be6207.jpg"} alt="" srcSet="" />
                  <input
                    type="file"
                    ref={fileInput1}
                    style={{ display: "none" }}
                    name="ProfileLogo"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="dropdownbtn">
                  <span>Select Your Logo And Category</span>
                  <div class="dropdown " style={{ display: 'block' }}>
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      {Formdata.category ? Formdata.category : "Category's"}
                    </button>

                    <ul class="dropdown-menu">
                      {
                        categories.map((elem, index) => (
                          <li key={index}><a class="dropdown-item" onClick={() => setFormdata(prev => {
                            return { ...prev, category: elem }
                          })} href="#">{elem}</a></li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="image">
                <img id="fileInput1" onClick={() => {
                  handleImageClick(fileInput2)
                }} src={CoverImage != '' ? CoverImage : "https://i.pinimg.com/736x/c2/4b/1b/c24b1b82d55a08a71818726c618b9740.jpg"} alt="" srcSet="" />
                <input
                  type="file"
                  ref={fileInput2}
                  style={{ display: "none" }}
                  name="CoverImage"
                  onChange={handleFileChange}
                />
              </div></>
          }
        </div>
        <div className="buttons" >
          <button onClick={(e) => {
            e.preventDefault()
            if (!loading) {
              handleSubmit(e)
            }
          }} className="create bottomcreatebtn col-11 mb-5 ms-2 me-2" style={{ display: usertype == 'User' ? 'none' : '' }}>
            {
              !loading ?
                <>
                  {
                    page ? 'Login' : 'Create account'
                  }
                </> :
                <div class="loader"></div>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;