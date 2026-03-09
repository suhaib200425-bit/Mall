import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Auth.css";

function Auth() {

  const [page, setPage] = useState(true)
  const [usertype, setUsertype] = useState('User')
  const [Formdata, setFormdata] = useState({})
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
      setFormdata(prev => {
        return { ...prev, [e.target.name]: file }
      });
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault(); // form reload stop cheyyum
    console.log("Form submitted");
    console.log(Formdata);
    Navigate('/home')
  }


  return (
    <div className="signup-container">
      <div className="signup-card">

        <form className="signup-left" onSubmit={handleSubmit}>

          {
            !page && <div className="nav">
              <span className={usertype == 'User' && 'ActiveType'} onClick={() => {
                setUsertype('User')
                setFormdata({
                  firstName: '',
                  lastName: '',
                  businessName: '',
                  emailId: '',
                  password: '',
                  confirmPassword: ''
                })
              }}>User</span>
              <span className={usertype == 'Business' && 'ActiveType'} onClick={() => {
                setUsertype('Business')
                setFormdata({
                  firstName: '',
                  lastName: '',
                  businessName: '',
                  emailId: '',
                  password: '',
                  confirmPassword: ''
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
                businessName: '',
                emailId: '',
                password: '',
                confirmPassword: ''
              })
            }}>{page ? 'Create' : 'Log In'}</span>
          </p>

          <div className="form">

            {
              !page && <div className="name-fields">
                {
                  usertype == 'User' ? <>
                    <input value={Formdata.firstName} required onChange={(e) => { handleChange(e) }} name="firstName" type="text" placeholder="First name" />
                    <input value={Formdata.lastName} required onChange={(e) => { handleChange(e) }} name="lastName" type="text" placeholder="Last name" /></> :
                    <input value={Formdata.businessName} required onChange={(e) => { handleChange(e) }} name="businessName" type="text" placeholder="Business Name" />
                }
              </div>
            }

            <input value={Formdata.emailId} required onChange={(e) => { handleChange(e) }} name="emailId" type="email" placeholder="Email" />

            <input value={Formdata.password} required onChange={(e) => { handleChange(e) }} name="password" type="password" placeholder="Password" />


            {!page && <input value={Formdata.confirmPassword} required onChange={(e) => { handleChange(e) }} name="confirmPassword" type="password" placeholder="Confirm Password" />}

            <div className="buttons" onClick={handleSubmit}>
              <button className="create col-12">
                {
                  page ? 'Login' : 'Create account'
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
            usertype != 'User' &&
            <>
              <div className="logobox">
                <div className="logo">
                  <img id="fileInput1" onClick={() => {
                    handleImageClick(fileInput1)
                  }} src="https://i.pinimg.com/736x/29/47/9b/29479ba0435741580ca9f4a467be6207.jpg" alt="" srcset="" />
                  <input
                    type="file"
                    ref={fileInput1}
                    style={{ display: "none" }}
                    name="ProfileLogo"
                    onChange={handleFileChange}
                  />
                </div>
                <span>Slecte Your Business Logo</span>
              </div>
              <div className="image">
                <img id="fileInput1" onClick={() => {
                  handleImageClick(fileInput2)
                }} src="https://i.pinimg.com/736x/c2/4b/1b/c24b1b82d55a08a71818726c618b9740.jpg" alt="" srcset="" />
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
        <div className="buttons" onClick={handleSubmit}>
          <button className="create col-12 mb-3 ps-2 pe-2" style={{display:usertype=='User'?'none':''}}>
            {
              page ? 'Login' : 'Create account'
            }
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;